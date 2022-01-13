import { StaticUrl } from '@deriv/components';
import {
    formatDate,
    getPathname,
    getStaticUrl,
    getUrlBase,
    isCryptocurrency,
    isEmptyObject,
    isMobile,
    isMultiplierContract,
    LocalStore,
    platform_name,
    routes,
    unique,
} from '@deriv/shared';
import { localize, Localize } from '@deriv/translations';
import { BinaryLink } from 'App/Components/Routes';
import { action, computed, observable, reaction } from 'mobx';
import React from 'react';
import { WS } from 'Services';
import { sortNotifications, sortNotificationsMobile } from '../App/Components/Elements/NotificationMessage/constants';
import BaseStore from './base-store';
import {
    excluded_notifications,
    getCashierValidations,
    getStatusValidations,
    hasMissingRequiredField,
} from './Helpers/client-notifications';

export default class NotificationStore extends BaseStore {
    @observable is_notifications_visible = false;
    @observable notifications = [];
    @observable notification_messages = [];
    @observable marked_notifications = [];
    @observable push_notifications = [];
    @observable client_notifications = {};
    @observable should_show_popups = false;

    constructor(root_store) {
        super({ root_store });
        reaction(
            () => root_store.common.app_routing_history.map(i => i.pathname),
            () => {
                this.filterNotificationMessages();
            }
        );
        reaction(
            () => [
                root_store.client.account_settings,
                root_store.client.account_status,
                root_store.client.landing_companies,
                root_store.modules?.cashier?.general_store?.is_p2p_visible,
                root_store.common?.selected_contract_type,
                root_store.client.is_eu,
            ],
            () => {
                if (
                    root_store.client.landing_companies &&
                    Object.keys(root_store.client.landing_companies).length > 0
                ) {
                    this.removeNotifications();
                    this.removeAllNotificationMessages();
                    this.handleClientNotifications();
                }
            }
        );
    }

    @computed
    get custom_notifications() {
        const { has_malta_account, can_have_mlt_account, is_uk } = this.root_store.client;
        const notification_content = {
            mx_mlt_notification: {
                header: () => {
                    if (has_malta_account || can_have_mlt_account) {
                        return localize('Your Options account is scheduled to be closed');
                    } else if (is_uk) {
                        return localize('Your Gaming account is scheduled to be closed');
                    }
                    return localize('Your account is scheduled to be closed');
                },
                main: () => {
                    if (has_malta_account || can_have_mlt_account) {
                        return localize('Withdraw all funds from your Options account.');
                    } else if (is_uk) {
                        return localize('Please withdraw all your funds as soon as possible.');
                    }
                    return localize('Please proceed to withdraw your funds before 30 November 2021.');
                },
            },
        };
        return notification_content;
    }

    @computed
    get filtered_notifications() {
        return this.notifications.filter(message => !['news', 'promotions'].includes(message.type));
    }

    @action.bound
    addNotificationBar(message) {
        this.push_notifications.push(message);
        this.push_notifications = unique(this.push_notifications, 'msg_type');
    }

    @action.bound
    addNotificationMessage(notification) {
        if (!notification) return;
        if (!this.notification_messages.find(item => item.key === notification.key)) {
            // Remove notification messages if it was already closed by user and exists in LocalStore
            const active_loginid = LocalStore.get('active_loginid');
            const messages = LocalStore.getObject('notification_messages');

            if (active_loginid) {
                // Check if is existing message to remove already closed messages stored in LocalStore
                const is_existing_message = Array.isArray(messages[active_loginid])
                    ? messages[active_loginid].includes(notification.key)
                    : false;

                if (is_existing_message) {
                    this.markNotificationMessage({ key: notification.key });
                }

                const sortFn = isMobile() ? sortNotificationsMobile : sortNotifications;
                this.notification_messages = [...this.notification_messages, notification].sort(sortFn);

                if (!excluded_notifications.includes(notification.key)) {
                    this.updateNotifications(this.notification_messages);
                }
            }
        }
    }

    @action.bound
    addNotificationMessageByKey(key) {
        if (key) this.addNotificationMessage(this.client_notifications[key]);
    }

    @action.bound
    addVerificationNotifications(identity, document) {
        if (identity.status === 'expired') this.addNotificationMessage(this.client_notifications.poi_expired);

        if (document.status === 'expired') this.addNotificationMessage(this.client_notifications.poa_expired);
    }

    @action.bound
    filterNotificationMessages() {
        if (LocalStore.get('active_loginid') !== 'null')
            this.resetVirtualBalanceNotification(LocalStore.get('active_loginid'));
        this.notifications = this.notification_messages.filter(notification => {
            if (notification.platform === undefined || notification.platform.includes(getPathname())) {
                return true;
            } else if (!notification.platform.includes(getPathname())) {
                if (notification.is_disposable) {
                    this.removeNotificationMessage({
                        key: notification.key,
                        should_show_again: notification.should_show_again,
                    });
                    this.removeNotificationByKey({ key: notification.key });
                }
            }
            return false;
        });
    }

    @action.bound
    handleAccountNotifications() {
        const {
            accounts,
            account_status,
            is_eu,
            landing_company_shortcode,
            has_malta_account,
            has_iom_account,
            is_identity_verification_needed,
            is_logged_in,
            is_tnc_needed,
            isAccountOfType,
            loginid,
        } = this.root_store.client;
        const { is_10k_withdrawal_limit_reached } = this.root_store.modules.cashier.withdraw;
        const { current_language, selected_contract_type } = this.root_store.common;
        const malta_account = landing_company_shortcode === 'maltainvest';
        const virtual_account = landing_company_shortcode === 'virtual';

        const {
            authentication: { document, identity, needs_verification },
            status,
            cashier_validation,
        } = account_status;

        const hidden_close_account_notification =
            parseInt(localStorage.getItem('hide_close_mx_mlt_account_notification')) === 1;
        const { cashier_locked, deposit_locked, document_needs_action } = getStatusValidations(status || []);

        if (loginid !== LocalStore.get('active_loginid')) return;

        if (
            (has_iom_account || has_malta_account) &&
            (!malta_account || !virtual_account) &&
            is_logged_in &&
            !hidden_close_account_notification
        ) {
            this.addNotificationMessage(this.client_notifications.close_mx_mlt_account);
        }
        const client = accounts[loginid];
        if (client && !client.is_virtual) {
            if (isEmptyObject(account_status)) return;
            if (loginid !== LocalStore.get('active_loginid')) return;

            const {
                system_maintenance,
                is_virtual,
                no_residence,
                documents_expired,
                FinancialAssessmentRequired,
                SelfExclusion,
                ASK_CURRENCY,
                ASK_AUTHENTICATE,
                ASK_FINANCIAL_RISK_APPROVAL,
                ASK_TIN_INFORMATION,
            } = cashier_validation ? getCashierValidations(cashier_validation) : {};

            this.addVerificationNotifications(identity, document);
            const needs_poa =
                is_10k_withdrawal_limit_reached &&
                (needs_verification.includes('document') || document?.status !== 'verified');
            const needs_poi = is_10k_withdrawal_limit_reached && identity?.status !== 'verified';

            if (needs_poa) this.addNotificationMessage(this.client_notifications.needs_poa);
            if (needs_poi) this.addNotificationMessage(this.client_notifications.needs_poi);
            if (!system_maintenance) {
                if (cashier_locked) {
                    if (is_virtual) {
                        this.addNotificationMessage(this.client_notifications.is_virtual);
                    } else if (no_residence) {
                        this.addNotificationMessage(this.client_notifications.no_residence);
                    } else if (documents_expired) {
                        this.addNotificationMessage(this.client_notifications.documents_expired);
                    } else if (ASK_CURRENCY) {
                        this.addNotificationMessage(this.client_notifications.currency);
                    } else if (ASK_AUTHENTICATE && is_identity_verification_needed) {
                        this.addNotificationMessage(this.client_notifications.identity);
                    } else if (ASK_AUTHENTICATE) {
                        this.addNotificationMessage(this.client_notifications.authenticate);
                    } else if (isAccountOfType('financial') && ASK_FINANCIAL_RISK_APPROVAL) {
                        this.addNotificationMessage(this.client_notifications.ask_financial_risk_approval);
                    } else if (FinancialAssessmentRequired) {
                        this.addNotificationMessage(this.client_notifications.risk);
                    } else if (isAccountOfType('financial') && ASK_TIN_INFORMATION) {
                        this.addNotificationMessage(this.client_notifications.tax);
                    }
                } else {
                    if (deposit_locked && SelfExclusion) {
                        this.addNotificationMessage(this.client_notifications.self_exclusion(client.excluded_until));
                    }
                    if (is_identity_verification_needed) {
                        this.addNotificationMessage(this.client_notifications.identity);
                    }
                }
            }
            if (document_needs_action) this.addNotificationMessage(this.client_notifications.document_needs_action);

            if (is_tnc_needed) {
                this.addNotificationMessage(this.client_notifications.tnc);
            }
        }

        if (!is_eu && isMultiplierContract(selected_contract_type) && current_language === 'EN' && is_logged_in) {
            this.addNotificationMessage(this.client_notifications.deriv_go);
        } else {
            this.removeNotificationMessageByKey({ key: this.client_notifications.deriv_go.key });
        }
    }

    @action.bound
    handleCashierNotifications() {
        const { accounts, account_settings, account_status, isAccountOfType, loginid } = this.root_store.client;
        const { is_p2p_visible } = this.root_store.modules.cashier.general_store;

        let has_missing_required_field;

        const { status, cashier_validation } = account_status;

        const { cashier_locked, withdrawal_locked, deposit_locked, mt5_withdrawal_locked } = getStatusValidations(
            status || []
        );

        if (loginid !== LocalStore.get('active_loginid')) return;

        const client = accounts[loginid];
        if (client && !client.is_virtual) {
            if (isEmptyObject(account_status)) return;
            if (loginid !== LocalStore.get('active_loginid')) return;

            const {
                system_maintenance,
                unwelcome_status,
                no_withdrawal_or_trading_status,
                withdrawal_locked_status,
                cashier_locked_status,
                ASK_AUTHENTICATE,
                ASK_SELF_EXCLUSION_MAX_TURNOVER_SET,
                ASK_FIX_DETAILS,
                ASK_UK_FUNDS_PROTECTION,
            } = cashier_validation ? getCashierValidations(cashier_validation) : {};

            if (system_maintenance) {
                this.setClientNotifications(client);
                this.addNotificationMessage(
                    this.client_notifications.system_maintenance(withdrawal_locked, deposit_locked)
                );
            } else if (cashier_locked) {
                if (cashier_locked_status) {
                    this.addNotificationMessage(this.client_notifications.cashier_locked);
                } else if (ASK_UK_FUNDS_PROTECTION) {
                    this.addNotificationMessage(this.client_notifications.ask_uk_funds_protection);
                } else if (ASK_SELF_EXCLUSION_MAX_TURNOVER_SET) {
                    this.addNotificationMessage(this.client_notifications.max_turnover_limit_not_set);
                } else if (ASK_FIX_DETAILS) {
                    this.addNotificationMessage(
                        this.client_notifications.required_fields(withdrawal_locked, deposit_locked)
                    );
                } else {
                    this.addNotificationMessage(this.client_notifications.cashier_locked);
                }
            } else {
                if (withdrawal_locked && ASK_AUTHENTICATE) {
                    this.addNotificationMessage(this.client_notifications.withdrawal_locked_review);
                } else if (withdrawal_locked && no_withdrawal_or_trading_status) {
                    this.addNotificationMessage(this.client_notifications.no_withdrawal_or_trading);
                } else if (withdrawal_locked && withdrawal_locked_status) {
                    this.addNotificationMessage(this.client_notifications.withdrawal_locked);
                } else if (withdrawal_locked && ASK_FIX_DETAILS) {
                    this.addNotificationMessage(
                        this.client_notifications.required_fields(withdrawal_locked, deposit_locked)
                    );
                }
                if (deposit_locked && unwelcome_status) {
                    this.addNotificationMessage(this.client_notifications.unwelcome);
                }
            }
            if (mt5_withdrawal_locked) this.addNotificationMessage(this.client_notifications.mt5_withdrawal_locked);
            if (is_p2p_visible) {
                this.addNotificationMessage(this.client_notifications.dp2p);
            } else {
                this.removeNotificationMessageByKey({ key: this.client_notifications.dp2p.key });
            }

            has_missing_required_field = hasMissingRequiredField(account_settings, client, isAccountOfType);
            if (has_missing_required_field) {
                this.addNotificationMessage(
                    this.client_notifications.required_fields(withdrawal_locked, deposit_locked)
                );
            }
        }
    }

    @action.bound
    handleClientNotifications() {
        this.handleAccountNotifications();
        this.handleCashierNotifications();
        this.setShouldShowPopups(true);
    }

    @action.bound
    init() {
        this.setClientNotifications();
    }

    @action.bound
    markNotificationMessage({ key }) {
        this.marked_notifications.push(key);
    }

    @action.bound
    refreshNotifications() {
        this.removeNotifications(true);
        this.removeAllNotificationMessages();
        this.handleClientNotifications();
    }

    @action.bound
    removeAllNotificationMessages(should_close_persistent) {
        this.notification_messages = should_close_persistent
            ? []
            : [...this.notification_messages.filter(notifs => notifs.is_persistent)];
    }

    @action.bound
    removeNotifications(should_close_persistent) {
        this.notifications = should_close_persistent
            ? []
            : [...this.notifications.filter(notifs => notifs.is_persistent)];
    }

    @action.bound
    removeNotificationByKey({ key }) {
        this.notifications = this.notifications.filter(n => n.key !== key);
    }

    @action.bound
    removeNotificationMessage({ key, should_show_again } = {}) {
        if (!key) return;
        this.notification_messages = this.notification_messages.filter(n => n.key !== key);
        // Add notification messages to LocalStore when user closes, check for redundancy
        const active_loginid = LocalStore.get('active_loginid');
        if (!excluded_notifications.includes(key) && active_loginid) {
            let messages = LocalStore.getObject('notification_messages');
            // Check if same message already exists in LocalStore for this account
            if (messages[active_loginid] && messages[active_loginid].includes(key)) {
                return;
            }
            const getCurrentMessage = () => {
                if (Array.isArray(messages[active_loginid])) {
                    messages[active_loginid].push(key);
                    return messages[active_loginid];
                }
                return [key];
            };
            if (!should_show_again) {
                // Store message into LocalStore upon closing message
                messages = { ...messages, [active_loginid]: getCurrentMessage() };
                LocalStore.setObject('notification_messages', messages);
            }
        }
    }

    @action.bound
    removeNotificationMessageByKey({ key }) {
        this.notification_messages = this.notification_messages.filter(n => n.key !== key);
    }

    @action.bound
    resetVirtualBalanceNotification(loginid) {
        const { accounts, is_logged_in } = this.root_store.client;
        if (!is_logged_in) return;
        if (!accounts[loginid].is_virtual) return;
        const min_reset_limit = 1000;
        const max_reset_limit = 999000;
        const balance = parseInt(accounts[loginid].balance);

        // Display notification message to user with virtual account to reset their balance
        // if the balance is less than equals to 1000 or more than equals to 999000
        if (balance <= min_reset_limit || balance >= max_reset_limit) {
            let message = localize(
                'Your demo account balance is low. Reset your balance to continue trading from your demo account.'
            );
            if (balance >= max_reset_limit)
                message = localize(
                    'Your demo account balance has reached the maximum limit, and you will not be able to place new trades. Reset your balance to continue trading from your demo account.'
                );
            this.setClientNotifications({ resetVirtualBalance: this.resetVirtualBalance, message });
            this.addNotificationMessage(this.client_notifications.reset_virtual_balance);
        } else {
            this.removeNotificationByKey({ key: 'reset_virtual_balance' });
            this.removeNotificationMessage({ key: 'reset_virtual_balance', should_show_again: true });
        }
    }

    @action.bound
    setClientNotifications(client = {}) {
        const mx_mlt_custom_header = this.custom_notifications.mx_mlt_notification.header();
        const mx_mlt_custom_content = this.custom_notifications.mx_mlt_notification.main();
        const { ui } = this.root_store;

        const notifications = {
            dp2p: {
                key: 'dp2p',
                header: localize('Payment problems?'),
                message: localize('There’s an app for that'),
                primary_btn: {
                    text: localize('Learn more'),
                    onClick: () => {
                        window.open(getStaticUrl('/p2p'), '_blank');
                    },
                },
                img_src: getUrlBase('/public/images/common/dp2p_banner.png'),
                img_alt: 'Deriv P2P',
                type: 'news',
            },
            close_mx_mlt_account: {
                key: 'close_mx_mlt_account',
                header: mx_mlt_custom_header,
                message: mx_mlt_custom_content,
                secondary_btn: {
                    text: localize('Learn more'),
                    onClick: () => {
                        ui.showCloseMxMltAccountPopup(true);
                    },
                },
                img_src: getUrlBase('/public/images/common/close_account_banner.png'),
                img_alt: 'close mx mlt account',
                type: 'close_mx_mlt',
            },
            is_virtual: {
                key: 'is_virtual',
                header: localize('You are on your demo account'),
                message: localize('Please switch to your real account or create one to access the cashier.'),
                type: 'warning',
            },
            no_residence: {
                key: 'no_residence',
                header: localize('You have not selected your country of residence'),
                message: localize(
                    'Please set your country of residence in your account settings to access the cashier.'
                ),
                action: {
                    route: routes.personal_details,
                    text: localize('Go to my account settings'),
                },
                type: 'warning',
            },
            currency: {
                key: 'currency',
                header: localize('You have not selected your account currency'),
                message: localize('Please set your account currency to enable deposits and withdrawals.'),
                action: {
                    onClick: () => {
                        ui.openRealAccountSignup('set_currency');
                    },
                    text: localize('Set my account currency'),
                },
                type: 'danger',
            },
            self_exclusion: excluded_until => {
                return {
                    key: 'self_exclusion',
                    header: localize('You have self-excluded from trading'),
                    message: (
                        <Localize
                            i18n_default_text='You have chosen to exclude yourself from trading on our website until {{exclusion_end}}. If you are unable to place a trade or deposit after your self-exclusion period, please contact us via live chat.'
                            values={{
                                exclusion_end: formatDate(excluded_until, 'DD MMM, YYYY'),
                                interpolation: { escapeValue: false },
                            }}
                        />
                    ),
                    action: {
                        onClick: () => {
                            window.LC_API.open_chat_window();
                        },
                        text: localize('Go to live chat'),
                    },
                    type: 'danger',
                };
            },
            cashier_locked: {
                key: 'cashier_locked',
                header: localize('Your cashier is currently locked'),
                message: localize('Please contact us via live chat to unlock it.'),
                action: {
                    onClick: () => {
                        window.LC_API.open_chat_window();
                    },
                    text: localize('Go to live chat'),
                },
                type: 'warning',
            },
            system_maintenance: (withdrawal_locked, deposit_locked) => {
                let message, header;
                if (isCryptocurrency(client.currency)) {
                    if (withdrawal_locked) {
                        header = localize('Unable to process withdrawals in the moment');
                        message = localize(
                            'Withdrawals are temporarily unavailable due to system maintenance. You can make withdrawals when the maintenance is complete.'
                        );
                    } else if (deposit_locked) {
                        header = localize('Unable to process deposit in the moment');
                        message = localize(
                            'Deposits are temporarily unavailable due to system maintenance. You can make deposits when the maintenance is complete.'
                        );
                    } else {
                        header = localize('Scheduled cashier system maintenance');
                        message = localize(
                            'Our cryptocurrency cashier is temporarily down due to system maintenance. You can make cryptocurrency deposits and withdrawals in a few minutes when the maintenance is complete.'
                        );
                    }
                } else {
                    header = localize('Scheduled cashier system maintenance');
                    message = localize(
                        'Our cashier is temporarily down due to system maintenance. You can access the cashier in a few minutes when the maintenance is complete.'
                    );
                }
                return {
                    key: 'system_maintenance',
                    header,
                    message,
                    type: 'warning',
                };
            },
            identity: {
                key: 'identity',
                header: localize('Let’s verify your ID'),
                message: localize(
                    'You need to make a quick identity verification before you can access the Cashier. Please go to your account settings to submit your proof of identity.'
                ),
                action: {
                    route: routes.proof_of_identity,
                    text: localize('Go to my account settings'),
                },
                type: 'warning',
            },
            authenticate: {
                key: 'authenticate',
                header: localize('Your account has not been verified'),
                message: localize(
                    'Please submit your proof of identity and proof of address to verify your account in your account settings to access the cashier.'
                ),
                action: {
                    route: routes.proof_of_identity,
                    text: localize('Go to my account settings'),
                },
                type: 'warning',
            },
            withdrawal_locked_review: {
                key: 'withdrawal_locked_review',
                header: localize('Your account has not been verified'),
                message: localize(
                    'Please submit your proof of identity and proof of address to verify your account in your account settings to access the cashier.'
                ),
                action: {
                    route: routes.proof_of_identity,
                    text: localize('Go to my account settings'),
                },
                type: 'warning',
            },
            no_withdrawal_or_trading: {
                key: 'no_withdrawal_or_trading',
                header: localize('You are only allowed to make deposits'),
                message: localize('Please contact us via live chat to enable withdrawals.'),
                action: {
                    onClick: () => {
                        window.LC_API.open_chat_window();
                    },
                    text: localize('Go to live chat'),
                },
                type: 'warning',
            },
            withdrawal_locked: {
                key: 'withdrawal_locked',
                header: localize('You are only allowed to make deposits'),
                message: localize('Please contact us via live chat to enable withdrawals.'),
                action: {
                    onClick: () => {
                        window.LC_API.open_chat_window();
                    },
                    text: localize('Go to live chat'),
                },
                type: 'warning',
            },
            mt5_withdrawal_locked: {
                key: 'mt5_withdrawal_locked',
                header: localize('MT5 withdrawal disabled'),
                message: localize(
                    'MT5 withdrawals have been disabled on your account. Please check your email for more details.'
                ),
                type: 'warning',
            },
            ask_financial_risk_approval: {
                key: 'ask_financial_risk_approval',
                header: localize('Complete your Appropriateness Test'),
                message: localize('Please click the following link to complete your Appropriateness Test.'),
                action: {
                    route: routes.financial_assessment,
                    text: localize('Click here'),
                },
                type: 'warning',
            },
            document_needs_action: {
                key: 'document_needs_action',
                header: localize('Authentication failed'),
                message: (
                    <Localize
                        i18n_default_text='<0>Your Proof of Identity or Proof of Address</0> did not meet our requirements. Please check your email for further instructions.'
                        components={[<BinaryLink key={0} className='link' to={routes.proof_of_identity} />]}
                    />
                ),
                type: 'warning',
            },
            unwelcome: {
                key: 'unwelcome',
                header: localize('Deposits are locked'),
                message: localize('Please contact us via live chat.'),
                action: {
                    onClick: () => {
                        window.LC_API.open_chat_window();
                    },
                    text: localize('Go to live chat'),
                },
                type: 'danger',
            },
            max_turnover_limit_not_set: {
                key: 'max_turnover_limit_not_set',
                header: localize('You’ve not set your 30-day turnover limit'),
                message: localize(
                    'Your access to the cashier has been temporarily disabled as you have not set your 30-day turnover limit. Please go to Self-exclusion and set the limit.'
                ),
                action: {
                    route: routes.self_exclusion,
                    text: localize('Go to Self-exclusion'),
                },
                type: 'danger',
            },
            risk: {
                key: 'risk',
                header: localize('Your cashier is locked'),
                message: localize('Please complete the financial assessment in your account settings to unlock it.'),
                action: {
                    route: routes.financial_assessment,
                    text: localize('Go to my account settings'),
                },
                type: 'warning',
            },
            tax: {
                key: 'tax',
                header: localize('You have not provided your tax identification number'),
                message: localize(
                    'This information is necessary for legal and regulatory requirements. Please go to your account settings, and fill in your latest tax identification number.'
                ),
                action: {
                    route: routes.personal_details,
                    text: localize('Go to my account settings'),
                },
                type: 'danger',
            },
            tnc: {
                action: {
                    onClick: async () => {
                        await WS.tncApproval();
                        WS.getSettings();
                    },
                    text: localize('I accept'),
                },
                key: 'tnc',
                header: localize('Terms & conditions updated'),
                message: (
                    <Localize
                        i18n_default_text='Please accept our <0>updated Terms and Conditions</0> to proceed.'
                        components={[<StaticUrl key={0} className='link' href='terms-and-conditions' />]}
                    />
                ),
                type: 'warning',
            },
            required_fields: (withdrawal_locked, deposit_locked) => {
                let message;
                if (withdrawal_locked) {
                    message = localize(
                        'Please go to your account settings and complete your personal details to enable withdrawals.'
                    );
                } else if (deposit_locked) {
                    message = localize(
                        'Please go to your account settings and complete your personal details to enable deposits.'
                    );
                } else {
                    message = localize(
                        'Please go to your account settings and complete your personal details to enable deposits and withdrawals.'
                    );
                }
                return {
                    key: 'required_fields',
                    header: localize('Your personal details are incomplete'),
                    message,
                    type: 'danger',
                    action: {
                        route: routes.personal_details,
                        text: localize('Go to my account settings'),
                    },
                };
            },
            you_are_offline: {
                key: 'you_are_offline',
                header: localize('You are offline'),
                message: <Localize i18n_default_text='Check your connection.' />,
                type: 'danger',
            },
            password_changed: {
                key: 'password_changed',
                header: localize('Password updated.'),
                message: <Localize i18n_default_text='Please log in with your updated password.' />,
                type: 'info',
            },
            reset_virtual_balance: {
                key: 'reset_virtual_balance',
                header: localize('Reset your balance'),
                message: client.message,
                type: 'info',
                is_persistent: true,
                should_show_again: true,
                platform: [platform_name.DTrader],
                is_disposable: true,
                action: {
                    text: localize('Reset balance'),
                    onClick: async () => {
                        await client.resetVirtualBalance();
                    },
                },
            },
            needs_poi: {
                action: {
                    route: routes.proof_of_identity,
                    text: localize('Verify identity'),
                },
                key: 'needs_poi',
                header: localize('Please verify your proof of identity'),
                message: localize('To continue trading with us, please confirm who you are.'),
                type: 'danger',
            },
            needs_poa: {
                action: {
                    route: routes.proof_of_address,
                    text: localize('Verify address'),
                },
                key: 'needs_poa',
                header: localize('Please verify your proof of address'),
                message: localize('To continue trading with us, please confirm where you live.'),
                type: 'danger',
            },
            needs_poi_virtual: {
                action: {
                    onClick: async () => {
                        const { switchAccount, first_switchable_real_loginid } = client;

                        await switchAccount(first_switchable_real_loginid);
                    },
                    text: localize('Verify identity'),
                },
                key: 'needs_poi_virtual',
                header: localize('Please Verify your identity'),
                message: localize(
                    'We couldn’t verify your personal details with our records, to enable deposit, withdrawals and trading, you need to upload proof of your identity.'
                ),
                type: 'danger',
            },
            needs_poa_virtual: {
                action: {
                    route: routes.proof_of_address,
                    text: localize('Verify address'),
                },
                key: 'needs_poa_virtual',
                header: localize('Please Verify your address'),
                message: localize(
                    'We couldn’t verify your personal details with our records, to enable deposit, withdrawals and trading, you need to upload proof of your address.'
                ),
                type: 'danger',
            },
            documents_expired: {
                key: 'poi_expired',
                header: localize('You submitted expired identification documents'),
                message: localize('Please submit valid identity documents to unlock the cashier.'),
                action: {
                    route: routes.proof_of_identity,
                    text: localize('Submit identity documents'),
                },
                type: 'danger',
            },
            new_version_available: {
                action: {
                    onClick: () => window.location.reload(),
                    text: localize('Refresh now'),
                },
                key: 'new_version_available',
                header: localize('A new version of Deriv is available'),
                message: localize('This page will automatically refresh in 5 minutes to load the latest version.'),
                type: 'warning',
                should_hide_close_btn: true,
                timeout: 300000,
                timeoutMessage: remaining => localize('Auto update in {{ remaining }} seconds', { remaining }),
            },
            install_pwa: {
                key: 'install_pwa',
                action: {
                    onClick: () => ui.installWithDeferredPrompt(),
                    text: localize('Install'),
                },
                header: localize('Install the DTrader web app'),
                message: localize('Launch DTrader in seconds the next time you want to trade.'),
                type: 'announce',
                should_hide_close_btn: false,
            },
            ask_uk_funds_protection: {
                key: 'ask_uk_funds_protection',
                header: localize('Your cashier is locked'),
                message: localize('See how we protect your funds to unlock the cashier.'),
                action: {
                    route: routes.cashier_deposit,
                    text: localize('Find out more'),
                },
                type: 'warning',
            },
            deriv_go: {
                key: 'deriv_go',
                message: (
                    <Localize
                        i18n_default_text='Get a faster mobile trading experience with the <0>Deriv GO</0> app!'
                        components={[<StaticUrl key={0} className='link dark' href='/landing/deriv-go' />]}
                    />
                ),
                cta_btn: {
                    text: localize('Learn more'),
                    onClick: () => {
                        window.open(getStaticUrl('/landing/deriv-go'), '_blank');
                    },
                },
                img_src: getUrlBase('/public/images/common/derivgo_banner.png'),
                img_alt: 'deriv_go',
                type: 'promotions',
            },
        };
        this.client_notifications = notifications;
    }

    @action.bound
    setShouldShowPopups(should_show_popups) {
        this.should_show_popups = should_show_popups;
    }

    @action.bound
    toggleNotificationsModal() {
        this.is_notifications_visible = !this.is_notifications_visible;
    }

    @action.bound
    unmarkNotificationMessage({ key }) {
        this.marked_notifications = this.marked_notifications.filter(item => key !== item);
    }

    @action.bound
    updateNotifications(notifications_array) {
        this.notifications = notifications_array.filter(message => !excluded_notifications.includes(message.key));
    }
}
