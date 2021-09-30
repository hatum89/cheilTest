import { Component } from '@angular/core';
import {HotelsService} from './services/hotels.service';
import { faSpinner , faStar , faHotel} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2/dist/sweetalert2.js';
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
  finded: string;
  result: any[];
  faSpinner = faSpinner;
  faStar = faStar;
  faHotel = faHotel;
  constructor( private service: HotelsService) {
    this.service.getHotels()
      .subscribe((datahotels: any) => {
        console.log(datahotels);
        this.hotels = datahotels.hotels;
        this.hotelscopy = this.hotels;
      });
  }

  // tslint:disable-next-line:typedef
  search() {
       if (this.finded === undefined || this.finded === '') {
      Swal.fire({
        text: 'La barra de búsqueda se encuentra vacía',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6',
      });
    } else {
      this.hotelscopy = this.hotels;
      this.searchPerformed = [];
      this.hotelscopy.forEach( data => {
        const hotel: string = data.name.toLowerCase();
        if ( hotel.search((this.finded.trim()).toLowerCase()) >= 0) {
          this.searchPerformed.push(data);
        }
      });
      if (this.searchPerformed.length > 0) {
           console.log('encontro algo', this.searchPerformed.length);
         } else if (this.searchPerformed.length === 0){
            Swal.fire({
             text: 'No existe un hotel con ese nombre',
             confirmButtonText: 'Aceptar',
             confirmButtonColor: '#3085d6',
           }).then((result) => {
             if (result.isConfirmed){
               this.reload();
             }
            });
         }
      this.hotelscopy = this.searchPerformed;
    }
       this.finded = '';
  }
  // tslint:disable-next-line:typedef
   reload(){
    this.finded = '';
    this.hotelscopy = this.hotels;
    Swal.fire({
       title: 'Cheil Hotel',
       text: 'Actualizado',
       icon: 'success',
       confirmButtonText: 'Aceptar',
       confirmButtonColor: '#3085d6',
     });
   }
}
