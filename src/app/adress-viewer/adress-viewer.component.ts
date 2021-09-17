import {Component, OnInit} from '@angular/core';
import {RestService} from '../service/RestService';

@Component({
  selector: 'app-adress-viewer',
  templateUrl: './adress-viewer.component.html',
  styleUrls: ['./adress-viewer.component.css']
})
export class AdressViewerComponent implements OnInit {
  listOfData: Address[] = [];
  addressCount: number = 100;

  constructor(private restService: RestService) {
  }

  ngOnInit(): void {
    this.changePage(1)

  }

  changePage(page: number) {
    let config = this.restService.getAdresses(page - 1, 10);
    config.subscribe(page => {
      this.listOfData = [...page.content]
      this.addressCount = page.totalElements;
    });
  }

}

export interface Address {
  id: number
  postCode: string
  distric: string
  typeCity: string;
  city: string;
  typeStreet: string;
  street: string;
  house: string;
  flat: string;
  statutADRESA: string;
  phoneNumber: string;
  statuttelefon: string;
  proprietartelefon: string;
}

export interface PageAddress {
  content: Address[];
  totalElements: number
}

