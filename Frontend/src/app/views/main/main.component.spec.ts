import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetenceTooltipInfoPipe } from "app/pipes/competence-tooltip-info/competence-tooltip-info.pipe";
import { GetCompetenceTotalPipe } from "app/pipes/get-competence-total/get-competence-total.pipe";
import { GlobalVariablesService } from "app/services/global-variables.service";
import { ApCompetencesComponent } from "app/components/ap-competences/ap-competences.component";
import { NoteModalComponent } from "app/components/note-modal/note-modal.component";
import { MaterializeModule } from "angular2-materialize";
import { KeysPipe } from "app/pipes/keys/keys.pipe";
import { MainComponent } from './main.component';
import { GetApStatsPipe } from "app/pipes/get-ap-stats/get-ap-stats.pipe";

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainComponent, ApCompetencesComponent, GetApStatsPipe, GetCompetenceTotalPipe, CompetenceTooltipInfoPipe, NoteModalComponent, KeysPipe],
      providers: [GlobalVariablesService],
      imports: [MaterializeModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
