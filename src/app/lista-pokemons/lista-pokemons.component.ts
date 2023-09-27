import { Component } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-lista-pokemons',
  templateUrl: './lista-pokemons.component.html',
  styleUrls: ['./lista-pokemons.component.css'],
})
export class ListaPokemonsComponent {
  pokemonList: any[] = []; //Array to save the list of Pokemons
  pokemonListPaginated: any[] = [];
  filteredPokemons: any[] = this.pokemonList;
  filterText: string = "";
  searchText: string = "";
  selectedPokemon: any;
  currentPage: number = 1;
  itemsPerPage: number = 12;
  totalPages: number = 0;
  displayPokemon(pokemon: any): string {
    return pokemon ? pokemon.name : '';
  }

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.getPokemonList(); //Call the function to get de list of pokemons
  }
  //Function to GET de list from services
  getPokemonList() {
    this.pokemonService.getList().subscribe((data) => {
      console.log(data, 'SI arroja data linea 29');
      this.pokemonList = data.results;
      this.paginate();
    });
  }
  //Function to Paginate
  paginate() {
    this.totalPages = Math.ceil(this.pokemonList.length / this.itemsPerPage);
    this.currentPage = 1;
    this.updatePagination();
  }

  //Function to Update Pagination
  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.pokemonListPaginated = this.pokemonList.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  //Function "Anterior" Botton
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }
  //Function "Siguiente" Botton
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }
  //Function filter By Pokemon Name
  filterPokemons() {
    this.currentPage = 1;
    this.pokemonListPaginated = this.pokemonList.filter(pokemon =>
      pokemon.name.toLowerCase().includes(this.filterText.toLowerCase())
    );
    this.filteredPokemons = this.pokemonListPaginated;
  }
 autocompliteSelected(event: MatAutocompleteSelectedEvent) {
  this.filterText = event.option.value;
  this.filterPokemons();
 }
 searchPokemon (){
  const foundPokemon = this.pokemonList.find(pokemon => pokemon.name.toLowerCase() === this.searchText.toLowerCase());
 if (foundPokemon) {
  this.selectedPokemon = foundPokemon;
 } else {
  this.selectedPokemon = null;
 }
}

}
