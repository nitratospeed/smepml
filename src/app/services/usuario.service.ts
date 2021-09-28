import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Base } from '../models/base';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  isLoggedIn = false;

  constructor(private readonly http : HttpClient) { }

  get(data) {
    let params = new HttpParams();
    return this.http.get<any>('https://smepml-api.azurewebsites.net/api/v1/usuario', {params:data});
  }

  getById(data) {
    return this.http.get<any>(`https://smepml-api.azurewebsites.net/api/v1/usuario/${data}`);
  }

  post(data) {
    return this.http.post<any>('https://smepml-api.azurewebsites.net/api/v1/usuario', data);
  }

  put(id, data) {
    return this.http.put<any>(`https://smepml-api.azurewebsites.net/api/v1/usuario/${id}`, data);
  }

  redirectUrl: string | null = null;

  auth(data) {
    let gg = this.http.post<any>('https://smepml-api.azurewebsites.net/api/v1/usuario/auth', data);
    
    gg.subscribe((result : Base<boolean>) =>{
      if (result.isSuccess) 
      {
        if (result.data) {
          this.isLoggedIn = result.data;
        }
      }
    });

    return gg;
  }

  logout(){
    this.isLoggedIn = false;
  }
}
