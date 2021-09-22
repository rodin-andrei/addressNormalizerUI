import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityTypeDictionaryComponent } from './city-type-dictionary.component';

describe('CityTypeDictionaryComponent', () => {
  let component: CityTypeDictionaryComponent;
  let fixture: ComponentFixture<CityTypeDictionaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityTypeDictionaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityTypeDictionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
