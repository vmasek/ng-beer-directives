import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetDirective } from './let.directive';
import { RangeDirective } from './range.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LetDirective,
    RangeDirective,
  ],
  exports: [
    LetDirective,
    RangeDirective,
  ],
})
export class DirectivesModule {}
