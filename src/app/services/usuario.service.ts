import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Base } from '../models/base';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

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

  auth(data) {
    let gg = this.http.post<any>('https://smepml-api.azurewebsites.net/api/v1/usuario/auth', data);
    
    gg.subscribe((result : Base<any>) =>{
      if (result.isSuccess) 
      {
        if (result.data.valid) {
          sessionStorage.setItem('access_token', result.data.token);
        }
      }
    });

    return gg;
  }

  isAuth(){
    let token = sessionStorage.getItem('access_token') ?? '';
    if (token == '') {
      return false;
    }
    return true;
  }

  logout(){
    sessionStorage.setItem('access_token', '');
  }
}
