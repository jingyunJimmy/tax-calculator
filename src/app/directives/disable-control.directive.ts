import {Directive, Input, OnChanges, SimpleChanges} from '@angular/core';
import {NgControl} from '@angular/forms';


@Directive({
    selector: '[disableControl]',
    standalone: true
})
export class DisableControlDirective implements OnChanges {

  @Input({required: false}) disableControl: boolean = false;

  constructor(private ngControl: NgControl) {
  }


  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['disableControl'];
    if (change) {
      if (this.ngControl.control) {
        if (change.currentValue) {
          setTimeout(()=>this.ngControl.control!.disable());
        } else {
          setTimeout(()=>this.ngControl.control!.enable());
        }
      }
    }
  }

}
