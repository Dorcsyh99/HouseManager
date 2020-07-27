import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertViewComponent } from './expert-view.component';

describe('ExpertViewComponent', () => {
  let component: ExpertViewComponent;
  let fixture: ComponentFixture<ExpertViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpertViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
