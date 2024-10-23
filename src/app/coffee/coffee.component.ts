import { Component } from '@angular/core';
import { Coffee } from '../logic/Coffee';
import { GeolocationService } from '../geolocation.service';
import { TastingRating } from '../logic/TastingRating';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UiService } from '../ui.service';

@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.css']
})
export class CoffeeComponent {

  coffee = new Coffee();
  types = ["Espresso", "Ristretto", "Americano", "Cappuccino", "Frappe"]
  tastingEnabled = false;
  formType : "editing" | "inserting" = "inserting";

  constructor(
    private geolocation: GeolocationService,
    private data: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private ui: UiService
  ) {}

  ngOnInit() {
    this.ui.setThemeColor("brown");
    this.ui.setTitle("New")
    this.route.params.subscribe(params => {
      if (params["id"]) {
        this.data.get(params["id"], (response: any) => {
          this.coffee = response; // TODO: convert the object to a Coffee instance
          this.formType = "editing";
          this.ui.setTitle(this.coffee.name);
          if (this.coffee.tastingRating) {
            this.tastingEnabled = true
          }
        })
      }
    })
  }

  tastingRatingChanged(checked: boolean) {
    if (checked) {
      this.coffee.tastingRating = new TastingRating();
    } else {
      this.coffee.tastingRating = null;
    }
  }

  acquireLocation() {
    this.geolocation.requestLocation( (location: GeolocationCoordinates | null) => {
      if (location) {
        this.coffee.location!.latitude = location.latitude;
        this.coffee.location!.longitude = location.longitude;
      }
    })
  }

  cancel() {
    this.router.navigate(["/"])
  }

  save() {
    let resultFunction = (result: boolean) => {
      if (result) {
        this.router.navigate(["/"]);
      } else {
        // TODO: render a nice error message
      }
    }

    if (this.formType=="inserting") {
      let { _id, ...insertedCoffee} = this.coffee;
      this.data.save(insertedCoffee, resultFunction);
    } else {
      this.data.save(this.coffee, resultFunction);
    }
  }
}
