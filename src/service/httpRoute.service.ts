import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, map, Observable, of, take } from "rxjs";
import { environment } from '../environments/environment';

export class HttpRoute {
    private headers = new HttpHeaders()
    private route: string = environment.apiUrl;
    private http: HttpClient = inject(HttpClient);

    constructor(){}

    public get<Type>(route: string): Observable<Type | ErrorResponse> {
        return this.http.get(this.route + route, { headers: this.headers }).pipe(
            map((response: unknown) => response as Type),
            catchError((error: unknown) => {
                const err = error as { status?: number; message?: string };

                return of({
                    code: err?.status ?? 403,
                    message: err?.message ?? 'Não foi possível identificar o erro'
                } as ErrorResponse);
            }),
            take(1)
        );
    }

}

export interface ErrorResponse{
    code: number;
    message: string;
}