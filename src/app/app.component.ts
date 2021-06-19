import { Component } from '@angular/core';
import {HotelsService} from './services/hotels.service';
import { faSpinner , faStar} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  hotels: any;
  hotelscopy: any[] = [];
  searchPerformed: any[];
  flag: boolean;
  message: string;
  finded: string;
  result: any[];
  faSpinner = faSpinner;
  faStar = faStar;
  constructor( private service: HotelsService) {
    this.flag = false;
    this.service.getHotels()
      .subscribe((hotels: any) => {
        console.log(hotels);
        this.hotels = hotels;
        this.hotelscopy = this.hotels;
      });
  }

  // tslint:disable-next-line:typedef
  search() {
    if (this.finded === undefined) {
      this.flag = true;
      alert('esta vacia la barra de busqueda');
    } else {
      this.hotelscopy = this.hotels;
      this.searchPerformed = [];
      this.hotelscopy.forEach( data => {
        const hotel: string = data.name.toLowerCase();
        if ( hotel.search((this.finded.trim()).toLowerCase()) >= 0) {
          this.searchPerformed.push(data);
        }
        if (this.searchPerformed.length > 0) {
          this.flag = false;
        } else {
          this.flag = true;
          this.message = 'No hay información referente a ese nombre de Hotel';
        }
      });
      this.hotelscopy = this.searchPerformed;
    }
  }
  // tslint:disable-next-line:typedef
   reload(){
    this.hotelscopy = this.hotels;
    alert('Ya está actualizado');
   }
}
