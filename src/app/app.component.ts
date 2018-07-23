import { Component } from '@angular/core';
import { defer, Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly maxElements = 3;
  readonly data$: Observable<boolean> = of(false);
  readonly random1or0$: Observable<number> = defer(() => of((Math.random() > 0.5) ? 1 : 0));
}
