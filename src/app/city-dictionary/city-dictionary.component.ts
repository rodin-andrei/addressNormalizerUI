import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RestService} from '../service/RestService';
import {NzMessageService} from "ng-zorro-antd/message";
import {catchError, timeout} from "rxjs/operators";
import {throwError} from "rxjs";
import {basename} from "@angular/compiler-cli/src/ngtsc/file_system";

@Component({
  selector: 'app-city-dictionary',
  templateUrl: './city-dictionary.component.html',
  styleUrls: ['./city-dictionary.component.css']
})
export class CityDictionaryComponent implements OnInit {

  objectsCount: number = 100;
  originalCityNames: OriginalCityName[] = [];
  inputValue = '';

  constructor(private restService: RestService, public message: NzMessageService) {
  }

  ngOnInit(): void {
    this.changePage(1)
  }

  changePage(page: number) {
    console.log("changePage")
    this.restService.getOriginalCityes(page - 1, 10)
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

  addNewAlternativeCityName(originalCityName: OriginalCityName): void {
    console.log("addNewAlternativeCityName")
    this.restService.createNewAlternativeCityName(this.inputValue, originalCityName.id)
      .pipe(
        catchError((error, test2) => {
          this.message.create("error", error.error.detail)
          return throwError('Something bad happened; please try again later.');
        })
      ).subscribe(value => {
      this.message.create("success", "Successful added " + value.title)
      let temp = [...originalCityName.alternativeCityNames];
      temp.push(value)
      originalCityName.alternativeCityNames = temp
    })
    this.inputValue = '';
    originalCityName.visibleInputNewName = false
  }

  handleInputEscape(cityName: OriginalCityName) {
    cityName.visibleInputNewName = false
    this.inputValue = '';
  }

  deleteAltName(cityName: OriginalCityName, alternativeCityName: OriginalCityName) {
    console.log("deleteAltName")
    this.restService.deleteAlternativeCityName(alternativeCityName.id)
      .pipe(
        catchError((error, test2) => {
          this.message.create("error", error.error.detail)
          return throwError('Something bad happened; please try again later.');
        })
      ).subscribe(value => {
      this.message.create("success", alternativeCityName.title + " has been deleted")
      let temp: OriginalCityName[] = []
      cityName.alternativeCityNames.forEach(value => {
        if (value != alternativeCityName) temp.push(value);
      })
      cityName.alternativeCityNames = temp;
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
      this.originalCityNames=temp2;

    });
  }

  showInputNewAlternativeCityName(originalCityName: OriginalCityName) {
    originalCityName.visibleInputNewName = true
    setTimeout(() => {
      (document.getElementById("addNewAlternativeCityNameId")as HTMLElement).focus();
    }, 10);
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
        this.message.create("success","operation success")
        let title = originalCityName.title;
        originalCityName.title= alternativeCityName.title
        alternativeCityName.title=title
      });
  }
}



export interface OriginalCityName {
  id: number,
  title: string,
  alternativeCityNames: OriginalCityName[],
  visibleInputNewName: boolean
}

export interface PageOriginalCity {
  content: OriginalCityName[];
  totalElements: number
}
