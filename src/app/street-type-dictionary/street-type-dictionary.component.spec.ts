import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreetTypeDictionaryComponent } from './street-type-dictionary.component';

describe('StreetTypeDictionaryComponent', () => {
  let component: StreetTypeDictionaryComponent;
  let fixture: ComponentFixture<StreetTypeDictionaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreetTypeDictionaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreetTypeDictionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
