import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PrediccionService {

  constructor(private readonly http : HttpClient) { }

  post(data) {
    return this.http.post<any>('https://smepml-api.azurewebsites.net/api/v1/prediccion', data);
  }
}
