import { Component } from '@angular/core';
import { faStar as farStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { PokemonService } from '../services/pokemon.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-lista-pokemons',
  templateUrl: './lista-pokemons.component.html',
  styleUrls: ['./lista-pokemons.component.css'],
})
export class ListaPokemonsComponent {
  pokemonList: any[] = []; //Array to save the list of Pokemons
  pokemonListPaginated: any[] = [];
  filteredPokemons: any[] = this.pokemonList;
  favoritePokemons: any[] = [];
  summaryData: { [letter: string]: number } = {};
  filterText: string = "";
  // searchText: string = "";
  // selectedPokemon: any;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  containerDetailsContent: any;
  displayPokemon(pokemon: any): string {
    return pokemon ? pokemon.name : '';
  }
  get summaryDataKeys() {
    return Object.keys(this.summaryData);
  }

  constructor(private pokemonService: PokemonService, library: FaIconLibrary) {
    library.addIcons(fasStar, farStar);
  }

  ngOnInit() {
    this.getPokemonList(); //Call the function to get de list of pokemons
    this.calculateSummary();
  }
  //Function to GET de list from services
  getPokemonList() {
    this.pokemonService.getList().subscribe((data) => {
      console.log(data, 'SI arroja data linea 29');
      this.pokemonList = data.results;
      this.paginate();
      this.calculateSummary();
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

 getDetails(name: string) {
  this.pokemonService.getDetails(name).subscribe((details) => {
    console.log(details, 'SI arroja data linea 84');
    this.containerDetailsContent = details;
  })
}
markAsFavorite(pokemon: any) {
  const index = this.favoritePokemons.indexOf(pokemon);

  if (index !== -1) {
    // El Pokémon ya está en la lista de favoritos, así que lo desmarcamos
    this.favoritePokemons.splice(index, 1);
  } else {
    // El Pokémon no está en la lista de favoritos, así que lo marcamos
    this.favoritePokemons.push(pokemon);
  }
}
calculateSummary(){
  this.pokemonList.forEach(pokemon => {
    const firstLetter = pokemon.name.charAt(0).toUpperCase();
    if(this.summaryData[firstLetter]){
      this.summaryData[firstLetter]++;
    } else {
      this.summaryData[firstLetter] = 1;
    }
  });
}



// markAsFavorite(pokemon: any) {
//   if(!this.favoritePokemons.includes(pokemon)) {
//  this.favoritePokemons.push(pokemon);
//   }
// }
  
 }
//  searchPokemon (){
//   const foundPokemon = this.pokemonList.find(pokemon => pokemon.name.toLowerCase() === this.searchText.toLowerCase());
//  if (foundPokemon) {
//   this.selectedPokemon = foundPokemon;
//  } else {
//   this.selectedPokemon = null;
//  }
// }

