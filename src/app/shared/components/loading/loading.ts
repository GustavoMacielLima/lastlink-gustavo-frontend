import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-loading',
  imports: [],
  templateUrl: './loading.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Loading {
  public size: InputSignal<number> = input<number>(3);
}
