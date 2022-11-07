import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  icones:string =
  `
  <span class="title-group">
    <a>
        <i class="material-icons">
          home
        </i>
      Home
    </a>
  </span>
  `
  
  constructor(private router:Router) { }

  ngOnInit(): void {

    if(this.router.url === '/usuario'){
      this.icones = `
      <span class="title-group">
        <a>
            <i class="material-icons">
            person
            </i>
            Usuários
        </a>
      </span>
      `;
    }

    else if(this.router.url === '/filmes'){
      this.icones = `
      <span class="title-group">
        <a>
            <i class="material-icons">
            movie
            </i>
            Filmes
        </a>
      </span>
      `;
    }

    else if(this.router.url === '/genero'){
      this.icones = `
      <span class="title-group">
        <a>
            <i class="material-icons">
            star
            </i>
            Gênero
        </a>
      </span>
      `;
    }
 
  }

}

