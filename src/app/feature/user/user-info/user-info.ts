import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { UserResponse } from '../../../../service/user.service';
import { Card } from '../../../shared/components/card/card';

@Component({
  selector: 'app-user-info',
  imports: [Card],
  templateUrl: './user-info.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInfo {
  public user: InputSignal<UserResponse> = input.required();
}
