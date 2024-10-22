import { Component, Input } from '@angular/core';
import { CharacterCardComponent } from '../character-card/character-card.component';

@Component({
  selector: 'app-characters-list',
  standalone: true,
  imports: [CharacterCardComponent],
  templateUrl: './characters-list.component.html',
  styleUrl: './characters-list.component.css'
})
export class CharactersListComponent {

  @Input() characters: any;

}
