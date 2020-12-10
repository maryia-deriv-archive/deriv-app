import classNames from 'classnames';
import React from 'react';
import { Icon, Money } from '@deriv/components';
import { formatMoney, getCurrencyName, getMT5AccountDisplay, getCurrencyDisplayCode } from '@deriv/shared';
import { Localize, localize } from '@deriv/translations';

const AccountList = ({
    balance,
    currency,
    currency_icon,
    display_type,
    has_balance,
    is_disabled,
    is_virtual,
    loginid,
    market_type,
    onClickAccount,
    selected_loginid,
    sub_account_type,
}) => {
    if (is_disabled && !currency) return null;
    const currency_badge = currency ? currency_icon : 'IcCurrencyUnknown';

    return (
        <>
            <div
                id={`dt_${loginid}`}
                className={classNames('acc-switcher__account', {
                    'acc-switcher__account--selected': loginid === selected_loginid,
                    'acc-switcher__account--disabled': is_disabled,
                })}
                onClick={is_disabled ? undefined : onClickAccount}
            >
                <span className='acc-switcher__id'>
                    <Icon
                        icon={is_virtual ? 'IcCurrencyVirtual' : currency_badge}
                        className={'acc-switcher__id-icon'}
                        size={24}
                    />
                    <span>
                        {display_type === 'currency' ? (
                            <CurrencyDisplay is_virtual={is_virtual} currency={currency} />
                        ) : (
                            <AccountDisplay market_type={market_type} sub_account_type={sub_account_type} />
                        )}
                        <div className='acc-switcher__loginid-text'>{loginid}</div>
                    </span>
                    {has_balance && (
                        <span className='acc-switcher__balance'>
                            {currency && (
                                <Money
                                    currency={getCurrencyDisplayCode(currency)}
                                    amount={formatMoney(currency, balance, true)}
                                    should_format={false}
                                    show_currency
                                />
                            )}
                        </span>
                    )}
                </span>
            </div>
        </>
    );
};

const CurrencyDisplay = ({ currency, is_virtual }) => {
    if (is_virtual) {
        return <Localize i18n_default_text='Demo' />;
    }
    if (!currency) {
        return <Localize i18n_default_text='No currency assigned' />;
    }
    return getCurrencyName(currency);
};

const AccountDisplay = ({ market_type, sub_account_type }) => (
    <div>{getMT5AccountDisplay(market_type, sub_account_type)}</div>
);

export default AccountList;
