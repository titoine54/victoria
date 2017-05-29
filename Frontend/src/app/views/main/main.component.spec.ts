import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { GetApTotalPipe } from "app/pipes/get-ap-total/get-ap-total.pipe";
import { MaterializeModule } from "angular2-materialize";
import { NoteModalComponent } from "app/components/note-modal/note-modal.component";
import { GlobalVariablesService } from "app/services/global-variables/global-variables.service";
import { ApCompetencesComponent } from "app/components/ap-competences/ap-competences.component";
import { KeysPipe } from "app/pipes/keys/keys.pipe";

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainComponent, ApCompetencesComponent, GetApTotalPipe, NoteModalComponent, KeysPipe ],
      providers: [ GlobalVariablesService ],
      imports: [ MaterializeModule ]
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
