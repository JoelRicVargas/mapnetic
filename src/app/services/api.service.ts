import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  register(data): Observable<any> {
    return this.http.post<any>(environment.url+ "auth/register",data).pipe();
  }

  getPacks() : Observable<any> {
    return this.http.get<any>(environment.url+ "packs").pipe();
  }

}
