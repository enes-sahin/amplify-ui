import * as React from 'react';

import {
  AuthChallengeNames,
  getActorState,
  getFormFields,
  SignInContext,
  SignInState,
  translate,
} from '@aws-amplify/ui';

import { useAuthenticator } from '..';
import { Flex, Heading } from '../../..';
import { ConfirmSignInFooter, RemoteErrorMessage } from '../shared';
import { useCustomComponents } from '../hooks/useCustomComponents';
import {
  isInputOrSelectElement,
  isInputElement,
  getFormDataFromEvent,
} from '../../../helpers/utils';
import { BaseFormFields } from '../shared/BaseFormFields';

export const ConfirmSignIn = (): JSX.Element => {
  const { submitForm, updateForm, isPending, _state } = useAuthenticator();

  const {
    components: {
      ConfirmSignIn: {
        Header = ConfirmSignIn.Header,
        Footer = ConfirmSignIn.Footer,
      },
    },
  } = useCustomComponents();

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

  const formFields = React.useMemo(
    () => getFormFields('confirmSignIn', _state),
    []
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitForm(getFormDataFromEvent(event));
  };

  return (
    <form
      data-amplify-form=""
      data-amplify-authenticator-confirmsignin=""
      method="post"
      onChange={handleChange}
      onSubmit={handleSubmit}
    >
      <fieldset
        style={{ display: 'flex', flexDirection: 'column' }}
        className="amplify-flex"
        disabled={isPending}
      >
        <Header />

        <Flex direction="column">
          <BaseFormFields formFields={formFields} />
          <RemoteErrorMessage />
        </Flex>

        <ConfirmSignInFooter />
        <Footer />
      </fieldset>
    </form>
  );
};

function Header() {
  const { _state } = useAuthenticator();
  const actorState = getActorState(_state) as SignInState;

  const { challengeName } = actorState.context as SignInContext;
  let headerText: string;

  switch (challengeName) {
    case AuthChallengeNames.SMS_MFA:
      headerText = translate('Confirm SMS Code');
      break;
    case AuthChallengeNames.SOFTWARE_TOKEN_MFA:
      headerText = translate('Confirm TOTP Code');
      break;
    default:
      throw new Error(
        `${translate(
          'Unexpected challengeName encountered in ConfirmSignIn:'
        )} ${challengeName}`
      );
  }

  return <Heading level={3}>{headerText}</Heading>;
}
ConfirmSignIn.Header = Header;

ConfirmSignIn.Footer = (): JSX.Element => null;
