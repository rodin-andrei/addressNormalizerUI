import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CityDictionaryComponent} from './city-dictionary.component';

describe('CityDictionaryComponent', () => {
  let component: CityDictionaryComponent;
  let fixture: ComponentFixture<CityDictionaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CityDictionaryComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityDictionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
