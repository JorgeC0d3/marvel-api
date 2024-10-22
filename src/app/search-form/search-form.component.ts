import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Importar FormsModule para usar two-way binding
//npm install crypto-js
//instalar también las definiciones de tipos para TypeScript de crypto-js: npm install --save-dev @types/crypto-js
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.css'
})
export class SearchFormComponent {
  //Emitimos el objeto al componente padre o null en caso de error
  @Output() addCharactersEvent = new EventEmitter<object | null>();

  character = "";
  url = "https://gateway.marvel.com/v1/public/characters?ts=1&limit=100&apikey=8cddcc8a457eec9383235869801805e5";
  hash = "&hash=";
  name = "&nameStartsWith=";
  charactersData: any;
  loading = false;

  hashGenerate() {
    const timestamp = "1";
    const publicKey = "8cddcc8a457eec9383235869801805e5";
    const privateKey = "8dbd09e70ca3f1c62092e7599a7c0efe2900169a";
    // Usar MD5 para generar el hash
    const hash = CryptoJS.MD5(`${timestamp}${privateKey}${publicKey}`).toString();
    return hash;
  }

  searchCharacter() {
    const api = `${this.url}${this.hash}${this.hashGenerate()}${this.name}${this.character}`;
    this.loading = true;
    fetch(api)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la búsqueda');
        }
        return response.json();
      })
      .then(data => {
        this.charactersData = data;
        //console.log(this.charactersData);
        this.character = "";
        this.loading = false;  // Desactivamos el spinner cuando la búsqueda termina
        this.addCharactersEvent.emit(this.charactersData);
      })
      .catch(error => {
        console.error('Error:', error);
        this.loading = false;
        this.addCharactersEvent.emit(null);  // Emitimos null en caso de error
      });
  }

}
