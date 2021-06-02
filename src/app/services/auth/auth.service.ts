import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { AuthResponseData } from "../../models/authResponseData.model";

@Injectable({
    providedIn: 'root',
})

export class AuthService {

    constructor(private http: HttpClient) {
    }

    // https://firebase.google.com/docs/reference/rest/auth/#section-create-email-password
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

    // https://firebase.google.com/docs/reference/rest/auth/#section-sign-in-email-password
    login (email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDhs2_n0VW26SI2OVGxQxoUdWZ-AvdpwUw',
        {
            email: email, // The email the user is siging in with
            password: password, // The password for the account
            returnSecureToken: true // Whether or not to return an ID and refresh token. Should always be true
        });
    }

}