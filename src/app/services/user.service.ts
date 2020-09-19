import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable()
export class UserService {

    public url: string;
    public token;
    public identity;

    constructor(
        public _http: HttpClient
    ) {
        this.url = GLOBAL.url;
    }

    register(user): Observable<any> {
        let json = JSON.stringify(user);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url + 'user/register', params, { headers: headers });
    }

    signup(user, getToken = null): Observable<any> {
        if (getToken != null) {
            user.getToken = 'true';
        }

        let json = JSON.stringify(user);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url + 'user/login', params, { headers: headers });
    }

    update(token, user): Observable<any> {
        // Limpiar campo de texto htmlEntities to utf8
        user.description = GLOBAL.htmlEntities(user.description);
        let json = JSON.stringify(user);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded').set('Authorization', token);
        return this._http.put(this.url + 'user/update', params, { headers: headers });
    }

    getUser(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');
        return this._http.get(this.url + 'user/profile/' + id, { headers: headers });
    }

    getUserPosts(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');
        return this._http.get(this.url + 'post/user/' + id, { headers: headers });
    }

    getToken() {
        let token = localStorage.getItem('token');

        if (token && token != "undefined") {
            this.token = token;
        } else {
            this.token = null;
        }

        return this.token;
    }

    getIdentity() {
        let identity = JSON.parse(localStorage.getItem('identity'));

        if (identity && identity != "undefined") {
            this.identity = identity;
        } else {
            this.identity = null;
        }

        return this.identity;
    }
}