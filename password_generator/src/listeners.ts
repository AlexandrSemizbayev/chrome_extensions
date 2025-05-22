import type {TActionNames} from './passwordGenerator.ts';
import {generateStrongPassword} from './passwordGenerator.ts';

import { _$_ } from "./customQuery";
import { PopUp } from './popup.ts';

window.$on('load', () => {
  const formValidationPopUp = new PopUp('form-validation-pop-up',false);
  const formPopUpTemplate = formValidationPopUp.generate('error', 'At least one option must be selected');
  const copyPopUp = new PopUp('new-password-copied');
  const copyPopUpSuccess = copyPopUp.generate('success', '🫰 New password was copied!')

  function generatePassword() {
    const form = _$_('form.options') as HTMLFormElement;
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const requestedLength = data.requestedLength as string;
    delete data.requestedLength;
    const actionsChain = Object.keys(data) as TActionNames[];
    output.innerText = generateStrongPassword(parseInt(requestedLength,10), actionsChain);
  }
  
  const output = _$_('.generated-password') as HTMLElement;
  const length = _$_('#length') as HTMLElement;
  (_$_('#range') as HTMLInputElement)?.$on('input', function(e:Event) {
    const val = (e.target as HTMLInputElement).value;
    length.innerText = val;
  })
  const formElement = _$_('form') as HTMLFormElement;
  formElement?.$on('submit', (e:Event) => {
    e.preventDefault();
    generatePassword();
    
    navigator.clipboard.writeText(output.innerText).then(() => {
      if(copyPopUp.checkPresense()) {
        copyPopUp.unmount(true).then(() => {
          copyPopUp.mount(
            copyPopUpSuccess
          )
        })
      } else {
        copyPopUp.mount(
          copyPopUpSuccess
        )
      }
    }).catch((err) => {
      copyPopUp.mount(
        copyPopUp.generate('warning', err.message)
      );
    })
  });
  formElement?.$on('change', (_:Event) => {
    const form = _$_('form.options') as HTMLFormElement;
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    delete data.requestedLength;
    const actionsChain = Object.keys(data) as TActionNames[];
    const submitBtn = _$_('#submit-form') as HTMLButtonElement;
    const isActivePopUp = formValidationPopUp.checkPresense();
    const checkboxes = _$_('[type="checkbox"]') as NodeListOf<HTMLInputElement>;
    if(!actionsChain.length) {
        if(!isActivePopUp) {
          formValidationPopUp.mount(formPopUpTemplate);
          (checkboxes||[]).forEach((checkbox) => {
            checkbox.style.border = '1px solid red';
          })
        }
        submitBtn.disabled = true;
    } else {
      if(isActivePopUp) {
        formValidationPopUp.unmount(true);
      }
      submitBtn.disabled = false;
    }
  });
  generatePassword();
});
