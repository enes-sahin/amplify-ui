import React, { Component } from 'react';

import { JS, ConsoleLogger as Logger } from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';

import AmplifyTheme from '../Amplify-UI/Amplify-UI-Theme';
import {
    FormSection,
    SectionBody,
    Strike,
} from '../Amplify-UI/Amplify-UI-Components-React';

import {
    GoogleButton,
    FacebookButton,
    AmazonButton,
    OAuthButton,
    Auth0Button
} from './Provider';

const logger = new Logger('FederatedSignIn');

export class FederatedButtons extends Component {
    google(google_client_id) {
        if (!google_client_id) { return null; }

        const { theme, onStateChange, onAuthEvent } = this.props;
        return <GoogleButton
                google_client_id={google_client_id}
                theme={theme}
                onStateChange={onStateChange}
                onAuthEvent={onAuthEvent}
              />
    }

    facebook(facebook_app_id) {
        if (!facebook_app_id) { return null; }

        const { theme, onStateChange } = this.props;
        return <FacebookButton
                facebook_app_id={facebook_app_id}
                theme={theme}
                onStateChange={onStateChange}
                onAuthEvent={onAuthEvent}
                />
    }

    amazon(amazon_client_id) {
        if (!amazon_client_id) { return null; }

        const { theme, onStateChange } = this.props;
        return <AmazonButton
                amazon_client_id={amazon_client_id}
                theme={theme}
                onStateChange={onStateChange}
                onAuthEvent={onAuthEvent}
              />
    }

    OAuth(oauth_config) {
        if (!oauth_config) { return null;}
        const { theme, onStateChange } = this.props;
        return <OAuthButton
                label={oauth_config? oauth_config.label : undefined}
                theme={theme}
                onStateChange={onStateChange}
                onAuthEvent={onAuthEvent}
              />
    }

    auth0(auth0_config) {
        if (!auth0_config) { return null;}
        const { theme, onStateChange } = this.props;
        return <Auth0Button
                label={auth0_config? auth0_config.label : undefined}
                theme={theme}
                onStateChange={onStateChange}
                onAuthEvent={onAuthEvent}
              />
    }

    render() {
        const { authState } = this.props;
        if (!['signIn', 'signedOut', 'signedUp'].includes(authState)) { return null; }

        const federated = this.props.federated || {};
        if (!Auth || typeof Auth.configure !== 'function') {
            throw new Error('No Auth module found, please ensure @aws-amplify/auth is imported');
        }

        const config = Auth.configure();
        if (config.oauth) {
            federated.oauth_config = Object.assign({}, federated.oauth_config, config.oauth);
        }
        if (config.auth0) {
            federated.auth0_config = Object.assign({}, federated.auth0_config, config.auth0);
        }

        if (JS.isEmpty(federated)) { return null; }

        const { google_client_id, facebook_app_id, amazon_client_id, oauth_config, auth0_config } = federated;

        const theme = this.props.theme || AmplifyTheme;
        return (
            <div>
                <div>
                {this.google(google_client_id)}
                </div>
                <div>
                {this.facebook(facebook_app_id)}
                </div>
                <div>
                {this.amazon(amazon_client_id)}
                </div>
                <div>
                {this.OAuth(oauth_config)}
                </div>
                <div>
                {this.auth0(auth0_config)}
                </div>
                <Strike>or</Strike>
            </div>
        )
    }
}

export default class FederatedSignIn extends Component {
    render() {
        const { authState, onStateChange, onAuthEvent } = this.props;
        let federated = this.props.federated || {};
        if (!Auth || typeof Auth.configure !== 'function') {
            throw new Error('No Auth module found, please ensure @aws-amplify/auth is imported');
        }
        
        const config = Auth.configure();
        if (config.oauth) {
            federated.oauth_config = Object.assign({}, federated.oauth_config, config.oauth);
        }
        if (config.auth0) {
            federated.auth0_config = Object.assign({}, federated.auth0_config, config.auth0);
        }

        if (!federated) {
            logger.debug('federated prop is empty. show nothing');
            logger.debug('federated={google_client_id: , facebook_app_id: , amazon_client_id}');
            return null;
        }
        if (!['signIn', 'signedOut', 'signedUp'].includes(authState)) { return null; }
        logger.debug('federated Config is', federated);
        const theme = this.props.theme || AmplifyTheme;
        return (
            <FormSection theme={theme}>
                <SectionBody theme={theme}>
                    <FederatedButtons
                        federated={federated}
                        theme={theme}
                        authState={authState}
                        onStateChange={onStateChange}
                        onAuthEvent={onAuthEvent}
                    />
                </SectionBody>
            </FormSection>
        )
    }
}
