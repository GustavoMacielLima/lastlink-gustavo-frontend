import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../app/shared/components/toast/toast.service';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    const toast: ToastService = inject(ToastService);

    return next(req).pipe(
        catchError((error) => {
            toast.error(`${error.message || 'Desculpe identificamos uma instabilidade na nossa aplicação.'}`);
            return throwError(() => error);
        })
    );
};