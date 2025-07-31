import {Directive, Inject, InjectionToken, Input, OnDestroy, OnInit, Self, ViewContainerRef} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {tap} from 'rxjs/operators';

export interface Mark {
  mark(): void;
}

export const MARK = new InjectionToken<Mark>('MarkDirective');


@Directive({
    selector: '[mark]',
    standalone: true
})
export class MarkDirective implements OnInit, OnDestroy {

  @Input({required: true}) mark?: Observable<boolean>;

  subscription?: Subscription;

  constructor(private viewContainerRef: ViewContainerRef,
              @Inject(MARK) @Self() private comp: Mark) {}

  ngOnInit(): void {
    if (this.mark && this.comp && this.comp.mark && (typeof this.comp.mark == 'function')) {
      this.subscription = this.mark.pipe(
        tap(r => {
          this.comp.mark();
        })
      ).subscribe();
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
