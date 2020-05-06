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

  update(data): Observable<any> {
    return this.http.post<any>(environment.url+ "auth/updateUser",data).pipe();
  }

  getPacks() : Observable<any> {
    return this.http.get<any>(environment.url+ "packs").pipe();
  }

  buyPackage(data) : Observable<any> {
    return this.http.post<any>(environment.url+ "packs/buy",data).pipe();
  }

  //Catalogo
  createCatalogue(data) : Observable<any> {
    return this.http.post<any>(environment.url+ "catalogue/create",data).pipe();
  }
   //Ofertas
   createOffer(data) : Observable<any> {
    return this.http.post<any>(environment.url+ "offer/create",data).pipe();
  }
}
