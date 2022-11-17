import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Filme } from '../models/criar-filme.model';
import { Genero } from '../models/criar-genero.model';
import { SalvarFilmesService } from '../services/salvar-filmes.service';
import { SalvarGeneroService } from '../services/salvar-genero.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.component.html',
  styleUrls: ['./filmes.component.scss']
})
export class FilmesComponent implements OnInit {
  filmes!: Filme[];
  genero!: Genero[];
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private salvarFilmesService: SalvarFilmesService,
    private salvarGeneroService: SalvarGeneroService
  ) { }

  listarGeneros(): void {
    this.salvarGeneroService.lerGeneros().subscribe({
      next: (genero: Genero[]) => {
        this.genero = genero
        console.log(this.genero);
      },
      error: () => {
        console.log("erro lerGeneros");
      }
    })
  }

  listarFilmes(): void {
    this.salvarFilmesService.lerFilme().subscribe({
      next: (filmes: Filme[]) => {
        this.filmes = filmes
        console.log(this.filmes);
      },
      error: () => {
        console.log("erro lerFilmes");
      }
    })
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: "", generoId: ""
    })
    this.form.valueChanges.subscribe(console.log);

    this.listarFilmes()
    this.listarGeneros()
  }

  salvarDadosFilme() {

    let id: number = (this.filmes[this.filmes.length - 1].id) + 1;

    let genero = parseInt (this.form.controls["generoId"].value)
    let nome = (this.form.controls["nome"].value)
    let valores: Filme = { id: id, nome: nome, generoId: genero}

    this.salvarFilmesService.salvarFilme(valores).subscribe({
      next: () => {
        this.listarFilmes();
        console.log("salvou");
        Swal.fire({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          icon: 'success',
          timer: 5000,
          title: 'Filme Salvo!'
      })
      },
      error: () => {
        console.log("erro em Salvar filmes");
      }
    })
  }

  excluir(idFilme:number)  {
    this.salvarFilmesService.deletarFilme(idFilme).subscribe({
      next: () => {
        console.log("excluiu");
        this.listarFilmes();
        Swal.fire({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          icon: 'success',
          timer: 5000,
          title: 'Filme excluido!'
        })
      },
      error: () => {
        console.log("erro em excluir");
        
      }
    })
  }

  trackUser(index:number,filme:Filme){
    return filme? filme.id : null;
  }

}
