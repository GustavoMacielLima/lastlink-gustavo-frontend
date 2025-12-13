import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { AddressResponse } from '../../../../service/user.service';
import { Card } from '../../../shared/components/card/card';

@Component({
  selector: 'app-user-address',
  imports: [Card],
  templateUrl: './user-address.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAddress {
  public address: InputSignal<AddressResponse> = input.required();
}
