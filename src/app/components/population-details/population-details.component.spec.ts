import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopulationDetailsComponent } from './population-details.component';

describe('PopulationDetailsComponent', () => {
  let component: PopulationDetailsComponent;
  let fixture: ComponentFixture<PopulationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopulationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopulationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
