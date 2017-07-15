import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { MaterializeModule } from "angular2-materialize";

import { GlobalVariablesService } from "app/services/global-variables.service";
import { EvaluationNotesService } from "app/services/evaluation-notes.service";
import { EvaluationComponent } from "app/components/evaluation/evaluation.component";
import { NoteComponent } from './note.component';
import { LoadingComponent } from "app/components/loading/loading.component";
import { KeysPipe } from "app/pipes/keys/keys.pipe";

describe('NoteComponent', () => {
  let component: NoteComponent;
  let fixture: ComponentFixture<NoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NoteComponent, EvaluationComponent, LoadingComponent, KeysPipe],
      providers: [GlobalVariablesService, EvaluationNotesService],
      imports: [MaterializeModule, FormsModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
