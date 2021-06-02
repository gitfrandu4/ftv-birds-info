import { HttpClient, HttpErrorResponse } from "@angular/common/http";
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
            }).pipe(catchError(this.handleError));
            //     let errorMessage = "An unknown error occurred!"

            //     if ( !errorResponse.error || !errorResponse.error.error ){
            //         return throwError(errorMessage);
            //     }

            //     switch(errorResponse.error.error.message){
            //         case 'EMAIL_EXISTS':
            //             errorMessage = "Error - El email ya está registrado";
            //             break;
            //           default:
            //             errorMessage = "An error ocurred!";
            //             break;
            //       }
            //       return throwError(errorMessage);
            // })
            // );
    }

    // https://firebase.google.com/docs/reference/rest/auth/#section-sign-in-email-password
    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDhs2_n0VW26SI2OVGxQxoUdWZ-AvdpwUw',
            {
                email: email, // The email the user is siging in with
                password: password, // The password for the account
                returnSecureToken: true // Whether or not to return an ID and refresh token. Should always be true
            })
            .pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        let errorMessage = "An unknown error occurred!"

        if (!errorResponse.error || !errorResponse.error.error) {
            return throwError(errorMessage);
        }

        switch (errorResponse.error.error.message) {
            // Common error codes - logup
            case 'EMAIL_EXISTS':
                errorMessage = "Error - The email address is already in use by another account.";
                break;
            case 'OPERATION_NOT_ALLOWED':
                errorMessage = "Error - Password sign-in is disabled for this project.";
                break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                errorMessage = "Error - We have blocked all requests from this device due to unusual activity. Try again later.";
                break;
            // Common error codes - login
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'Error - There is no user record corresponding to this identifier. The user may have been deleted.';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'Error - The password is invalid or the user does not have a password.';
                break;
            case 'USER_DISABLED':
                errorMessage = 'Error - The user account has been disabled by an administrator.';
                break;
            default:
                errorMessage = "An unknown error ocurred!";
                break;
        }
        return throwError(errorMessage);
}

}