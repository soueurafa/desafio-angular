import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Genero } from '../models/criar-genero.model';

@Injectable({
  providedIn: 'root'
})
export class SalvarGeneroService {
  private listaGeneros: any[];
  private url = 'http://localhost:3000/generos';

  constructor(private httpClient: HttpClient) { 
    this.listaGeneros = [];
  }

  get generos() {
    return this.listaGeneros;
  }

  lerGeneros(): Observable<Genero[]> {
    return this.httpClient.get<Genero[]>(this.url);
  }

  salvarGenero(genero: Genero): Observable<Genero> {
    return this.httpClient.post<Genero>(this.url, genero);
  }

  deletarGenero(idGenero:any):Observable<any>{
    return this.httpClient.delete<any>(`${this.url}/${idGenero}`);
 }

 editarGenero(genero: Genero):Observable<Genero>{
	return this.httpClient.put<Genero>(`${this.url}/${genero.id}`, genero)
}
}
