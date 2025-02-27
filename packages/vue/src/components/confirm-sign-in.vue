<script setup lang="ts">
import {
  AuthChallengeNames,
  getActorState,
  getFormDataFromEvent,
  SignInState,
  translate,
} from '@aws-amplify/ui';
import { computed, ComputedRef, useAttrs } from 'vue';
import { createSharedComposable } from '@vueuse/core';

import { useAuth, useAuthenticator } from '../composables/useAuth';

const emit = defineEmits(['confirmSignInSubmit', 'backToSignInClicked']);
const attrs = useAttrs();

const { state, send } = useAuth();

const {
  value: { context },
} = state;

const formOverrides = context?.config?.formFields?.confirmSignIn;
const confOR = formOverrides?.['confirmation_code'];

const useAuthShared = createSharedComposable(useAuthenticator);
const props = useAuthShared();

const actorState = computed(() =>
  getActorState(state.value)
) as ComputedRef<SignInState>;
const challengeName = actorState.value.context.challengeName;

let mfaType: string = 'SMS';

if (challengeName === AuthChallengeNames.SOFTWARE_TOKEN_MFA) {
  mfaType = 'TOTP';
}
const confirmSignInHeading = `Confirm ${mfaType} Code`;

// Computed Properties
const backSignInText = computed(() => translate('Back to Sign In'));
const confirmText = computed(() => translate('Confirm'));
const codeText = computed(() => translate('Code'));

const label = confOR?.label ?? translate('Code *');
const labelHidden = confOR?.labelHidden;

// Methods
const onInput = (e: Event): void => {
  const { name, value } = <HTMLInputElement>e.target;
  send({
    type: 'CHANGE',
    //@ts-ignore
    data: { name, value },
  });
};

const onConfirmSignInSubmit = (e: Event): void => {
  if (attrs?.onConfirmSignInSubmit) {
    emit('confirmSignInSubmit', e);
  } else {
    submit(e);
  }
};

const submit = (e: Event): void => {
  props.submitForm(getFormDataFromEvent(e));
};

const onBackToSignInClicked = (): void => {
  if (attrs?.onBackToSignInClicked) {
    emit('backToSignInClicked');
  } else {
    send({
      type: 'SIGN_IN',
    });
  }
};
</script>

<template>
  <slot v-bind="$attrs" name="confirmSignInSlotI">
    <base-wrapper v-bind="$attrs">
      <base-form
        data-amplify-authenticator-confirmsignin
        @input="onInput"
        @submit.prevent="onConfirmSignInSubmit"
      >
        <base-field-set
          class="amplify-flex"
          style="flex-direction: column"
          :disabled="actorState.matches('confirmSignIn.pending')"
        >
          <slot name="header">
            <base-heading :level="3" class="amplify-heading">
              {{ confirmSignInHeading }}
            </base-heading>
          </slot>
          <base-wrapper class="amplify-flex" style="flex-direction: column">
            <base-wrapper
              class="amplify-flex amplify-field amplify-textfield"
              style="flex-direction: column"
            >
              <base-label
                class="amplify-label"
                :class="{ 'amplify-visually-hidden': labelHidden ?? true }"
                for="amplify-field-51ee"
              >
                {{ label }}
              </base-label>
              <base-wrapper class="amplify-flex" style="flex-direction: column">
                <base-input
                  :placeholder="confOR?.placeholder ?? codeText"
                  :required="confOR?.required ?? true"
                  class="amplify-input amplify-field-group__control"
                  id="amplify-field-51ee"
                  aria-invalid="false"
                  name="confirmation_code"
                  autocomplete="one-time-code"
                  type="number"
                ></base-input>
              </base-wrapper>
            </base-wrapper>
          </base-wrapper>
          <base-footer class="amplify-flex" style="flex-direction: column">
            <base-alert v-if="actorState?.context?.remoteError">
              {{ translate(actorState?.context?.remoteError) }}
            </base-alert>
            <amplify-button
              class="amplify-field-group__control"
              data-fullwidth="false"
              data-loading="false"
              data-variation="primary"
              style="font-weight: normal"
              :disabled="actorState.matches('confirmSignIn.pending')"
              >{{ confirmText }}</amplify-button
            >
            <amplify-button
              class="amplify-field-group__control"
              data-fullwidth="false"
              data-size="small"
              data-variation="link"
              style="font-weight: normal"
              type="button"
              @click.prevent="onBackToSignInClicked"
            >
              {{ backSignInText }}</amplify-button
            >
            <slot
              name="footer"
              :onBackToSignInClicked="onBackToSignInClicked"
              :onConfirmSignInSubmit="onConfirmSignInSubmit"
            >
            </slot>
          </base-footer>
        </base-field-set>
      </base-form>
    </base-wrapper>
  </slot>
</template>
