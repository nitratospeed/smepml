import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SintomaService {

  constructor(private readonly http : HttpClient) { }

  get() {
    return this.http.get<any>('https://smepml-api.azurewebsites.net/api/sintoma');
  }
}
