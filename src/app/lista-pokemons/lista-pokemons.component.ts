import { Component} from '@angular/core';
import { PokemonService } from '../services/pokemon.service';


@Component({
  selector: 'app-lista-pokemons',
  templateUrl: './lista-pokemons.component.html',
  styleUrls: ['./lista-pokemons.component.css']
})
export class ListaPokemonsComponent {
  pokemonList: any [] = []; //Array to save the list of Pokemons

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.getPokemonList(); //Call the function to get de 
  };

  getPokemonList(){
    this.pokemonService.getList().subscribe((resp) => {
      this.pokemonList = this.pokemonList; 
       // Aquí tendrás la lista de Pokemons
  });
 
  }
}
