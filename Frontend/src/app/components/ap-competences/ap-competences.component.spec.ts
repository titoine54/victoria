import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApCompetencesComponent } from './ap-competences.component';

describe('ApCompetencesComponent', () => {
  let component: ApCompetencesComponent;
  let fixture: ComponentFixture<ApCompetencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApCompetencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApCompetencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
