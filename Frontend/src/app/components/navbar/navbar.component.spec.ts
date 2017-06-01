import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { SettingsModalComponent } from "app/components/settings-modal/settings-modal.component";
import { RouterTestingModule } from '@angular/router/testing';
import { GlobalVariablesService } from "app/services/global-variables.service";

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent, SettingsModalComponent],
      imports: [RouterTestingModule],
      providers: [GlobalVariablesService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
