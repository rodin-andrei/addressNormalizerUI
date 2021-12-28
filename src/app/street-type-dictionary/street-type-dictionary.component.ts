import {Component, OnInit} from '@angular/core';
import {RestService} from '../service/RestService';
import {NzMessageService} from "ng-zorro-antd/message";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

@Component({
  selector: 'app-street-dictionary',
  templateUrl: './street-type-dictionary.component.html',
  styleUrls: ['./street-type-dictionary.component.css']
})
export class StreetTypeDictionaryComponent implements OnInit {

  objectsCount: number = 100;
  originalStreetTypes: OriginalStreetType[] = [];
  unidentifiedStreetTypes: string[] = []
  uniqueOriginalStreetTypes: OriginalStreetType[] = [];
  selectedValue: number = 1;
  popoverVisible: boolean = false;
  unidentifiedStreetType: string = '';
  loading = true;


  constructor(private restService: RestService, public message: NzMessageService) {
  }

  ngOnInit(): void {
    this.onChangePage(1)
    this.loadIncorrectCities();
  }

  onChangePage(page: number) {
    console.log("changePage: " + page)
    this.restService.getOriginalStreetTypes(page - 1, 10)
      .pipe(
        catchError((error, test2) => {
          this.message.create("error", error.error.detail)
          return throwError('Something bad happened; please try again later.');
        })
      ).subscribe(page => {
      this.originalStreetTypes = [...page.content]
      this.objectsCount = page.totalElements;
    });
  }


  deleteAltType(streetType: OriginalStreetType, alternativeStreetType: OriginalStreetType) {
    console.log("deleteAltType")
    this.restService.removeAlternativeStreetType(alternativeStreetType.id)
      .pipe(
        catchError((error, test2) => {
          this.message.create("error", error.error.detail)
          return throwError('Something bad happened; please try again later.');
        })
      )
      .subscribe(value => {
        this.message.create("success", alternativeStreetType.title + " has been deleted")
        let temp: OriginalStreetType[] = []
        streetType.alternativeStreetTypes.forEach(value => {
          if (value != alternativeStreetType) temp.push(value);
        })
        streetType.alternativeStreetTypes = temp;
        this.loadIncorrectCities();
      })
  }

  createAsStreet(streetType: OriginalStreetType, alternativeStreetType: OriginalStreetType) {
    console.log("createAsStreet")

    this.restService.createOriginalStreetTypeFromAlternativeStreetType(alternativeStreetType.id)
      .pipe(
        catchError((error, test2) => {
          this.message.create("error", error.error.detail)
          return throwError('Something bad happened; please try again later.');
        })
      ).subscribe(value => {
      this.message.create("success", value.title + "  successful added")
      let temp: OriginalStreetType[] = []
      streetType.alternativeStreetTypes.forEach(value => {
        if (value != alternativeStreetType) temp.push(value);
      })
      streetType.alternativeStreetTypes = temp;

      let temp2: OriginalStreetType[] = [...this.originalStreetTypes]
      temp2.push(value);
      this.originalStreetTypes = temp2;

    });
  }

  deleteOriginalStreetType(originalStreetType: OriginalStreetType) {
    console.log("deleteOriginalStreetType")
    this.restService.removeOriginalStreetType(originalStreetType.id)
      .pipe(
        catchError((error, test2) => {
          this.message.create("error", error.error.detail)
          return throwError('Something bad happened; please try again later.');
        })
      )
      .subscribe(value => {
        this.message.create("success", originalStreetType.title + " has been deleted")
        let temp: OriginalStreetType[] = []
        this.originalStreetTypes.forEach(value => {
          if (value != originalStreetType) temp.push(value);
        })
        this.originalStreetTypes = temp;
        this.loadIncorrectCities();
      });
  }

  makeOriginalStreetType(originalStreetType: OriginalStreetType, alternativeStreetType: OriginalStreetType) {
    console.log("deleteOriginalStreetType")
    this.restService.makeOriginalStreetType(alternativeStreetType.id)
      .pipe(
        catchError((error, test2) => {
          this.message.create("error", error.error.detail)
          return throwError('Something bad happened; please try again later.');
        })
      )
      .subscribe(value => {
        this.message.create("success", "operation success")
        let title = originalStreetType.title;
        originalStreetType.title = alternativeStreetType.title
        alternativeStreetType.title = title
      });
  }

  createNewStreet(unidentifiedStreetType: String) {
    this.restService.createNewOriginalStreetType(unidentifiedStreetType)
      .pipe(
        catchError((error, test2) => {
          this.message.create("error", error.error.detail)
          return throwError('Something bad happened; please try again later.');
        })
      )
      .subscribe(value => {
        this.message.create("success", "operation success")
        let temp2: OriginalStreetType[] = [...this.originalStreetTypes]
        temp2.push(value);
        this.originalStreetTypes = temp2;
        this.loadIncorrectCities();
      });


  }

  loadUniqueOriginalStreetTypes() {
    this.restService.getUniqueOriginalStreetTypes()
      .subscribe(value => {
        this.uniqueOriginalStreetTypes = value;
      });

  }

  onChangeNewStreet() {
    console.log("CreateNewAlternativeStreetType")
    this.popoverVisible = false;
    this.restService.createNewAlternativeStreetType(this.unidentifiedStreetType, this.selectedValue)
      .pipe(
        catchError((error, test2) => {
          this.message.create("error", error.error.detail)
          return throwError('Something bad happened; please try again later.');
        })
      )
      .subscribe(value => {
        this.message.create("success", "operation success")
        this.loadIncorrectCities();
      });
    this.selectedValue=-1;
  }

  private loadIncorrectCities() {
    this.restService.findUnidentifiedStreetTypes().subscribe(value => {
      this.unidentifiedStreetTypes = value.sort();
      this.loading = false;
    })
  }
}


export interface OriginalStreetType {
  id: number,
  title: string,
  alternativeStreetTypes: OriginalStreetType[],
}

export interface PageOriginalStreetType {
  content: OriginalStreetType[];
  totalElements: number
}
