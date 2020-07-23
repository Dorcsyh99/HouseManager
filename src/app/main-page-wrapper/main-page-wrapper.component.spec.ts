import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageWrapperComponent } from './main-page-wrapper.component';

describe('MainPageWrapperComponent', () => {
  let component: MainPageWrapperComponent;
  let fixture: ComponentFixture<MainPageWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPageWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
