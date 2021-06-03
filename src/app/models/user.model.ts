export class User {
    /**
     * 
     * @param email The email for the authenticated user.
     * @param id The uid of the authenticated user.
     * @param _token A Firebase Auth ID token for the authenticated user.
     * @param _tokenExpirationDate When the ID token expires.
     * 
     * _tokenPrivate y _tokenExpirationDate privates because the token should not be retriveable.
     * When the user (or the developer) want to get access to the token, we should
     * actually be required to do in a way that will automatically check the validity.
     */
    constructor(public email: string, 
                public id: string,
                private _token: string,
                private _tokenExpirationDate: Date){

    }

    get token() {
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }
}