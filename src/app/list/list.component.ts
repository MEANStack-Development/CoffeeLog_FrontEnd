import { Component } from '@angular/core';
import { Coffee } from '../logic/Coffee';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { GeolocationService } from '../geolocation.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
   list: Coffee[] = [];

  constructor(
    private data: DataService,
    private router: Router,
    private geolocation: GeolocationService
  ) {}

  //UpdateValue
   goDetails(coffee: Coffee) {
      this.router.navigate(["/coffee", coffee._id])
   }

  //Function for Go to Map
   goMap(coffee: Coffee){
    const mapURL = this.geolocation.getMapLink(coffee.location!)
    location.href = mapURL;
    window.open(mapURL, "_blank");
   }


  //Function for Share
  share(coffee: Coffee){
    const text = `I had this coffee at ${coffee.place} and for me it's a ${coffee.rating} stars`;
    //Let's check can we share the following info
    const info = {
      title: coffee.name,
      text: text,
      url: window.location.href
    }

    //Check that device/or OS has share dialog
    if('share' in navigator && navigator.canShare()){
        navigator.share(info)
      }else{
        // TODO Show somkind of message
      }
  }

    



   ngOnInit() {
    this.data.getList((list: Coffee[]) => {
      this.list = list;
    })
   }

}
