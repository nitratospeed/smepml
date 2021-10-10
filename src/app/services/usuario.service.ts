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
    return this.http.post<any>('https://smepml-api.azurewebsites.net/api/v1/usuario/auth', data);
  }

  isAuth(){
    let token = this.getAuth();
    if (token == '') {
      return false;
    }
    return true;
  }

  getAuth(){
    return localStorage.getItem('access_token') ?? '';
  }

  setAuth(token:string){
    localStorage.setItem('access_token', token);
  }

  getUser(){
    return localStorage.getItem('access_user') ?? '';
  }

  setUser(user:string){
    localStorage.setItem('access_user', user);
  }
}
