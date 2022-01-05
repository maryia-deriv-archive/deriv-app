import { Formik } from 'formik';
import React from 'react';
import {
    AutoHeightWrapper,
    Div100vhContainer,
    ThemedScrollbars,
    FormSubmitButton,
    Text,
    Modal,
} from '@deriv/components';
import { localize, Localize } from '@deriv/translations';
import { isDesktop, isMobile } from '@deriv/shared';

const AcceptRiskForm = ({ is_target_account_mf = false, onSubmit, onClose = null }) => {
    const form_class_name = is_target_account_mf ? 'accept-risk__form accept-risk__form__mf' : 'accept-risk__form';

    return (
        <Formik initialValues={{}} onSubmit={onSubmit} validateOnMount>
            {({ handleSubmit }) => (
                <AutoHeightWrapper default_height={200}>
                    {({ setRef, height }) => (
                        <form ref={setRef} onSubmit={handleSubmit} className={form_class_name}>
                            <Div100vhContainer className='details-form' height_offset='40px' is_disabled={isDesktop()}>
                                <ThemedScrollbars autoHide={!(window.innerHeight < 890)} height={height - 77}>
                                    <div className='accept-risk__container'>
                                        <div className='accept-risk__header'>
                                            <Text weight='bold' size='xs'>
                                                {is_target_account_mf
                                                    ? localize('Appropriateness Test, WARNING:')
                                                    : localize('Warning')}
                                            </Text>
                                        </div>
                                        <Text as='p' size='xs'>
                                            {is_target_account_mf ? (
                                                <>
                                                    <Localize
                                                        i18n_default_text='In providing our services to you, we are required to obtain information from you in order to assess whether a given product or service is appropriate for you (that is, whether you possess the experience and knowledge to understand the risks involved).<0/><1/>'
                                                        components={[<br key={0} />, <br key={1} />]}
                                                    />
                                                    <Localize
                                                        i18n_default_text='On the basis of the information provided in relation to your knowledge and experience, we consider that the investments available via this website are not appropriate for you.<0/><1/>'
                                                        components={[<br key={0} />, <br key={1} />]}
                                                    />
                                                    <Localize i18n_default_text='By clicking Accept below and proceeding with the Account Opening you should note that you may be exposing yourself to risks (which may be significant, including the risk of loss of the entire sum invested) that you may not have the knowledge and experience to properly assess or mitigate.' />
                                                </>
                                            ) : (
                                                <Localize
                                                    i18n_default_text="Our products and services may expose you to risks that can be substantial at times, including the risk of losing your entire investment. Please note that by clicking <0>Continue</0>, you'll be accepting these risks."
                                                    components={[<strong key={0} />]}
                                                />
                                            )}
                                        </Text>
                                    </div>
                                </ThemedScrollbars>
                            </Div100vhContainer>
                            <input name='accept_risk' value='1' type='hidden' />
                            <Modal.Footer has_separator is_bypassed={isMobile()}>
                                {is_target_account_mf && onClose ? (
                                    <FormSubmitButton
                                        is_absolute={isMobile()}
                                        label={localize('Accept')}
                                        has_cancel
                                        cancel_label={localize('Decline')}
                                        onCancel={onClose}
                                    />
                                ) : (
                                    <FormSubmitButton is_absolute={isMobile()} label={localize('Continue')} />
                                )}
                            </Modal.Footer>
                        </form>
                    )}
                </AutoHeightWrapper>
            )}
        </Formik>
    );
};

export default AcceptRiskForm;
