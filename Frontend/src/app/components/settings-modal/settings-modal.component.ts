import { Component, EventEmitter, Input, OnInit } from "@angular/core"
import { MaterializeAction } from "angular2-materialize";
import { GlobalVariablesService } from "app/services/global-variables.service";
import { UserSettings } from "app/classes/user-settings";
import { ApiService } from 'app/services/api.service';

@Component({
    selector: "app-settings-modal",
    templateUrl: './settings-modal.component.html',
    styleUrls: ['./settings-modal.component.css'],
    providers: [ApiService],
})

export class SettingsModalComponent implements OnInit {

    @Input() userSettings: UserSettings;
    actions = new EventEmitter<string | MaterializeAction>();

    constructor(private apiService: ApiService, private global: GlobalVariablesService) { }

    ngOnInit() {
        // TODO: Get user settings
        this.userSettings = new UserSettings();
    }

    /** Closes the user settings modal and discards any changes */
    hide() {
        this.actions.emit({ action: "modal", params: ['close'] });
    }

    /** Closes the user settings modal and saves any changes */
    saveUserSettings() {
        console.log(this.userSettings);
        this.apiService.saveUserSettings(this.userSettings);
        this.actions.emit({ action: "modal", params: ['close'] });
    }

    /** Opens the user settings modal */
    show() {
        this.actions.emit({ action: "modal", params: ['open'] });
    }

}