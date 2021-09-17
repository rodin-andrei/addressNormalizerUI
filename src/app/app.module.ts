import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {en_US, NZ_I18N} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzAlertModule} from "ng-zorro-antd/alert";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {AdressViewerComponent} from './adress-viewer/adress-viewer.component';
import {CityDictionaryComponent} from './city-dictionary/city-dictionary.component';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {NzNoAnimationModule} from "ng-zorro-antd/core/no-animation";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzMessageModule} from "ng-zorro-antd/message";

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    AdressViewerComponent,
    CityDictionaryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzTableModule,
    NzDividerModule,
    NzAlertModule,
    NzTagModule,
    NzMenuModule,
    NzNoAnimationModule,
    NzIconModule,
    NzDropDownModule,
    NzModalModule,
    NzMessageModule
  ],
  providers: [{provide: NZ_I18N, useValue: en_US}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
