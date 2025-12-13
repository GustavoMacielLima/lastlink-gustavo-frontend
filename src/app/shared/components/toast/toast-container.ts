// toast-container.component.ts
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Toast } from './toast';
import { ToastService } from './toast.service';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-toast-container',
    imports: [Toast, AsyncPipe],
    templateUrl:'./toast-container.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastContainer {
    private toastService = inject(ToastService);
    
    get toasts$() {
        return this.toastService.toasts$;
    }
}