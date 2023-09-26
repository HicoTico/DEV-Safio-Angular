import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPokemonsComponent } from './lista-pokemons.component';

describe('ListaPokemonsComponent', () => {
  let component: ListaPokemonsComponent;
  let fixture: ComponentFixture<ListaPokemonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaPokemonsComponent]
    });
    fixture = TestBed.createComponent(ListaPokemonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
