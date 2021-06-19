import { Component } from '@angular/core';
import {HotelsService} from './services/hotels.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  hotels: any;
  hotelscopy: any;
  constructor( private service: HotelsService) {
    this.service.getHotels()
      .subscribe((hotels: any) => {
        console.log(hotels);
        this.hotels = hotels;
        this.hotelscopy = this.hotels;
      });
  }
}
