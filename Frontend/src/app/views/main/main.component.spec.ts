import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetenceTooltipInfoPipe } from "app/pipes/competence-tooltip-info/competence-tooltip-info.pipe";
import { GetCompetenceTotalPipe } from "app/pipes/get-competence-total/get-competence-total.pipe";
import { GlobalVariablesService } from "app/services/global-variables.service";
import { ApCompetencesComponent } from "app/components/ap-competences/ap-competences.component";
import { NoteModalComponent } from "app/components/note-modal/note-modal.component";
import { MaterializeModule } from "angular2-materialize";
import { KeysPipe } from "app/pipes/keys/keys.pipe";
import { MainComponent } from './main.component';
import { HasNewEvaluationPipe } from "app/pipes/has-new-evaluation/has-new-evaluation.pipe";
import { LoadingComponent } from "app/components/loading/loading.component";
import { WithApStatsPipe } from "app/pipes/with-ap-stats/with-ap-stats.pipe";
import { FilterApsPipe } from "app/pipes/filter-aps/filter-aps.pipe";
import { FormsModule } from '@angular/forms';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainComponent, ApCompetencesComponent, HasNewEvaluationPipe, WithApStatsPipe, FilterApsPipe, GetCompetenceTotalPipe, CompetenceTooltipInfoPipe, NoteModalComponent, KeysPipe, LoadingComponent],
      providers: [GlobalVariablesService],
      imports: [MaterializeModule, FormsModule]
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
