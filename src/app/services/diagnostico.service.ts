import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticoService {

  constructor(private readonly http : HttpClient) { }

  get(data) {
    let params = new HttpParams();
    return this.http.get<any>('https://smepml-api.azurewebsites.net/api/v1/diagnostico', {params:data});
  }

  getById(data) {
    return this.http.get<any>(`https://smepml-api.azurewebsites.net/api/v1/diagnostico/${data}`);
  }

  post(data) {
    return this.http.post<any>('https://smepml-api.azurewebsites.net/api/v1/diagnostico', data);
  }

  rating(data) {
    return this.http.post<any>('https://smepml-api.azurewebsites.net/api/v1/diagnostico/rating', data);
  }

  email(id) {
    return this.http.post<any>(`https://smepml-api.azurewebsites.net/api/v1/diagnostico/email/${id}`, null);
  }

  predict(data) {
    return this.http.post<any>('https://smepml-api.azurewebsites.net/api/v1/diagnostico/predict', data);
  }
}
