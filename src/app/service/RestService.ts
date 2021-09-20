import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PageAddress} from '../adress-viewer/adress-viewer.component';
import {OriginalCityName, PageOriginalCity} from '../city-dictionary/city-dictionary.component';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) {
  }

  getAdresses(page: number, size: number): Observable<PageAddress> {
    return this.http.get<PageAddress>("api/getAddresses?pageNumber=" + page + "&sizeNumber=" + size);
  }

  getOriginalCityes(page: number, size: number): Observable<PageOriginalCity> {
    return this.http.get<PageOriginalCity>("api/getDictionaryCityNames?pageNumber=" + page + "&sizeNumber=" + size);
  }

  deleteAlternativeCityName(id: number): Observable<void> {
    return this.http.get<void>("api/deleteAlternativeCityName?id=" + id)
  }

  createNewAlternativeCityName(title: string, id: number): Observable<OriginalCityName> {
    return this.http.get<OriginalCityName>("api/createAlternativeCityName?title=" + title + "&id=" + id)
  }

  createOriginalCityNameFromAlternativeCityName(id: number): Observable<OriginalCityName>  {
    return this.http.get<OriginalCityName>('api/createOriginalCityNameFromAlternativeCityName?id=' + id);
  }

  removeOriginalCityName(id:number):Observable<void>{
    return this.http.get<void>('api/removeOriginalCityName?id='+id);
  }

  makeOriginalCityName(id: number):Observable<OriginalCityName> {
    return this.http.get<OriginalCityName>('api/makeOriginalCityName?id=' + id);
  }
}
