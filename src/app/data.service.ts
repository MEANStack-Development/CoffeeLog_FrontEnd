import { Injectable } from '@angular/core';
import { Coffee } from './logic/Coffee';
import { PlaceLocation } from './logic/PlaceLocation';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getList(callback: Function) {
    const list = [
      new Coffee("Double Espresso", "Cafe Tortoni", new PlaceLocation("Av. de Mayo 600", "Buenos Aires")),
      new Coffee("Honey Americano", "Starcoffee", new PlaceLocation("Gran Via 34", "Madrid"))
    ];
    callback(list);
  }
}
