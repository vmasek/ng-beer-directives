import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

/**
 * This interface represents context of the directive
 */
interface RangeContext {
  $implicit: number; // current item exposed as implicit value, enables declaring in template variable via let keyword
  index: number;     // current index of the item
  first: boolean;    // indicates if the item is first in the collection
  last: boolean;     // indicates if the item is last in the collection
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
        index,
        first: index === 0,
        last: index + 1 === range.length,
      })
    );
  }

  constructor(private readonly viewRef: ViewContainerRef,
              private readonly templateRef: TemplateRef<RangeContext>) {
  }

  /**
   * Generates and array of N items (N is difference between to and from).
   * Item values are starting at `from` value and ending with `to` value.
   *
   * @param from - default is 0
   * @param to   - items will be generated up to this value
   *             - example: 7 will result in output [..., 4, 5, 6]
   */
  private generateRange(from: number = 0, to: number): number[] {
    return Array.from({length: (to - from)}, (_, index) => index + from);
  }
}
