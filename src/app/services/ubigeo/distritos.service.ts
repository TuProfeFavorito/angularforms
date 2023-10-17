import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DistritosService {
  constructor(private http: HttpClient) {}

  getOpciones() {
    return this.http.get<any[]>('assets/ubigeo_peru_2016_distritos.json');
  }
}
