export interface AuthResponseData {
    kind: string; // The request type 
    idToken: string; // A Firebase Auth ID token for the newly created user
    email: string; // The email for the newly user
    refreshToken: string; // A Firebase Auth refresh token for the newly created user
    expiresIn: string; // The number in seconds in which the ID token expires
    localId: string; // The uid of the newly created user
    registered? : boolean; // Whether the email is for an existing account. Only for login() method
}