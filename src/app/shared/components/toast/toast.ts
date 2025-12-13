// toast.component.ts
import { ChangeDetectionStrategy, Component, inject, input, InputSignal } from '@angular/core';
import { ToastType } from './toast.model';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Toast {
  id: InputSignal<string> = input.required<string>();
  type: InputSignal<ToastType> = input<ToastType>('success');
  message: InputSignal<string> = input<string>('');

  private toastService: ToastService = inject(ToastService);

  dismiss() {
    this.toastService.remove(this.id());
  }
}
