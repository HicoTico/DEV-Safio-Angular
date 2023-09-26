import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) { }

// Get list of pokemons
  getList() {
    return this.http.get(`${this.apiUrl}`);
  }
// Get Deatils of pokemons
  getDetails(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
