import { ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { UserResponse, UserService } from '../../../service/user.service';
import { Card } from '../../shared/components/card/card';
import { Button } from '../../shared/components/button/button';
import { UsersUtility } from '../../../utility/users.utility';
import { Router } from '@angular/router';
import { EmptyState } from '../../shared/components/empty-state/empty-state';
import { Loading } from '../../shared/components/loading/loading';
import { ToastService } from '../../shared/components/toast/toast.service';

@Component({
  selector: 'app-dashboard',
  imports: [Card, Button, EmptyState, Loading],
  templateUrl: './dashboard.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Dashboard implements OnInit {
  private userService: UserService = inject(UserService);
  private userutility: UsersUtility = inject(UsersUtility);
  private toast:ToastService = inject(ToastService);

  private router: Router = inject(Router);
  public users: WritableSignal<Array<UserResponse>> = signal<Array<UserResponse>>(new Array<UserResponse>());
  public loading: WritableSignal<boolean> =  signal<boolean>(false);

  public async ngOnInit(): Promise<void> {
    this.loading.set(true);
    try{
      this.userutility.cleanSession();
      this.users.set(await this.userService.list());
      this.loading.set(false);
    } catch (e) {
      this.toast.error('Não foi possível trazer a lista de Usuários!');
      this.loading.set(false);
    }
  }

  public showUserDetail(user: UserResponse) : void {
    this.userutility.setUser(user);
    this.router.navigate(['user']);
  }
}
