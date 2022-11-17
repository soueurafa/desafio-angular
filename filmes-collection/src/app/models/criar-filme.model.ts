import { Genero } from "./criar-genero.model";

export interface Filme{
    id: number;
    nome: string;
    generoId: number; 
    genero?: Genero;
}