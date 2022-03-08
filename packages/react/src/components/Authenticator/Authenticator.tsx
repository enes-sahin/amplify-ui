import * as React from 'react';
import { AuthenticatorMachineOptions } from '@aws-amplify/ui';

import { Provider, useAuthenticator } from './hooks/useAuthenticator';
import { Router, RouterProps } from './Router';
import { SetupTOTP } from './SetupTOTP';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';
import { ForceNewPassword } from './ForceNewPassword';
import { ResetPassword } from './ResetPassword';
import {
  CustomComponentsContext,
  ComponentsProviderProps,
} from './hooks/useCustomComponents';
import { defaultComponents } from './hooks/useCustomComponents/defaultComponents';

export interface ComponentsProp {}

export type AuthenticatorProps = AuthenticatorMachineOptions &
  RouterProps &
  ComponentsProviderProps;

// Helper component that sends init event to the parent provider
function InitMachine({ children, ...machineProps }) {
  const { _send, route } = useAuthenticator();
  React.useEffect(() => {
    if (route === 'idle') {
      _send({
        type: 'INIT',
        data: machineProps,
      });
    }
    // Disabling exhaustive hooks rule here because we only want to run a single time
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <>{children}</>;
}

export function Authenticator({
  children,
  className,
  components: customComponents,
  initialState,
  loginMechanisms,
  services,
  signUpAttributes,
  socialProviders,
  variation,
  hideSignUp,
  formFields,
}: AuthenticatorProps) {
  const components = { ...defaultComponents, ...customComponents };
  const machineProps = {
    initialState,
    loginMechanisms,
    services,
    signUpAttributes,
    socialProviders,
    formFields,
  };

  return (
    <Provider>
      <CustomComponentsContext.Provider value={{ components }}>
        <InitMachine {...machineProps}>
          <Router
            className={className}
            children={children}
            variation={variation}
            hideSignUp={hideSignUp}
          />
        </InitMachine>
      </CustomComponentsContext.Provider>
    </Provider>
  );
}

Authenticator.Provider = Provider;
Authenticator.ResetPassword = ResetPassword;
Authenticator.SetupTOTP = SetupTOTP;
Authenticator.SignIn = SignIn;
Authenticator.SignUp = SignUp;
Authenticator.ForceNewPassword = ForceNewPassword;
