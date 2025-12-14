import { ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { UserResponse } from '../../../service/user.service';
import { UsersUtility } from '../../../utility/users.utility';
import { UserInfo } from './user-info/user-info';
import { UserAddress } from './user-address/user-address';
import { UserCompany } from './user-company/user-company';
import { ToastService } from '../../shared/components/toast/toast.service';
import { Router } from '@angular/router';
import { Button } from '../../shared/components/button/button';

@Component({
  selector: 'app-user',
  imports: [UserInfo, UserAddress, UserCompany, Button],
  templateUrl: './user.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class User implements OnInit {
  private userutility: UsersUtility = inject(UsersUtility);
  private toast: ToastService = inject(ToastService);
  private router: Router = inject(Router);
  public user: WritableSignal<UserResponse|null> = signal<UserResponse|null>(null);
  
  public ngOnInit(): void {
    const localStorage: UserResponse | undefined = this.userutility.getUser();
    if(!localStorage) {
      this.toast.error('Nenhum usuário foi selecionado!');
      this.router.navigate(['dashboard']);
    }
    this.user.set(localStorage as UserResponse);
  }

  public backToDashboard(): void {
    this.router.navigate(['dashboard']);
  }
}
