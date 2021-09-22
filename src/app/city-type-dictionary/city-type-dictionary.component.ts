import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RestService} from '../service/RestService';
import {NzMessageService} from "ng-zorro-antd/message";
import {catchError, timeout} from "rxjs/operators";
import {throwError} from "rxjs";
import {basename} from "@angular/compiler-cli/src/ngtsc/file_system";

@Component({
  selector: 'app-city-type-dictionary',
  templateUrl: './city-type-dictionary.component.html',
  styleUrls: ['./city-type-dictionary.component.css']
})
export class CityTypeDictionaryComponent implements OnInit {

  objectsCount: number = 100;
  originalCityTypes: OriginalCityType[] = [];
  inputValue = '';

  constructor(private restService: RestService, public message: NzMessageService) {
  }

  ngOnInit(): void {
    this.changePage(1)
  }

  changePage(page: number) {
    console.log("changePage")
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

  addNewAlternativeCityType(originalCityType: OriginalCityType): void {
    console.log("addNewAlternativeCityType")
    this.restService.createNewAlternativeCityType(this.inputValue, originalCityType.id)
      .pipe(
        catchError((error, test2) => {
          this.message.create("error", error.error.detail)
          return throwError('Something bad happened; please try again later.');
        })
      ).subscribe(value => {
      this.message.create("success", "Successful added " + value.title)
      let temp = [...originalCityType.alternativeCityTypes];
      temp.push(value)
      originalCityType.alternativeCityTypes = temp
    })
    this.inputValue = '';
    originalCityType.visibleInputNewType = false
  }

  handleInputEscape(cityType: OriginalCityType) {
    cityType.visibleInputNewType = false
    this.inputValue = '';
  }

  deleteAltType(cityType: OriginalCityType, alternativeCityType: OriginalCityType) {
    console.log("deleteAltType")
    this.restService.deleteAlternativeCityType(alternativeCityType.id)
      .pipe(
        catchError((error, test2) => {
          this.message.create("error", error.error.detail)
          return throwError('Something bad happened; please try again later.');
        })
      ).subscribe(value => {
      this.message.create("success", alternativeCityType.title + " has been deleted")
      let temp: OriginalCityType[] = []
      cityType.alternativeCityTypes.forEach(value => {
        if (value != alternativeCityType) temp.push(value);
      })
      cityType.alternativeCityTypes = temp;
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
      this.originalCityTypes=temp2;

    });
  }

  showInputNewAlternativeCityType(originalCityType: OriginalCityType) {
    originalCityType.visibleInputNewType = true
    setTimeout(() => {
      (document.getElementById("addNewAlternativeCityTypeId")as HTMLElement).focus();
    }, 10);
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
        this.message.create("success","operation success")
        let title = originalCityType.title;
        originalCityType.title= alternativeCityType.title
        alternativeCityType.title=title
      });
  }
}



export interface OriginalCityType {
  id: number,
  title: string,
  alternativeCityTypes: OriginalCityType[],
  visibleInputNewType: boolean
}

export interface PageOriginalCityType {
  content: OriginalCityType[];
  totalElements: number
}
