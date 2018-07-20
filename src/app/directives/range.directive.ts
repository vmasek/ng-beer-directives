import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';


/**
 * https://netbasal.com/the-power-of-structural-directives-in-angular-bfe4d8c44fb1
 */
@Directive({
  selector: '[appRange]'
})
export class RangeDirective {
  @Input()
  set appRange(value: [number, number] | number) {
    this.viewRef.clear();

    const [from, to] = Array.isArray(value) ? value : [0, value];
    const range = this.generateRange(from, to);

    range.forEach(
      itemNumber => this.viewRef.createEmbeddedView(this.templateRef, {
        $implicit: itemNumber
      })
    );
  }

  constructor(private viewRef: ViewContainerRef,
              private templateRef: TemplateRef<any>) {
  }

  private generateRange(from: number, to: number): number[] {
    return Array.from({length: (to - from)}, (_, index) => index + from);
  }
}
