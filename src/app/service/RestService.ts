import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PageAddress} from '../adress-viewer/adress-viewer.component';
import {OriginalCityName, PageOriginalCityName} from '../city-dictionary/city-name-dictionary.component';
import {OriginalStreetName, PageOriginalStreetName} from "../street-dictionary/street-name-dictionary.component";
import {OriginalCityType, PageOriginalCityType} from "../city-type-dictionary/city-type-dictionary.component";
import {OriginalStreetType, PageOriginalStreetType} from "../street-type-dictionary/street-type-dictionary.component";

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) {
  }

  getAdresses(filter_id: string,
              filter_post_Code: string,
              filter_district: string,
              filter_house: string,
              filter_flat: string,
              filter_statut_Adresa: string,
              filter_phone_Number: string,
              filter_statut_Telefon: string,
              filter_proprietar_Telefon: string,
              filter_correct_City_Type: string,
              filter_correct_City_Name: string,
              filter_correct_Street_Name: string,
              filter_correct_Street_Type: string, page: number, size: number): Observable<PageAddress> {
    return this.http.get<PageAddress>("api/getAddresses?pageNumber=" + page + "&sizeNumber=" + size
      + "&filter_id=" + encodeURI(filter_id)
      + "&filter_post_Code=" + encodeURI(filter_post_Code)
      + "&filter_district=" + encodeURI(filter_district)
      + "&filter_house=" + encodeURI(filter_house)
      + "&filter_flat=" + encodeURI(filter_flat)
      + "&filter_statut_Adresa=" + encodeURI(filter_statut_Adresa)
      + "&filter_phone_Number=" + encodeURI(filter_phone_Number)
      + "&filter_statut_Telefon=" + encodeURI(filter_statut_Telefon)
      + "&filter_proprietar_Telefon=" + encodeURI(filter_proprietar_Telefon)
      + "&filter_correct_City_Type=" + encodeURI(filter_correct_City_Type)
      + "&filter_correct_City_Name=" + encodeURI(filter_correct_City_Name)
      + "&filter_correct_Street_Name=" + encodeURI(filter_correct_Street_Name)
      + "&filter_correct_Street_Type=" + encodeURI(filter_correct_Street_Type)
    );
  }

  getOriginalCityNames(page: number, size: number): Observable<PageOriginalCityName> {
    return this.http.get<PageOriginalCityName>("api/getOriginalCityNames?pageNumber=" + page + "&sizeNumber=" + size);
  }

  removeAlternativeCityName(id: number): Observable<void> {
    return this.http.get<void>("api/removeAlternativeCityName?id=" + id)
  }

  createNewAlternativeCityName(title: string, id: number): Observable<OriginalCityName> {
    return this.http.get<OriginalCityName>("api/createAlternativeCityName?title=" + title + "&originalCityNameId=" + id)
  }

  createOriginalCityNameFromAlternativeCityName(id: number): Observable<OriginalCityName> {
    return this.http.get<OriginalCityName>('api/createOriginalCityNameFromAlternativeCityName?id=' + id);
  }

  removeOriginalCityName(id: number): Observable<void> {
    return this.http.get<void>('api/removeOriginalCityName?id=' + id);
  }

  makeOriginalCityName(id: number): Observable<OriginalCityName> {
    return this.http.get<OriginalCityName>('api/makeOriginalCityName?id=' + id);
  }

  findUnidentifiedCityNames(): Observable<string[]> {
    return this.http.get<string[]>('api/findUnidentifiedCityNames');
  }

  createNewOriginalCityName(unidentifiedCityName: String): Observable<OriginalCityName> {
    return this.http.get<OriginalCityName>('api/createNewOriginalCityName?title='+ unidentifiedCityName);
  }

  getUniqueOriginalCityNames() : Observable<OriginalCityName[]> {
    return this.http.get<OriginalCityName[]>('api/getUniqueOriginalCityNames');
  }





  getOriginalCityTypes(page: number, size: number): Observable<PageOriginalCityType> {
    return this.http.get<PageOriginalCityType>("api/getOriginalCityTypes?pageNumber=" + page + "&sizeNumber=" + size);
  }

  removeAlternativeCityType(id: number): Observable<void> {
    return this.http.get<void>("api/removeAlternativeCityType?id=" + id)
  }

  createNewAlternativeCityType(title: string, id: number): Observable<OriginalCityType> {
    return this.http.get<OriginalCityType>("api/createAlternativeCityType?title=" + title + "&originalCityTypeId=" + id)
  }

  createOriginalCityTypeFromAlternativeCityType(id: number): Observable<OriginalCityType> {
    return this.http.get<OriginalCityType>('api/createOriginalCityTypeFromAlternativeCityType?id=' + id);
  }

  removeOriginalCityType(id: number): Observable<void> {
    return this.http.get<void>('api/removeOriginalCityType?id=' + id);
  }

  makeOriginalCityType(id: number): Observable<OriginalCityType> {
    return this.http.get<OriginalCityType>('api/makeOriginalCityType?id=' + id);
  }

  findUnidentifiedCityTypes(): Observable<string[]> {
    return this.http.get<string[]>('api/findUnidentifiedCityTypes');
  }

  createNewOriginalCityType(unidentifiedCityType: String): Observable<OriginalCityType> {
    return this.http.get<OriginalCityType>('api/createNewOriginalCityType?title='+ unidentifiedCityType);
  }

  getUniqueOriginalCityTypes() : Observable<OriginalCityType[]> {
    return this.http.get<OriginalCityType[]>('api/getUniqueOriginalCityTypes');
  }


  getOriginalStreetNames(page: number, size: number): Observable<PageOriginalStreetName> {
    return this.http.get<PageOriginalStreetName>("api/getOriginalStreetNames?pageNumber=" + page + "&sizeNumber=" + size);
  }

  removeAlternativeStreetName(id: number): Observable<void> {
    return this.http.get<void>("api/removeAlternativeStreetName?id=" + id)
  }

  createNewAlternativeStreetName(title: string, id: number): Observable<OriginalStreetName> {
    return this.http.get<OriginalStreetName>("api/createAlternativeStreetName?title=" + title + "&originalStreetNameId=" + id)
  }

  createOriginalStreetNameFromAlternativeStreetName(id: number): Observable<OriginalStreetName> {
    return this.http.get<OriginalStreetName>('api/createOriginalStreetNameFromAlternativeStreetName?id=' + id);
  }

  removeOriginalStreetName(id: number): Observable<void> {
    return this.http.get<void>('api/removeOriginalStreetName?id=' + id);
  }

  makeOriginalStreetName(id: number): Observable<OriginalStreetName> {
    return this.http.get<OriginalStreetName>('api/makeOriginalStreetName?id=' + id);
  }

  findUnidentifiedStreetNames(): Observable<string[]> {
    return this.http.get<string[]>('api/findUnidentifiedStreetNames');
  }

  createNewOriginalStreetName(unidentifiedStreetName: String): Observable<OriginalStreetName> {
    return this.http.get<OriginalStreetName>('api/createNewOriginalStreetName?title='+ unidentifiedStreetName);
  }

  getUniqueOriginalStreetNames() : Observable<OriginalStreetName[]> {
    return this.http.get<OriginalStreetName[]>('api/getUniqueOriginalStreetNames');
  }








  getOriginalStreetTypes(page: number, size: number): Observable<PageOriginalStreetType> {
    return this.http.get<PageOriginalStreetType>("api/getOriginalStreetTypes?pageNumber=" + page + "&sizeNumber=" + size);
  }

  removeAlternativeStreetType(id: number): Observable<void> {
    return this.http.get<void>("api/removeAlternativeStreetType?id=" + id)
  }

  createNewAlternativeStreetType(title: string, id: number): Observable<OriginalStreetType> {
    return this.http.get<OriginalStreetType>("api/createAlternativeStreetType?title=" + title + "&originalStreetTypeId=" + id)
  }

  createOriginalStreetTypeFromAlternativeStreetType(id: number): Observable<OriginalStreetType> {
    return this.http.get<OriginalStreetType>('api/createOriginalStreetTypeFromAlternativeStreetType?id=' + id);
  }

  removeOriginalStreetType(id: number): Observable<void> {
    return this.http.get<void>('api/removeOriginalStreetType?id=' + id);
  }

  makeOriginalStreetType(id: number): Observable<OriginalStreetType> {
    return this.http.get<OriginalStreetType>('api/makeOriginalStreetType?id=' + id);
  }

  findUnidentifiedStreetTypes(): Observable<string[]> {
    return this.http.get<string[]>('api/findUnidentifiedStreetTypes');
  }

  createNewOriginalStreetType(unidentifiedStreetType: String): Observable<OriginalStreetType> {
    return this.http.get<OriginalStreetType>('api/createNewOriginalStreetType?title='+ unidentifiedStreetType);
  }

  getUniqueOriginalStreetTypes() : Observable<OriginalStreetType[]> {
    return this.http.get<OriginalStreetType[]>('api/getUniqueOriginalStreetTypes');
  }
}
