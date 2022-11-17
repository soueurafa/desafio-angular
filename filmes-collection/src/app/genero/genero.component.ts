import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Genero } from '../models/criar-genero.model';
import { SalvarGeneroService } from '../services/salvar-genero.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.scss']
})
export class GeneroComponent implements OnInit {
  genero!: Genero[];
  form!: FormGroup;
  id!: number;
  botaoEditar: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
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

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: ""
    })
    this.form.valueChanges.subscribe(console.log);

    this.listarGeneros()
  }

  salvarDadosGenero() {

    let id: number = (this.genero[this.genero.length - 1].id) + 1;

    let valores: Genero = { id: id, nome: this.form.value.nome}

    this.salvarGeneroService.salvarGenero(valores).subscribe({
      next: () => {
        this.listarGeneros();
        console.log("salvou");
        Swal.fire({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          icon: 'success',
          timer: 5000,
          title: 'Gênero Salvo!'
      })},
      error: () => {
        console.log("erro em Salvar usuarios");
      }
    }
  )}

  excluir(idGenero:number)  {
    this.salvarGeneroService.deletarGenero(idGenero).subscribe({
      next: () => {
        console.log("excluiu");
        this.listarGeneros();
        Swal.fire({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          icon: 'success',
          timer: 5000,
          title: 'Gênero excluido!'
        })
      },
      error: () => {
        console.log("erro em excluir");
        
      }
    })
  }

  trackUser(index:number,genero:Genero){
    return genero? genero.id : null;
  }

  editarGenero(){
    let id = this.id;
    let nome = this.form.controls["nome"].value;

    let genero:Genero ={id:id, nome:nome}

    this.salvarGeneroService.editarGenero(genero).subscribe({
      next: () => {
        this.listarGeneros()
        console.log("editou");
      },
      error: () => {
        console.log("erro em editar");
      }
    })
    this.botaoEditar = false
    this.form.reset()
  }

  alterarDadosGenero(dadosGenero: Genero){
    this.id = dadosGenero.id
    this.form.controls["nome"].setValue(dadosGenero.nome)
    this.botaoEditar = true
  }

}
