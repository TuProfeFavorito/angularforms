import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TiporequerimientoService {
  constructor(private http: HttpClient) {}

  getOpciones() {
    return this.http.get<any[]>('assets/requerimientos.json');
  }
}
