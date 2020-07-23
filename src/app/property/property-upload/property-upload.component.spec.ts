import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyUploadComponent } from './property-upload.component';

describe('PropertyUploadComponent', () => {
  let component: PropertyUploadComponent;
  let fixture: ComponentFixture<PropertyUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
