import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { GetApTotalPipe } from "app/pipes/get-ap-total/get-ap-total.pipe";
import { NoteModalComponent } from "app/note-modal/note-modal.component";
import { MaterializeModule } from "angular2-materialize";

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainComponent, GetApTotalPipe, NoteModalComponent ],
      providers: [ NoteModalComponent ],
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
