import { Component } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { GlobalVariablesService } from "app/services/global-variables.service";
import { EvaluationNotesService } from "app/services/evaluation-notes.service";

@Component({
    selector: "app-note",
    templateUrl: './note.component.html',
    styleUrls: ['./note.component.scss']
})

export class NoteComponent {

    evaluationTitle: string;

    constructor(public global: GlobalVariablesService, public notesService: EvaluationNotesService, private route: ActivatedRoute) {
        this.route.params.subscribe(params => this.evaluationTitle = params['evaluation']);
    }

}
