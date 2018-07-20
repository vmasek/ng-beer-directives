import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

interface LetContext<T> {
  appLet: T;
}

/**
 * source https://medium.com/@AustinMatherne/angular-let-directive-a168d4248138
 */
@Directive({
  selector: '[appLet]'
})
export class LetDirective<T> {
  private context: LetContext<T> = {appLet: null};

  constructor(viewRef: ViewContainerRef, templateRef: TemplateRef<LetContext<T>>) {
    viewRef.createEmbeddedView(templateRef, this.context);
  }

  @Input()
  set appLet(value: T) {
    this.context.appLet = value;
  }
}
