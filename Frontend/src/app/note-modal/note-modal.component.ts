import { Component, OnInit, Input, EventEmitter } from "@angular/core"
import { MaterializeAction } from "angular2-materialize";

@Component({
    selector: "app-modal",
    templateUrl: './note-modal.component.html',
    styleUrls: ['./note-modal.component.css'],
})

export class NoteModalComponent implements OnInit {

    modalActions = new EventEmitter<string | MaterializeAction>();

    show() {
        this.modalActions.emit({ action: "modal", params: ['open'] });
    }

    hide() {
        this.modalActions.emit({ action: "modal", params: ['close'] });
    }

    ngOnInit() {
    }

}