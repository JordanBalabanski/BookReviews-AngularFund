import { AbstractControl } from '@angular/forms';

export function ValidateUrl(control: AbstractControl) {
  if (control.value.startsWith('http') && (control.value.endsWith('.jpg') || control.value.endsWith('.png'))) {
    return null;
  }
  return { validUrl: true };
}
