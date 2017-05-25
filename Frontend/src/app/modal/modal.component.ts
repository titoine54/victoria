import { Component, OnInit, Input, EventEmitter } from "@angular/core"
import { MaterializeAction } from "angular2-materialize";

@Component({
    moduleId: module.id,
    selector: "app-modal",
    templateUrl: './modal.component.html',
    styleUrls: [ './modal.component.css' ],
})

export class ModalComponent implements OnInit {

    modalActions = new EventEmitter<string | MaterializeAction>();

    modalOpen() {
        this.modalActions.emit({ action: "modal", params: ['open'] });
    }

    modalClose() {
        this.modalActions.emit({ action: "modal", params: ['close'] });
    }

    ngOnInit() {
    }

}