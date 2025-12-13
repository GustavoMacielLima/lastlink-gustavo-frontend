import { Injectable, PLATFORM_ID, inject } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { UserResponse } from "../service/user.service";

@Injectable({
    providedIn: 'root'
})
export class UsersUtility {
    private platformId = inject(PLATFORM_ID);

    private get localStorage(): Storage | null {
        return isPlatformBrowser(this.platformId) ? window.localStorage : null;
    }

    public getUser(): UserResponse | undefined {
        if (!this.localStorage) return undefined;
        
        const userData = this.localStorage.getItem('user');
        if (userData) {
            return JSON.parse(userData) ?? undefined;
        }
        return undefined;
    }
    
    public setUser(user: UserResponse): void {
        if (!this.localStorage) return;
        this.localStorage.setItem('user', JSON.stringify(user));
    }

    public cleanSession(): void {
        if (!this.localStorage) return;
        this.localStorage.clear();
    }
}