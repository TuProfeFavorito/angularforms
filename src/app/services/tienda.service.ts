import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {
  constructor(private http: HttpClient) {}

  getOpciones() {
    return this.http.get<any[]>('assets/tienda.json');
  }
}
