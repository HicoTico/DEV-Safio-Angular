import { Component } from '@angular/core';
import { PokemonService } from '../../services/pokemonService/pokemon.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { PokemonDetailComponent } from '../../components/pokemon-detail/pokemon-detail.component';

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
  filterText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 7;
  totalPages: number = 0;
  containerDetailsContent: any;
  dialogDetailsContent: any;
  pokemonDetails: any;
  showResetButton: boolean;
  // dialog: MatDialog;
  displayPokemon(pokemon: any): string {
    return pokemon ? pokemon.name : '';
  }
  get summaryDataKeys() {
    return Object.keys(this.summaryData);
  }

  constructor(private pokemonService: PokemonService, public dialog: MatDialog) {
    this.dialog = dialog;
    this.showResetButton = false;
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
   //Function to aply autocomplete on input
  onInputChange() {
    this.filteredPokemons = this.pokemonList.filter(pokemon =>
      pokemon.name.toLowerCase().includes(this.filterText.toLowerCase())
    );
    this.showResetButton = true;
  }
  //Function filter By Pokemon Name
  filterPokemons() {
    this.currentPage = 1;
    this.pokemonListPaginated = this.pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(this.filterText.toLowerCase())
    );
    this.filteredPokemons = this.pokemonListPaginated;
  }
  //Function to Autocomplete pokemon name
  autocompliteSelected(pokemonName: string) {
    this.filterText = pokemonName;
    this.showResetButton = true;
    this.filterPokemons();
  }
   //Function button to show intial list after filterpokemon
  resetFilter() {
    this.filterText = '';
    this.updatePagination();
    this.showResetButton= false;
  }
   //Function to Get Details to render in aside container
  getDetails(name: string) {
    this.pokemonService.getDetails(name).subscribe((details) => {
      console.log(details, 'SI arroja data linea 84');
      this.containerDetailsContent = details;
    });
  }
   //Function to check & uncheck as a Favorite pokemon
  markAsFavorite(pokemon: any) {
    const index = this.favoritePokemons.indexOf(pokemon);
    if (index !== -1) {
      // Pokemon is already on the favorites list, so we uncheck it
      this.favoritePokemons.splice(index, 1);
    } else {
      // Pokemon is already on the favorites list, so we check it
      this.favoritePokemons.push(pokemon);
    }
  }
  //Function to calculate stats of pokemon by letters of the alphabet
  calculateSummary() {
    this.pokemonList.forEach((pokemon) => {
      const firstLetter = pokemon.name.charAt(0).toUpperCase();
      if (this.summaryData[firstLetter]) {
        this.summaryData[firstLetter]++;
      } else {
        this.summaryData[firstLetter] = 1;
      }
    });
  }
  //Function to show Pokemon Details on pokemon-Details.component (Dialog)
  getDetailsTopenDialog(name: string): void {
    this.pokemonService.getDetails(name).subscribe((details) => {
      this.pokemonDetails = details;
      this.openDialog();
    });
  }
  //Function to open pokemon-Details.component (Dialog)
  openDialog (): void {
    const dialogRef = this.dialog.open(PokemonDetailComponent,{
      data: this.pokemonDetails
    });
  }
}
