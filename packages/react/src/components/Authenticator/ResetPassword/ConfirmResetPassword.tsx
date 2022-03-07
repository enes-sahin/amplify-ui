import * as React from 'react';

import { getFormFields, translate } from '@aws-amplify/ui';

import { useAuthenticator } from '..';
import { Flex, Heading } from '../../..';
import { RemoteErrorMessage, TwoButtonSubmitFooter } from '../shared';
import { useCustomComponents } from '../hooks/useCustomComponents';
import {
  isInputOrSelectElement,
  isInputElement,
  getFormDataFromEvent,
} from '../../../helpers/utils';
import { BaseFormFields } from '../shared/BaseFormFields';

export const ConfirmResetPassword = (): JSX.Element => {
  const {
    components: {
      ConfirmResetPassword: {
        Header = ConfirmResetPassword.Header,
        Footer = ConfirmResetPassword.Footer,
      },
    },
  } = useCustomComponents();

  const { _state, submitForm, updateForm, updateBlur, isPending } =
    useAuthenticator();

  const formFields = React.useMemo(
    () => getFormFields('confirmResetPassword', _state),
    []
  );

  const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
    if (isInputOrSelectElement(event.target)) {
      let { name, type, value } = event.target;
      if (
        isInputElement(event.target) &&
        type === 'checkbox' &&
        !event.target.checked
      ) {
        value = undefined;
      }

      updateForm({ name, value });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitForm(getFormDataFromEvent(event));
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    updateBlur({ name });
  };

  return (
    <form
      data-amplify-form=""
      data-amplify-authenticator-confirmresetpassword=""
      method="post"
      onSubmit={handleSubmit}
      onChange={handleChange}
    >
      <fieldset
        style={{ display: 'flex', flexDirection: 'column' }}
        className="amplify-flex"
        disabled={isPending}
      >
        <Header />

        <Flex direction="column">
          <BaseFormFields formFields={formFields} />
        </Flex>

        <RemoteErrorMessage />
        <TwoButtonSubmitFooter
          cancelButtonSendType="RESEND"
          cancelButtonText={translate('Resend Code')}
        />
        <Footer />
      </fieldset>
    </form>
  );
};

ConfirmResetPassword.Header = () => {
  const headerText = translate('Reset your password');

  return <Heading level={3}>{headerText}</Heading>;
};

ConfirmResetPassword.Footer = (): JSX.Element => null;
