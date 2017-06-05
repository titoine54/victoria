import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from "app/components/navbar/navbar.component";
import { GlobalVariablesService } from "app/services/global-variables.service";
import { SettingsModalComponent } from "app/components/settings-modal/settings-modal.component";
import { MaterializeModule } from "angular2-materialize";
import { FormsModule } from '@angular/forms';
import { ApiService } from "app/services/api.service";
import { HttpModule } from '@angular/http';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavbarComponent,
        SettingsModalComponent
      ],
      imports: [RouterTestingModule, MaterializeModule, FormsModule, HttpModule],
      providers: [GlobalVariablesService, ApiService]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  // it(`should have as title 'app works!'`, async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('app works!');
  // }));

  it('should render footer with copyrights', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('footer').textContent).toContain('©');
  }));
});
