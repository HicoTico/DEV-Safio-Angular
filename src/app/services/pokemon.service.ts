import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';

  constructor(private http: HttpClient) { }

// Get list of pokemons
  getList(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
// Get Deatils of pokemons
  getDetails(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
