import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Card } from '../card/card';

@Component({
  selector: 'app-empty-state',
  imports: [Card],
  templateUrl: './empty-state.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyState {

}
