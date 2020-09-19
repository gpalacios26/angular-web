import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable()
export class CategoryService {

    public url: string;

    constructor(
        public _http: HttpClient
    ) {
        this.url = GLOBAL.url;
    }

    create(token, category): Observable<any> {
        let json = JSON.stringify(category);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded').set('Authorization', token);
        return this._http.post(this.url + 'category', params, { headers: headers });
    }

    getCategories(): Observable<any> {
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');
        return this._http.get(this.url + 'category', { headers: headers });
    }

    getCategory(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');
        return this._http.get(this.url + 'category/' + id, { headers: headers });
    }

    getCategoryPosts(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');
        return this._http.get(this.url + 'post/category/' + id, { headers: headers });
    }

}