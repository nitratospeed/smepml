import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnfermedadService {

  constructor(private readonly http : HttpClient) { }

  getByName(data) {
    return this.http.get<any>(`https://smepml-api.azurewebsites.net/api/v1/enfermedad/${data}`);
  }
}
