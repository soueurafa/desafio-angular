import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Usuario } from '../models/criar-usuario.model';
import { SalvarUsuarioService } from '../services/salvar-usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  usuarios!: Usuario[];
  form!: FormGroup;
  id!: number;
  botaoEditar: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private salvarUsuarioService: SalvarUsuarioService
  ) { }

  listarUsuarios(): void {
    this.salvarUsuarioService.lerUsuarios().subscribe({
      next: (usuarios: Usuario[]) => {
        this.usuarios = usuarios
        console.log(this.usuarios);
      },
      error: () => {
        console.log("erro lerUsuarios");
      }
    })
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: "", email: "", numero: ""
    })
    this.form.valueChanges.subscribe(console.log);

    this.listarUsuarios()
  }


  salvarDadosUsuario() {

    let id: number = (this.usuarios[this.usuarios.length - 1].id) + 1;

    let valores: Usuario = { id: id, nome: this.form.value.nome, email: this.form.value.email, numero: this.form.value.numero }

    this.salvarUsuarioService.salvarUsuario(valores).subscribe({
      next: () => {
        this.listarUsuarios();
        console.log("salvou");
        Swal.fire({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          icon: 'success',
          timer: 5000,
          title: 'Usuario Cadastrado!'
        })
      },
      error: () => {
        console.log("erro em Salvar usuarios");
      }
    })
  }

  excluir(idUsuario:number)  {
    this.salvarUsuarioService.deletarUsuario(idUsuario).subscribe({
      next: () => {
        console.log("excluiu");
        this.listarUsuarios();
        Swal.fire({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          icon: 'success',
          timer: 5000,
          title: 'Usuario excluido!'
        })
      },
      error: () => {
        console.log("erro em excluir");
        
      }
    })
  }

  trackUser(index:number,usuario:Usuario){
    return usuario? usuario.id : null;
  }

  editarUsuario(){
    let id = this.id;
    let nome = this.form.controls["nome"].value;
    let email = this.form.controls["email"].value;
    let numero = this.form.controls["numero"].value;

    let usuario:Usuario ={id:id, nome:nome, email:email, numero:numero}

    this.salvarUsuarioService.editarUsuario(usuario).subscribe({
      next: () => {
        this.listarUsuarios()
        console.log("editou");
      },
      error: () => {
        console.log("erro em editar");
      }
    })
    this.botaoEditar = false
    this.form.reset()
  }

  alterarDadosUsuario(dadosUsuario: Usuario){
    this.id = dadosUsuario.id
    this.form.controls["nome"].setValue(dadosUsuario.nome)
    this.form.controls["email"].setValue(dadosUsuario.email)
    this.form.controls["numero"].setValue(dadosUsuario.numero)
    this.botaoEditar = true
  }
}
