import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { CompanyResponse } from '../../../../service/user.service';
import { Card } from '../../../shared/components/card/card';

@Component({
  selector: 'app-user-company',
  imports: [Card],
  templateUrl: './user-company.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCompany {
  public company: InputSignal<CompanyResponse> = input.required();
}
