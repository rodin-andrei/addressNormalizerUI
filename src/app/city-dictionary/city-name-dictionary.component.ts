import {Component, OnInit} from '@angular/core';
import {RestService} from '../service/RestService';
import {NzMessageService} from "ng-zorro-antd/message";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

@Component({
  selector: 'app-city-dictionary',
  templateUrl: './city-name-dictionary.component.html',
  styleUrls: ['./city-name-dictionary.component.css']
})
export class CityNameDictionaryComponent implements OnInit {

  objectsCount: number = 100;
  originalCityNames: OriginalCityName[] = [];
  unidentifiedCityNames: string[] = []
  uniqueOriginalCityNames: OriginalCityName[] = [];
  selectedValue: number = 1;
  popoverVisible: boolean = false;
  unidentifiedCityName: string = '';
  loading = true;


  constructor(private restService: RestService, public message: NzMessageService) {
  }

  ngOnInit(): void {
    this.onChangePage(1)
    this.loadIncorrectCities();
  }

  onChangePage(page: number) {
    console.log("changePage: " + page)
    this.restService.getOriginalCityNames(page - 1, 10)
      .pipe(
        catchError((error, test2) => {
          this.message.create("error", error.error.detail)
          return throwError('Something bad happened; please try again later.');
        })
      ).subscribe(page => {
      this.originalCityNames = [...page.content]
      this.objectsCount = page.totalElements;
    });
  }


  deleteAltName(cityName: OriginalCityName, alternativeCityName: OriginalCityName) {
    console.log("deleteAltName")
    this.restService.removeAlternativeCityName(alternativeCityName.id)
      .pipe(
        catchError((error, test2) => {
          this.message.create("error", error.error.detail)
          return throwError('Something bad happened; please try again later.');
        })
      )
      .subscribe(value => {
        this.message.create("success", alternativeCityName.title + " has been deleted")
        let temp: OriginalCityName[] = []
        cityName.alternativeCityNames.forEach(value => {
          if (value != alternativeCityName) temp.push(value);
        })
        cityName.alternativeCityNames = temp;
        this.loadIncorrectCities();
      })
  }

  createAsCity(cityName: OriginalCityName, alternativeCityName: OriginalCityName) {
    console.log("createAsCity")

    this.restService.createOriginalCityNameFromAlternativeCityName(alternativeCityName.id)
      .pipe(
        catchError((error, test2) => {
          this.message.create("error", error.error.detail)
          return throwError('Something bad happened; please try again later.');
        })
      ).subscribe(value => {
      this.message.create("success", value.title + "  successful added")
      let temp: OriginalCityName[] = []
      cityName.alternativeCityNames.forEach(value => {
        if (value != alternativeCityName) temp.push(value);
      })
      cityName.alternativeCityNames = temp;

      let temp2: OriginalCityName[] = [...this.originalCityNames]
      temp2.push(value);
      this.originalCityNames = temp2;

    });
  }

  deleteOriginalCityName(originalCityName: OriginalCityName) {
    console.log("deleteOriginalCityName")
    this.restService.removeOriginalCityName(originalCityName.id)
      .pipe(
        catchError((error, test2) => {
          this.message.create("error", error.error.detail)
          return throwError('Something bad happened; please try again later.');
        })
      )
      .subscribe(value => {
        this.message.create("success", originalCityName.title + " has been deleted")
        let temp: OriginalCityName[] = []
        this.originalCityNames.forEach(value => {
          if (value != originalCityName) temp.push(value);
        })
        this.originalCityNames = temp;
        this.loadIncorrectCities();
      });
  }

  makeOriginalCityName(originalCityName: OriginalCityName, alternativeCityName: OriginalCityName) {
    console.log("deleteOriginalCityName")
    this.restService.makeOriginalCityName(alternativeCityName.id)
      .pipe(
        catchError((error, test2) => {
          this.message.create("error", error.error.detail)
          return throwError('Something bad happened; please try again later.');
        })
      )
      .subscribe(value => {
        this.message.create("success", "operation success")
        let title = originalCityName.title;
        originalCityName.title = alternativeCityName.title
        alternativeCityName.title = title
      });
  }

  createNewCity(unidentifiedCityName: String) {
    this.restService.createNewOriginalCityName(unidentifiedCityName)
      .pipe(
        catchError((error, test2) => {
          this.message.create("error", error.error.detail)
          return throwError('Something bad happened; please try again later.');
        })
      )
      .subscribe(value => {
        this.message.create("success", "operation success")
        let temp2: OriginalCityName[] = [...this.originalCityNames]
        temp2.push(value);
        this.originalCityNames = temp2;
        this.loadIncorrectCities();
      });


  }

  loadUniqueOriginalCityNames() {
    this.restService.getUniqueOriginalCityNames()
      .subscribe(value => {
        this.uniqueOriginalCityNames = value;
      });

  }

  onChangeNewCity() {
    console.log("CreateNewAlternativeCityName")
    this.popoverVisible = false;
    this.restService.createNewAlternativeCityName(this.unidentifiedCityName, this.selectedValue)
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
    this.restService.findUnidentifiedCityNames().subscribe(value => {
      this.unidentifiedCityNames = value.sort();
      this.loading = false;
    })
  }
}


export interface OriginalCityName {
  id: number,
  title: string,
  alternativeCityNames: OriginalCityName[],
}

export interface PageOriginalCityName {
  content: OriginalCityName[];
  totalElements: number
}
