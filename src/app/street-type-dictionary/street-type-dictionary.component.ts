import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RestService} from '../service/RestService';
import {NzMessageService} from "ng-zorro-antd/message";
import {catchError, timeout} from "rxjs/operators";
import {throwError} from "rxjs";
import {basename} from "@angular/compiler-cli/src/ngtsc/file_system";

@Component({
  selector: 'app-street-type-dictionary',
  templateUrl: './street-type-dictionary.component.html',
  styleUrls: ['./street-type-dictionary.component.css']
})
export class StreetTypeDictionaryComponent implements OnInit {

  objectsCount: number = 100;
  originalStreetTypes: OriginalStreetType[] = [];
  inputValue = '';

  constructor(private restService: RestService, public message: NzMessageService) {
  }

  ngOnInit(): void {
    this.changePage(1)
  }

  changePage(page: number) {
    console.log("changePage")
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

  addNewAlternativeStreetType(originalStreetType: OriginalStreetType): void {
    console.log("addNewAlternativeStreetType")
    this.restService.createNewAlternativeStreetType(this.inputValue, originalStreetType.id)
      .pipe(
        catchError((error, test2) => {
          this.message.create("error", error.error.detail)
          return throwError('Something bad happened; please try again later.');
        })
      ).subscribe(value => {
      this.message.create("success", "Successful added " + value.title)
      let temp = [...originalStreetType.alternativeStreetTypes];
      temp.push(value)
      originalStreetType.alternativeStreetTypes = temp
    })
    this.inputValue = '';
    originalStreetType.visibleInputNewType = false
  }

  handleInputEscape(streetType: OriginalStreetType) {
    streetType.visibleInputNewType = false
    this.inputValue = '';
  }

  deleteAltType(streetType: OriginalStreetType, alternativeStreetType: OriginalStreetType) {
    console.log("deleteAltType")
    this.restService.deleteAlternativeStreetType(alternativeStreetType.id)
      .pipe(
        catchError((error, test2) => {
          this.message.create("error", error.error.detail)
          return throwError('Something bad happened; please try again later.');
        })
      ).subscribe(value => {
      this.message.create("success", alternativeStreetType.title + " has been deleted")
      let temp: OriginalStreetType[] = []
      streetType.alternativeStreetTypes.forEach(value => {
        if (value != alternativeStreetType) temp.push(value);
      })
      streetType.alternativeStreetTypes = temp;
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
      this.originalStreetTypes=temp2;

    });
  }

  showInputNewAlternativeStreetType(originalStreetType: OriginalStreetType) {
    originalStreetType.visibleInputNewType = true
    setTimeout(() => {
      (document.getElementById("addNewAlternativeStreetTypeId")as HTMLElement).focus();
    }, 10);
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
        this.message.create("success","operation success")
        let title = originalStreetType.title;
        originalStreetType.title= alternativeStreetType.title
        alternativeStreetType.title=title
      });
  }
}



export interface OriginalStreetType {
  id: number,
  title: string,
  alternativeStreetTypes: OriginalStreetType[],
  visibleInputNewType: boolean
}

export interface PageOriginalStreetType {
  content: OriginalStreetType[];
  totalElements: number
}
