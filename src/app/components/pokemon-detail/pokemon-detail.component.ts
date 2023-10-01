import { Component, Input, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { PokemonService } from 'src/app/services/pokemonService/pokemon.service';



@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent {
// @Input() pokemonDetails: any;

constructor(@Inject(MAT_DIALOG_DATA) public data: any, private pokemonservice: PokemonService) { }

ngOnInit() {
  console.log('pokemonDetails en PokemonDetailComponent:', this.data);
}
}
