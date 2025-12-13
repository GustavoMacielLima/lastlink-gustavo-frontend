import { Injectable } from "@angular/core";
import { HttpRoute, ErrorResponse } from "./httpRoute.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class UserService extends HttpRoute{

    public list(): Promise<Array<UserResponse>>{
        return new Promise<Array<UserResponse>>(
            (resolve: (value: Array<UserResponse>) => void,
             reject: (reason?: unknown) => void) => {
                this.get<Array<UserResponse>>('/users').subscribe(
                    (response: Array<UserResponse> | ErrorResponse) => {
                        if ('code' in response) {
                            reject(response);
                        } else {
                            resolve(response);
                        }
                    },
                    (error: unknown) => reject(error)
                );
        });          
    }
}

export interface UserResponse {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    address: AddressResponse;
    company: CompanyResponse
}

export interface AddressResponse {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: GeoLocationResponse;
}

export interface GeoLocationResponse {
    lat: string;
    lng: string;
}

export interface CompanyResponse {
    name: string;
    catchPhrase: string;
    bs: string;
}