import {Component, OnInit} from '@angular/core';
import {RestService} from '../service/RestService';
import {NzMessageService} from "ng-zorro-antd/message";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

@Component({
  selector: 'app-city-dictionary',
  templateUrl: './city-type-dictionary.component.html',
  styleUrls: ['./city-type-dictionary.component.css']
})
export class CityTypeDictionaryComponent implements OnInit {

  objectsCount: number = 100;
  originalCityTypes: OriginalCityType[] = [];
  unidentifiedCityTypes: string[] = []
  uniqueOriginalCityTypes: OriginalCityType[] = [];
  selectedValue: number = -1;
  popoverVisible: boolean = false;
  unidentifiedCityType: string = '';
  loading = true;


  constructor(private restService: RestService, public message: NzMessageService) {
  }

  ngOnInit(): void {
    this.onChangePage(1)
    this.loadIncorrectCities();
  }

  onChangePage(page: number) {
    console.log("changePage: " + page)
    this.restService.getOriginalCityTypes(page - 1, 10)
      .pipe(
        catchError((error, test2) => {
          this.message.create("error", error.error.detail)
          return throwError('Something bad happened; please try again later.');
        })
      ).subscribe(page => {
      this.originalCityTypes = [...page.content]
      this.objectsCount = page.totalElements;
    });
  }


  deleteAltType(cityType: OriginalCityType, alternativeCityType: OriginalCityType) {
    console.log("deleteAltType")
    this.restService.removeAlternativeCityType(alternativeCityType.id)
      .pipe(
        catchError((error, test2) => {
          this.message.create("error", error.error.detail)
          return throwError('Something bad happened; please try again later.');
        })
      )
      .subscribe(value => {
        this.message.create("success", alternativeCityType.title + " has been deleted")
        let temp: OriginalCityType[] = []
        cityType.alternativeCityTypes.forEach(value => {
          if (value != alternativeCityType) temp.push(value);
        })
        cityType.alternativeCityTypes = temp;
        this.loadIncorrectCities();
      })
  }

  createAsCity(cityType: OriginalCityType, alternativeCityType: OriginalCityType) {
    console.log("createAsCity")

    this.restService.createOriginalCityTypeFromAlternativeCityType(alternativeCityType.id)
      .pipe(
        catchError((error, test2) => {
          this.message.create("error", error.error.detail)
          return throwError('Something bad happened; please try again later.');
        })
      ).subscribe(value => {
      this.message.create("success", value.title + "  successful added")
      let temp: OriginalCityType[] = []
      cityType.alternativeCityTypes.forEach(value => {
        if (value != alternativeCityType) temp.push(value);
      })
      cityType.alternativeCityTypes = temp;

      let temp2: OriginalCityType[] = [...this.originalCityTypes]
      temp2.push(value);
      this.originalCityTypes = temp2;

    });
  }

  deleteOriginalCityType(originalCityType: OriginalCityType) {
    console.log("deleteOriginalCityType")
    this.restService.removeOriginalCityType(originalCityType.id)
      .pipe(
        catchError((error, test2) => {
          this.message.create("error", error.error.detail)
          return throwError('Something bad happened; please try again later.');
        })
      )
      .subscribe(value => {
        this.message.create("success", originalCityType.title + " has been deleted")
        let temp: OriginalCityType[] = []
        this.originalCityTypes.forEach(value => {
          if (value != originalCityType) temp.push(value);
        })
        this.originalCityTypes = temp;
        this.loadIncorrectCities();
      });
  }

  makeOriginalCityType(originalCityType: OriginalCityType, alternativeCityType: OriginalCityType) {
    console.log("deleteOriginalCityType")
    this.restService.makeOriginalCityType(alternativeCityType.id)
      .pipe(
        catchError((error, test2) => {
          this.message.create("error", error.error.detail)
          return throwError('Something bad happened; please try again later.');
        })
      )
      .subscribe(value => {
        this.message.create("success", "operation success")
        let title = originalCityType.title;
        originalCityType.title = alternativeCityType.title
        alternativeCityType.title = title
      });
  }

  createNewCity(unidentifiedCityType: String) {
    this.restService.createNewOriginalCityType(unidentifiedCityType)
      .pipe(
        catchError((error, test2) => {
          this.message.create("error", error.error.detail)
          return throwError('Something bad happened; please try again later.');
        })
      )
      .subscribe(value => {
        this.message.create("success", "operation success")
        let temp2: OriginalCityType[] = [...this.originalCityTypes]
        temp2.push(value);
        this.originalCityTypes = temp2;
        this.loadIncorrectCities();
      });


  }

  loadUniqueOriginalCityTypes() {
    this.restService.getUniqueOriginalCityTypes()
      .subscribe(value => {
        this.uniqueOriginalCityTypes = value;
      });

  }

  onChangeNewCity() {
    console.log("CreateNewAlternativeCityType")
    this.popoverVisible = false;
    this.restService.createNewAlternativeCityType(this.unidentifiedCityType, this.selectedValue)
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
    this.restService.findUnidentifiedCityTypes().subscribe(value => {
      this.unidentifiedCityTypes = value.sort();
      this.loading = false;
    })
  }
}


export interface OriginalCityType {
  id: number,
  title: string,
  alternativeCityTypes: OriginalCityType[],
}

export interface PageOriginalCityType {
  content: OriginalCityType[];
  totalElements: number
}
