import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filme } from '../models/criar-filme.model';

@Injectable({
  providedIn: 'root'
})
export class SalvarFilmesService {
  private listaFilmes: any[];
  private url = 'http://localhost:3000/filmes';

  constructor(private httpClient: HttpClient) {
    this.listaFilmes = [];
   }

   get filmes() {
    return this.listaFilmes;
  }

  lerFilme(): Observable<Filme[]> {
    return this.httpClient.get<Filme[]>(`${this.url}?_expand=genero`);
  }

  salvarFilme(filme: Filme): Observable<Filme> {
    return this.httpClient.post<Filme>(this.url, filme);
  }

  deletarFilme(idFilme:any):Observable<any>{
    return this.httpClient.delete<any>(`${this.url}/${idFilme}`);
 }
}
