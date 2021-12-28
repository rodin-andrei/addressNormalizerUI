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
  loading = true;
  isVisible = false;
  modalData: any;

  filter_id: string = "";
  filter_post_Code: string = "";
  filter_district: string = "";
  filter_house: string = "";
  filter_flat: string = "";
  filter_statut_Adresa: string = "";
  filter_phone_Number: string = "";
  filter_statut_Telefon: string = "";
  filter_proprietar_Telefon: string = "";
  filter_correct_City_Type: string = "";
  filter_correct_City_Name: string = "";
  filter_correct_Street_Name: string = "";
  filter_correct_Street_Type: string = "";
  pageNumber: number = 1;
  changed: boolean = true;

  constructor(private restService: RestService) {
  }

  ngOnInit(): void {
    this.changePage(1);
  }

  changePageFix(page: number, fix: boolean) {
    this.changed = true;
    this.changePage(page)
  }

  changePage(page: number) {
    if (!this.changed) {
      return
    }
    this.changed = false
    this.listOfData = []
    console.log("change page " + page)
    let config = this.restService.getAdresses(
      this.filter_id == '' ? "%" : '%' + this.filter_id + '%',
      this.filter_post_Code == '' ? "%" : '%' + this.filter_post_Code + '%',
      this.filter_district == '' ? "%" : '%' + this.filter_district + '%',
      this.filter_house == '' ? "%" : '%' + this.filter_house + '%',
      this.filter_flat == '' ? "%" : '%' + this.filter_flat + '%',
      this.filter_statut_Adresa == '' ? "%" : '%' + this.filter_statut_Adresa + '%',
      this.filter_phone_Number == '' ? "%" : '%' + this.filter_phone_Number + '%',
      this.filter_statut_Telefon == '' ? "%" : '%' + this.filter_statut_Telefon + '%',
      this.filter_proprietar_Telefon == '' ? "%" : '%' + this.filter_proprietar_Telefon + '%',
      this.filter_correct_City_Type == '' ? "%" : '%' + this.filter_correct_City_Type + '%',
      this.filter_correct_City_Name == '' ? "%" : '%' + this.filter_correct_City_Name + '%',
      this.filter_correct_Street_Name == '' ? "%" : '%' + this.filter_correct_Street_Name + '%',
      this.filter_correct_Street_Type == '' ? "%" : '%' + this.filter_correct_Street_Type + '%',
      page - 1,
      10);
    config.subscribe(page => {
      this.loading = true;
      this.listOfData = [...page.content]
      this.addressCount = page.totalElements;
      this.loading = false;
    });
    this.pageNumber = page;
  }

  edit(data: Address) {
    this.modalData = Object.assign({}, data);
    this.isVisible = true;
  }

  handleOk(): void {
    this.restService.editAddress(this.modalData.id, this.modalData.post_Code, this.modalData.district,
      this.modalData.correct_City_Type, this.modalData.city, this.modalData.correct_Street_Type,
      this.modalData.street, this.modalData.house, this.modalData.flat).subscribe(value => {
      console.log(value);
    })
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}

export interface Address {
  id: number
  post_Code: string
  district: string
  type_City: string;
  city: string;
  type_Street: string;
  street: string;
  house: string;
  flat: string;
  statut_Adresa: string;
  phone_Number: string;
  statut_Telefon: string;
  proprietar_Telefon: string;
  correct_City_Type: string;
  correct_City_Name: string;
  correct_Street_Name: string;
  correct_Street_Type: string;
}

export interface PageAddress {
  content: Address[];
  totalElements: number
}
