import { Injectable } from '@angular/core';
import { Coffee } from './logic/Coffee';
import { PlaceLocation } from './logic/PlaceLocation';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  //Cofee item List
  getList (callback: Function) {
    const List = [
      new Coffee("Double Expresso","Cafe Tortoni", new PlaceLocation("Av. de Mongo 600", "Madrid")),
      new Coffee("Machiato","Cafe Helsinki", new PlaceLocation("Helsinkikatu 26 A", "Helsinki")),
    ];
    callback(List);
  }
}

//Continue From 3.1