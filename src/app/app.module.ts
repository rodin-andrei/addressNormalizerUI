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
import {CityNameDictionaryComponent} from './city-dictionary/city-name-dictionary.component';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {NzNoAnimationModule} from "ng-zorro-antd/core/no-animation";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzMessageModule} from "ng-zorro-antd/message";
import { AppRoutingModule } from './app-routing.module';
import { StreetNameDictionaryComponent } from './street-dictionary/street-name-dictionary.component';
import { CityTypeDictionaryComponent } from './city-type-dictionary/city-type-dictionary.component';
import { StreetTypeDictionaryComponent } from './street-type-dictionary/street-type-dictionary.component';
import {NzBadgeModule} from "ng-zorro-antd/badge";
import {NzPopoverModule} from "ng-zorro-antd/popover";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzAutocompleteModule} from "ng-zorro-antd/auto-complete";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzSpinModule} from "ng-zorro-antd/spin";

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    AdressViewerComponent,
    CityNameDictionaryComponent,
    StreetNameDictionaryComponent,
    CityTypeDictionaryComponent,
    StreetTypeDictionaryComponent,
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
        NzMessageModule,
        AppRoutingModule,
        NzBadgeModule,
        NzPopoverModule,
        NzInputModule,
        NzAutocompleteModule,
        NzButtonModule,
        NzSelectModule,
        NzSpinModule
    ],
  providers: [{provide: NZ_I18N, useValue: en_US}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
