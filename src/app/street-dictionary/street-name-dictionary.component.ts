import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RestService} from '../service/RestService';
import {NzMessageService} from "ng-zorro-antd/message";
import {catchError, timeout} from "rxjs/operators";
import {throwError} from "rxjs";
import {basename} from "@angular/compiler-cli/src/ngtsc/file_system";

@Component({
  selector: 'app-street-name-dictionary',
  templateUrl: './street-name-dictionary.component.html',
  styleUrls: ['./street-name-dictionary.component.css']
})
export class StreetNameDictionaryComponent implements OnInit {

  objectsCount: number = 100;
  originalStreetNames: OriginalStreetName[] = [];
  inputValue = '';

  constructor(private restService: RestService, public message: NzMessageService) {
  }

  ngOnInit(): void {
    this.changePage(1)
  }

  changePage(page: number) {
    console.log("changePage")
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

  addNewAlternativeStreetName(originalStreetName: OriginalStreetName): void {
    console.log("addNewAlternativeStreetName")
    this.restService.createNewAlternativeStreetName(this.inputValue, originalStreetName.id)
      .pipe(
        catchError((error, test2) => {
          this.message.create("error", error.error.detail)
          return throwError('Something bad happened; please try again later.');
        })
      ).subscribe(value => {
      this.message.create("success", "Successful added " + value.title)
      let temp = [...originalStreetName.alternativeStreetNames];
      temp.push(value)
      originalStreetName.alternativeStreetNames = temp
    })
    this.inputValue = '';
    originalStreetName.visibleInputNewName = false
  }

  handleInputEscape(streetName: OriginalStreetName) {
    streetName.visibleInputNewName = false
    this.inputValue = '';
  }

  deleteAltName(streetName: OriginalStreetName, alternativeStreetName: OriginalStreetName) {
    console.log("deleteAltName")
    this.restService.deleteAlternativeStreetName(alternativeStreetName.id)
      .pipe(
        catchError((error, test2) => {
          this.message.create("error", error.error.detail)
          return throwError('Something bad happened; please try again later.');
        })
      ).subscribe(value => {
      this.message.create("success", alternativeStreetName.title + " has been deleted")
      let temp: OriginalStreetName[] = []
      streetName.alternativeStreetNames.forEach(value => {
        if (value != alternativeStreetName) temp.push(value);
      })
      streetName.alternativeStreetNames = temp;
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
      this.originalStreetNames=temp2;

    });
  }

  showInputNewAlternativeStreetName(originalStreetName: OriginalStreetName) {
    originalStreetName.visibleInputNewName = true
    setTimeout(() => {
      (document.getElementById("addNewAlternativeStreetNameId")as HTMLElement).focus();
    }, 10);
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
        this.message.create("success","operation success")
        let title = originalStreetName.title;
        originalStreetName.title= alternativeStreetName.title
        alternativeStreetName.title=title
      });
  }
}



export interface OriginalStreetName {
  id: number,
  title: string,
  alternativeStreetNames: OriginalStreetName[],
  visibleInputNewName: boolean
}

export interface PageOriginalStreetName {
  content: OriginalStreetName[];
  totalElements: number
}
