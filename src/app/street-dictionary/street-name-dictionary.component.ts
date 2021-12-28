import {Component, OnInit} from '@angular/core';
import {RestService} from '../service/RestService';
import {NzMessageService} from "ng-zorro-antd/message";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

@Component({
  selector: 'app-street-dictionary',
  templateUrl: './street-name-dictionary.component.html',
  styleUrls: ['./street-name-dictionary.component.css']
})
export class StreetNameDictionaryComponent implements OnInit {

  objectsCount: number = 100;
  originalStreetNames: OriginalStreetName[] = [];
  unidentifiedStreetNames: string[] = []
  uniqueOriginalStreetNames: OriginalStreetName[] = [];
  selectedValue: number = 1;
  popoverVisible: boolean = false;
  unidentifiedStreetName: string = '';
  loading = true;


  constructor(private restService: RestService, public message: NzMessageService) {
  }

  ngOnInit(): void {
    this.onChangePage(1)
    this.loadIncorrectCities();
  }

  onChangePage(page: number) {
    console.log("changePage: " + page)
    this.restService.getOriginalStreetNames(page - 1, 10)
      .pipe(
        catchError((error, test2) => {
          this.message.create("error", error.error.detail)
          return throwError('Something bad happened; please try again later.');
        })
      ).subscribe(page => {
      this.originalStreetNames = [...page.content]
      this.objectsCount = page.totalElements;
    });
  }


  deleteAltName(streetName: OriginalStreetName, alternativeStreetName: OriginalStreetName) {
    console.log("deleteAltName")
    this.restService.removeAlternativeStreetName(alternativeStreetName.id)
      .pipe(
        catchError((error, test2) => {
          this.message.create("error", error.error.detail)
          return throwError('Something bad happened; please try again later.');
        })
      )
      .subscribe(value => {
        this.message.create("success", alternativeStreetName.title + " has been deleted")
        let temp: OriginalStreetName[] = []
        streetName.alternativeStreetNames.forEach(value => {
          if (value != alternativeStreetName) temp.push(value);
        })
        streetName.alternativeStreetNames = temp;
        this.loadIncorrectCities();
      })
  }

  createAsStreet(streetName: OriginalStreetName, alternativeStreetName: OriginalStreetName) {
    console.log("createAsStreet")

    this.restService.createOriginalStreetNameFromAlternativeStreetName(alternativeStreetName.id)
      .pipe(
        catchError((error, test2) => {
          this.message.create("error", error.error.detail)
          return throwError('Something bad happened; please try again later.');
        })
      ).subscribe(value => {
      this.message.create("success", value.title + "  successful added")
      let temp: OriginalStreetName[] = []
      streetName.alternativeStreetNames.forEach(value => {
        if (value != alternativeStreetName) temp.push(value);
      })
      streetName.alternativeStreetNames = temp;

      let temp2: OriginalStreetName[] = [...this.originalStreetNames]
      temp2.push(value);
      this.originalStreetNames = temp2;

    });
  }

  deleteOriginalStreetName(originalStreetName: OriginalStreetName) {
    console.log("deleteOriginalStreetName")
    this.restService.removeOriginalStreetName(originalStreetName.id)
      .pipe(
        catchError((error, test2) => {
          this.message.create("error", error.error.detail)
          return throwError('Something bad happened; please try again later.');
        })
      )
      .subscribe(value => {
        this.message.create("success", originalStreetName.title + " has been deleted")
        let temp: OriginalStreetName[] = []
        this.originalStreetNames.forEach(value => {
          if (value != originalStreetName) temp.push(value);
        })
        this.originalStreetNames = temp;
        this.loadIncorrectCities();
      });
  }

  makeOriginalStreetName(originalStreetName: OriginalStreetName, alternativeStreetName: OriginalStreetName) {
    console.log("deleteOriginalStreetName")
    this.restService.makeOriginalStreetName(alternativeStreetName.id)
      .pipe(
        catchError((error, test2) => {
          this.message.create("error", error.error.detail)
          return throwError('Something bad happened; please try again later.');
        })
      )
      .subscribe(value => {
        this.message.create("success", "operation success")
        let title = originalStreetName.title;
        originalStreetName.title = alternativeStreetName.title
        alternativeStreetName.title = title
      });
  }

  createNewStreet(unidentifiedStreetName: String) {
    this.restService.createNewOriginalStreetName(unidentifiedStreetName)
      .pipe(
        catchError((error, test2) => {
          this.message.create("error", error.error.detail)
          return throwError('Something bad happened; please try again later.');
        })
      )
      .subscribe(value => {
        this.message.create("success", "operation success")
        let temp2: OriginalStreetName[] = [...this.originalStreetNames]
        temp2.push(value);
        this.originalStreetNames = temp2;
        this.loadIncorrectCities();
      });


  }

  loadUniqueOriginalStreetNames() {
    this.restService.getUniqueOriginalStreetNames()
      .subscribe(value => {
        this.uniqueOriginalStreetNames = value;
      });

  }

  onChangeNewStreet() {
    console.log("CreateNewAlternativeStreetName")
    this.popoverVisible = false;
    this.restService.createNewAlternativeStreetName(this.unidentifiedStreetName, this.selectedValue)
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
    this.restService.findUnidentifiedStreetNames().subscribe(value => {
      this.unidentifiedStreetNames = value.sort();
      this.loading = false;
    })
  }
}


export interface OriginalStreetName {
  id: number,
  title: string,
  alternativeStreetNames: OriginalStreetName[],
}

export interface PageOriginalStreetName {
  content: OriginalStreetName[];
  totalElements: number
}
