import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {

  constructor(private readonly http : HttpClient) { }

  get(data) {
    let params = new HttpParams();
    return this.http.get<any>('https://smepml-api.azurewebsites.net/api/v1/pregunta', {params:data});
  }
}
