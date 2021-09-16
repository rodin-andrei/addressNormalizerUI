import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from '../adress-viewer/adress-viewer.component';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  constructor(private http: HttpClient) {
  }

  getConfig(page: number, size: number): Observable<Page> {
    let result: Observable<Page> = this.http.get<Page>("api/getAdresses?pageNumber=" + page + "&sizeNumber=" + size)
    return result;
  }
}
