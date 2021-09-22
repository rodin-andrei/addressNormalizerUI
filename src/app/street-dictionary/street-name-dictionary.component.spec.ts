import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreetNameDictionaryComponent } from './street-name-dictionary.component';

describe('StreetDictionaryComponent', () => {
  let component: StreetNameDictionaryComponent;
  let fixture: ComponentFixture<StreetNameDictionaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreetNameDictionaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreetNameDictionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
