import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdressViewerComponent } from './adress-viewer.component';

describe('AdressViewerComponent', () => {
  let component: AdressViewerComponent;
  let fixture: ComponentFixture<AdressViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdressViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdressViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
