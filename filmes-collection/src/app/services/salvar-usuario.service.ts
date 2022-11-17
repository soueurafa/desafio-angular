import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/criar-usuario.model';

@Injectable({
  providedIn: 'root'
})
export class SalvarUsuarioService {
  private listaClientes: any[];
  private url = 'http://localhost:3000/clientes';

  constructor(private httpClient: HttpClient) {
    this.listaClientes = [];
  }

  get clientes() {
    return this.listaClientes;
  }

  lerUsuarios(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.url);
  }

  salvarUsuario(cliente: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(this.url, cliente);
  }

  deletarUsuario(idUsuario:any):Observable<any>{
    return this.httpClient.delete<any>(`${this.url}/${idUsuario}`);
 }

 editarUsuario(cliente: Usuario):Observable<Usuario>{
	return this.httpClient.put<Usuario>(`${this.url}/${cliente.id}`, cliente)
}
}
