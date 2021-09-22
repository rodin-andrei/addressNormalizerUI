import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CityNameDictionaryComponent} from './city-name-dictionary.component';

describe('CityDictionaryComponent', () => {
  let component: CityNameDictionaryComponent;
  let fixture: ComponentFixture<CityNameDictionaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CityNameDictionaryComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityNameDictionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
