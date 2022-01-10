import { Field, FieldProps, Formik, FormikHelpers as FormikActions, FormikProps } from 'formik';
import React from 'react';
import { FormSubHeader } from '@deriv/account';
import {
    Autocomplete,
    AutoHeightWrapper,
    DesktopWrapper,
    Div100vhContainer,
    Dropdown,
    FormSubmitButton,
    FormSubmitErrorMessage,
    Input,
    Loading,
    MobileWrapper,
    Modal,
    SelectNative,
    Text,
    ThemedScrollbars,
} from '@deriv/components';
import { isDeepEqual, isDesktop, isMobile } from '@deriv/shared';
import { Localize, localize } from '@deriv/translations';

type TCFDPersonalDetailsFormProps = {
    onSave: (index: number, values: TFormValues) => void;
    is_fully_authenticated: boolean;
    is_loading: boolean;
    landing_company: TLandingCompany;
    residence_list: TResidenceObject[];
    onCancel: () => void;
    onSubmit: TOnSubmit;
    value: TFormValues;
    index: number;
    form_error?: string;
};

type TLandingCompany = {
    config: {
        tax_details_required?: number;
        tin_format?: string[];
        tin_format_description?: string;
    };
    dxtrade_financial_company: Record<'standard', TCompanyDetailsObject>;
    dxtrade_gaming_company: Record<'standard', TCompanyDetailsObject>;
    financial_company: Record<'standard', TCompanyDetailsObject>;
    gaming_company: Record<'standard', TCompanyDetailsObject>;
    id: string;
    minimum_age: number;
    mt_financial_company: Record<'financial' | 'financial_stp' | 'swap_free', TCompanyDetailsObject>;
    mt_gaming_company: Record<'financial' | 'swap_free', TCompanyDetailsObject>;
    name: string;
    virtual_company: string;
};

type TCompanyDetailsObject = {
    address: string[] | null;
    changeable_fields: {
        only_before_auth: string[];
        personal_details_not_locked: string[];
    };
    country: string;
    currency_config: Record<
        'commodities' | 'cryptocurrency' | 'forex' | 'indices' | 'synthetic_index',
        TMarketPairsObject
    >;
    has_reality_check: number;
    legal_allowed_contract_categories: string[];
    legal_allowed_currencies: string[];
    legal_allowed_markets: string[];
    legal_default_currency: string;
    name: string;
    requirements: {
        signup: string[];
        withdrawal: string[];
    };
    shortcode: string;
    support_professional_client: number;
};

type TMarketPairsObject = {
    [key: string]: {
        max_payout: number;
        min_stake: number;
    };
};

type TResidenceObject = {
    identity: TIdentityObject;
    phone_idd: string;
    text: string;
    value: string;
    tin_format?: string[];
};

type TIdentityObject = {
    services: Record<'idv' | 'onfido', TPOIServiceObject>;
};

type TPOIServiceObject = {
    documents_supported: {
        [key: string]: { display_name: string } | undefined;
    };
    has_visual_sample?: number;
    is_country_supported: number;
};

type TValidatePersonalDetailsParams = {
    values: TFormValues;
    residence_list: TResidenceObject[];
    account_opening_reason: TAccountOpeningReasonList;
    is_tin_required: boolean;
};

type TFindDefaultValuesInResidenceList = (
    citizen_text: string,
    tax_residence_text: string,
    residence_list: TResidenceObject[]
) => {
    citizen?: TResidenceObject;
    tax_residence?: TResidenceObject;
};

type TCFDInputFieldProps = {
    id?: string;
    value?: string;
    name: string;
    maxLength?: number;
    label: string;
    optional?: boolean;
    required?: boolean;
    placeholder: string;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
};

type TFormValues = {
    citizen: string;
    tax_residence: string;
    tax_identification_number: string;
    account_opening_reason: string;
};

type TOnSubmit = (
    index: number,
    value: TFormValues,
    setSubmitting: (isSubmitting: boolean) => void,
    is_dirty?: boolean
) => void;

type TSubmitForm = (
    values: TFormValues,
    actions: FormikActions<TFormValues>,
    idx: number,
    onSubmitFn: TOnSubmit,
    is_dirty: boolean,
    residence_list: TResidenceObject[]
) => void;

type TAccountOpeningReasonList = {
    text: string;
    value: string;
}[];

const getAccountOpeningReasonList = (): TAccountOpeningReasonList => [
    {
        text: localize('Hedging'),
        value: 'Hedging',
    },
    {
        text: localize('Income Earning'),
        value: 'Income Earning',
    },
    {
        text: localize('Speculative'),
        value: 'Speculative',
    },
    {
        text: localize('Peer-to-peer exchange'),
        value: 'Peer-to-peer exchange',
    },
];

export const InputField = ({ maxLength, name, optional = false, ...props }: TCFDInputFieldProps) => (
    <Field name={name}>
        {({ field, form: { errors, touched } }: FieldProps<TFormValues>) => (
            <Input
                {...field}
                type='text'
                required={!optional}
                name={name}
                autoComplete='off'
                maxLength={maxLength || '30'}
                error={touched[field.name] && errors[field.name]}
                {...props}
            />
        )}
    </Field>
);

const validatePersonalDetails = ({
    values,
    residence_list,
    account_opening_reason,
    is_tin_required,
}: TValidatePersonalDetailsParams) => {
    const [tax_residence_obj] = residence_list.filter(res => res.text === values.tax_residence && res.tin_format);
    const [tin_format] = tax_residence_obj?.tin_format ?? [];
    const tin_regex = tin_format || '^[A-Za-z0-9./s-]{0,25}$'; // fallback to API's default rule check

    const validations = {
        citizen: [(v: string) => !!v, (v: string) => residence_list.map(i => i.text).includes(v)],
        tax_residence: [(v: string) => !!v, (v: string) => residence_list.map(i => i.text).includes(v)],
        tax_identification_number: [
            (v: string) => ((!values.tax_residence && is_tin_required) || tin_format ? !!v : true),
            (v: string) => (tin_regex ? v.match(tin_regex) : true),
        ],
        account_opening_reason: [
            (v: string) => !!v,
            (v: string) => account_opening_reason.map(i => i.value).includes(v),
        ],
    };
    const mappedKey: { [key: string]: string } = {
        citizen: localize('Citizenship'),
        tax_residence: localize('Tax residence'),
        tax_identification_number: localize('Tax identification number'),
        account_opening_reason: localize('Account opening reason'),
    };

    const field_error_messages = (field_name: string): string[] => [
        localize('{{field_name}} is required', { field_name }),
        localize('{{field_name}} is not properly formatted.', { field_name }),
    ];

    const errors: { [key: string]: React.ReactNode } = {};

    Object.entries(validations).forEach(([key, rules]) => {
        const error_index = rules.findIndex(v => !v(values[key as keyof TFormValues]));
        if (error_index !== -1) {
            errors[key] = field_error_messages(mappedKey[key])[error_index];
        }
    });

    return errors;
};

const findDefaultValuesInResidenceList: TFindDefaultValuesInResidenceList = (
    citizen_text,
    tax_residence_text,
    residence_list
) => {
    let citizen, tax_residence;
    residence_list.forEach((item: TResidenceObject) => {
        if (item.text === citizen_text) {
            citizen = item;
        }
        if (item.text === tax_residence_text) {
            tax_residence = item;
        }
    });
    return { citizen, tax_residence };
};

const submitForm: TSubmitForm = (values, actions, idx, onSubmitFn, is_dirty, residence_list) => {
    const { citizen: citizen_text, tax_residence: tax_residence_text, ...restOfValues } = values;
    const { citizen, tax_residence } = findDefaultValuesInResidenceList(
        citizen_text,
        tax_residence_text,
        residence_list
    );

    const payload = {
        citizen: typeof citizen !== 'undefined' ? citizen.value : '',
        tax_residence: typeof tax_residence !== 'undefined' ? tax_residence.value : '',
        ...restOfValues,
    };
    onSubmitFn(idx, payload, actions.setSubmitting, is_dirty);
};

const CFDPersonalDetailsForm = ({
    onSave,
    is_fully_authenticated,
    is_loading,
    landing_company,
    residence_list,
    onCancel,
    onSubmit,
    value,
    index,
    form_error,
}: TCFDPersonalDetailsFormProps) => {
    const account_opening_reason = getAccountOpeningReasonList();
    const is_tin_required = !!(landing_company?.config?.tax_details_required ?? false);

    const handleCancel = (values: TFormValues) => {
        onSave(index, values);
        onCancel();
    };

    const onSubmitForm = (values: TFormValues, actions: FormikActions<TFormValues>) =>
        submitForm(values, actions, index, onSubmit, !isDeepEqual(value, values), residence_list);

    if (residence_list.length === 0) return <Loading is_fullscreen={false} />;
    if (is_loading) return <Loading is_fullscreen={false} />;

    return (
        <Formik
            initialValues={{
                citizen: value.citizen,
                tax_residence: value.tax_residence,
                tax_identification_number: value.tax_identification_number,
                account_opening_reason: value.account_opening_reason,
            }}
            validateOnMount
            validateOnChange
            validateOnBlur
            validate={values =>
                validatePersonalDetails({
                    values,
                    residence_list,
                    account_opening_reason,
                    is_tin_required,
                })
            }
            onSubmit={onSubmitForm}
        >
            {({
                handleSubmit,
                isSubmitting,
                handleChange,
                handleBlur,
                errors,
                touched,
                values,
                setFieldValue,
                isValid,
            }: FormikProps<TFormValues>) => (
                <AutoHeightWrapper default_height={200} height_offset={isDesktop() ? 148 : null}>
                    {({ height, setRef }: { height: number; setRef: (instance: HTMLFormElement | null) => void }) => (
                        <form
                            className='cfd-financial-stp-modal__form'
                            ref={setRef}
                            onSubmit={handleSubmit}
                            autoComplete='off'
                        >
                            <Div100vhContainer
                                className='details-form'
                                max_autoheight_offset='179px'
                                is_disabled={isDesktop()}
                            >
                                <Text as='p' size='xxxs' align='center' className='details-form__description'>
                                    <Localize
                                        i18n_default_text={
                                            'Any information you provide is confidential and will be used for verification purposes only.'
                                        }
                                    />
                                </Text>
                                <ThemedScrollbars height={height} is_bypassed={isMobile()}>
                                    <div className='details-form__elements'>
                                        <FormSubHeader title={localize('Details')} />
                                        <fieldset className='account-form__fieldset'>
                                            <DesktopWrapper>
                                                <Field name='citizen'>
                                                    {({ field }: FieldProps<TFormValues>) => (
                                                        <Autocomplete
                                                            {...field}
                                                            id='real_mt5_citizenship'
                                                            data-lpignore='true'
                                                            autoComplete='off'
                                                            type='text'
                                                            label={localize('Citizenship')}
                                                            error={touched.citizen && errors.citizen}
                                                            disabled={!!(value.citizen && is_fully_authenticated)}
                                                            list_items={residence_list}
                                                            onItemSelection={(item: TResidenceObject) =>
                                                                setFieldValue(
                                                                    'citizen',
                                                                    item.value ? item.text : '',
                                                                    true
                                                                )
                                                            }
                                                            list_portal_id='modal_root'
                                                            required
                                                        />
                                                    )}
                                                </Field>
                                            </DesktopWrapper>
                                            <MobileWrapper>
                                                <SelectNative
                                                    placeholder={localize('Please select')}
                                                    label={localize('Citizenship')}
                                                    value={values.citizen}
                                                    list_items={residence_list}
                                                    error={touched.citizen && errors.citizen}
                                                    disabled={!!(value.citizen && is_fully_authenticated)}
                                                    use_text={true}
                                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                                        setFieldValue('citizen', e.target.value, true)
                                                    }
                                                    required
                                                    should_hide_disabled_options={false}
                                                />
                                            </MobileWrapper>
                                        </fieldset>
                                        <FormSubHeader title={localize('Tax information')} />
                                        <fieldset className='account-form__fieldset'>
                                            <DesktopWrapper>
                                                <Field name='tax_residence'>
                                                    {({ field }: FieldProps<TFormValues>) => (
                                                        <Autocomplete
                                                            id='real_mt5_tax_residence'
                                                            data-lpignore='true'
                                                            type='text'
                                                            autoComplete='off'
                                                            label={localize('Tax residence')}
                                                            error={touched.tax_residence && errors.tax_residence}
                                                            disabled={!!(value.tax_residence && is_fully_authenticated)}
                                                            list_items={residence_list}
                                                            onItemSelection={({ value: v, text }: TResidenceObject) =>
                                                                setFieldValue('tax_residence', v ? text : '', true)
                                                            }
                                                            list_portal_id='modal_root'
                                                            {...field}
                                                        />
                                                    )}
                                                </Field>
                                            </DesktopWrapper>
                                            <MobileWrapper>
                                                <SelectNative
                                                    placeholder={localize('Please select')}
                                                    label={localize('Tax residence')}
                                                    value={values.tax_residence}
                                                    error={touched.tax_residence && errors.tax_residence}
                                                    disabled={!!(value.tax_residence && is_fully_authenticated)}
                                                    list_items={residence_list}
                                                    use_text={true}
                                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                                        setFieldValue('tax_residence', e.target.value, true)
                                                    }
                                                    required
                                                />
                                            </MobileWrapper>
                                        </fieldset>
                                        <fieldset className='account-form__fieldset'>
                                            <InputField
                                                id='real_mt5_tax_identification_number'
                                                name='tax_identification_number'
                                                label={localize('Tax identification number')}
                                                placeholder={localize('Tax identification number')}
                                                value={values.tax_identification_number}
                                                onBlur={handleBlur}
                                                optional
                                            />
                                        </fieldset>
                                        <FormSubHeader title={localize('Account opening reason')} />
                                        <Field name='account_opening_reason'>
                                            {({ field }: FieldProps<TFormValues>) => (
                                                <React.Fragment>
                                                    <DesktopWrapper>
                                                        <Dropdown
                                                            {...field}
                                                            placeholder={localize('Account opening reason')}
                                                            is_align_text_left
                                                            name={field.name}
                                                            list={account_opening_reason}
                                                            value={values.account_opening_reason}
                                                            onChange={handleChange}
                                                            handleBlur={handleBlur}
                                                            error={
                                                                touched.account_opening_reason &&
                                                                errors.account_opening_reason
                                                            }
                                                            list_portal_id='modal_root'
                                                        />
                                                    </DesktopWrapper>
                                                    <MobileWrapper>
                                                        <SelectNative
                                                            {...field}
                                                            placeholder={localize('Please select')}
                                                            name={field.name}
                                                            label={localize('Account opening reason')}
                                                            list_items={account_opening_reason}
                                                            value={values.account_opening_reason}
                                                            error={
                                                                touched.account_opening_reason &&
                                                                errors.account_opening_reason
                                                            }
                                                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                                                handleChange(e);
                                                                setFieldValue(
                                                                    'account_opening_reason',
                                                                    e.target.value,
                                                                    true
                                                                );
                                                            }}
                                                        />
                                                    </MobileWrapper>
                                                </React.Fragment>
                                            )}
                                        </Field>
                                    </div>
                                </ThemedScrollbars>
                            </Div100vhContainer>
                            <Modal.Footer is_bypassed={isMobile()}>
                                {form_error && <FormSubmitErrorMessage message={form_error} />}
                                <FormSubmitButton
                                    cancel_label={localize('Previous')}
                                    is_disabled={isSubmitting || !isValid}
                                    is_absolute={isMobile()}
                                    label={localize('Next')}
                                    onCancel={() => handleCancel(values)}
                                />
                            </Modal.Footer>
                        </form>
                    )}
                </AutoHeightWrapper>
            )}
        </Formik>
    );
};

export default CFDPersonalDetailsForm;
