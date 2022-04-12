import { Directive, HostListener } from "@angular/core";
import { NgControl } from "@angular/forms";
import Utils from "./utils";

@Directive({
  selector: '[phoneMask]'
})

export class PhoneMaskDirective {

  constructor(public ngControl: NgControl) { }

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event: any) {
    this.onInputChange(event, false);
  }

  @HostListener('keydown.backspace', ['$event'])
  keydownBackspace(event: { target: { value: any; }; }) {
    this.onInputChange(event.target.value, true);
  }

  onInputChange(event: string | number, backspace: boolean) {
    if (typeof event === 'number') {
      event = event.toString();
    }
    let newVal = event.replace(/\D/g, '');
    if (backspace && newVal.length <= 6) {
      newVal = newVal.substring(0, newVal.length);
    }
    if (newVal.length === 0) {
      newVal = '';
    } else {
      newVal = Utils.formatPhone(newVal);
    }
    this.ngControl.valueAccessor?.writeValue(newVal);
  }
}
