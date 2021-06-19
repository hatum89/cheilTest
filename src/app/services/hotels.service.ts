import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {

  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:typedef
  getHotels(){
    return this.http.get('assets/hotels.json');
  }
}
