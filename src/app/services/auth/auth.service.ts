import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { AuthResponseData } from "../../models/authResponseData.model";
import { User } from "../../models/user.model";
import { stringify } from "@angular/compiler/src/util";

@Injectable({
    providedIn: 'root',
})

export class AuthService {

    // This will inform all places in the application about when our user changes
    user = new BehaviorSubject<any>(null);

    private tokenExpirationTimer: any;

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
            }).pipe(catchError(this.handleError), tap(responseData => {
                this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
            })
            );
    }

    // https://firebase.google.com/docs/reference/rest/auth/#section-sign-in-email-password
    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDhs2_n0VW26SI2OVGxQxoUdWZ-AvdpwUw',
            {
                email: email, // The email the user is siging in with
                password: password, // The password for the account
                returnSecureToken: true // Whether or not to return an ID and refresh token. Should always be true
            })
            .pipe(catchError(this.handleError), tap(responseData => {
                this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
            })
            );
    }

    /**
     * The goal is to retrieve data from the localStorage
     */
    autoLogion() {
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData') || '{}');
        if (!userData){
            return
        }
        const loadedUser = new User(userData.email, 
                                    userData.id, 
                                    userData._token, 
                                    new Date(userData._tokenExpirationDate));

        if (loadedUser.token){
            this.user.next(loadedUser);
            const expirationDuration = new Date (userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
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

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

        const user = new User(email, userId, token, expirationDate);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));

        // Ahora podemos usar el Subject para setear o emitir el usuario logueado
        this.user.next(user);
    }

    logout() {
        this.user.next(null);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    /**
     * Usaremos este método para establecer un timer que elimine la información del usuario que
     * ha iniciado sesión del almacenamiento local en el localStorage
     */
    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

}