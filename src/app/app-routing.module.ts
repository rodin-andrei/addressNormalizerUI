import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdressViewerComponent} from "./adress-viewer/adress-viewer.component";
import {CityNameDictionaryComponent} from "./city-dictionary/city-name-dictionary.component";
import {StreetNameDictionaryComponent} from "./street-dictionary/street-name-dictionary.component";
import {CityTypeDictionaryComponent} from "./city-type-dictionary/city-type-dictionary.component";
import {StreetTypeDictionaryComponent} from "./street-type-dictionary/street-type-dictionary.component";


const routes: Routes = [
  { path: 'addressViewer', component: AdressViewerComponent },
  { path: '', component: AdressViewerComponent },
  { path: 'cityNameDictionary', component: CityNameDictionaryComponent },
  { path: 'cityTypeDictionary', component: CityTypeDictionaryComponent },
  { path: 'streetTypeDictionary', component: StreetTypeDictionaryComponent },
  { path: 'streetNameDictionary', component: StreetNameDictionaryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
