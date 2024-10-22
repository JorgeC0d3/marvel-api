import { Component } from '@angular/core';
import { SearchFormComponent } from '../search-form/search-form.component';
import { CharactersListComponent } from '../characters-list/characters-list.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SearchFormComponent, CharactersListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  charactersData: any;

  getDataCharacters(characters: any){
    this.charactersData = characters.data.results;
    console.log(this.charactersData);
  }

}
