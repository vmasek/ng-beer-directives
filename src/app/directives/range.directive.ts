import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

interface RangeContext {
  $implicit: number;
  index: number;
}

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
      (itemNumber, index) => this.viewRef.createEmbeddedView(this.templateRef, {
        $implicit: itemNumber,
        index
      })
    );
  }

  constructor(private viewRef: ViewContainerRef,
              private templateRef: TemplateRef<RangeContext>) {
  }

  private generateRange(from: number, to: number): number[] {
    return Array.from({length: (to - from)}, (_, index) => index + from);
  }
}
