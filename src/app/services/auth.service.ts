import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

interface AuthResponseData {
    kind: string; // The request type 
    idToken: string; // A Firebase Auth ID token for the newly created user
    email: string; // The email for the newly user
    refreshToken: string; // A Firebase Auth refresh token for the newly created user
    expiresIn: string; // The number in seconds in which the ID token expires
    localId: string; // The uid of the newly created user
}

@Injectable({
    providedIn: 'root',
})

export class AuthService {

    constructor(private http: HttpClient) {

    }

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDhs2_n0VW26SI2OVGxQxoUdWZ-AvdpwUw',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe(catchError(errorResponse => {
                let errorMessage = "An unknown error occurred!"

                if ( !errorResponse.error || !errorResponse.error.error ){
                    return throwError(errorMessage);
                }

                switch(errorResponse.error.error.message){
                    case 'EMAIL_EXISTS':
                        errorMessage = "Error - El email ya está registrado";
                        break;
                      default:
                        errorMessage = "An error ocurred!";
                        break;
                  }
                  return throwError(errorMessage);
            }));
    }
}