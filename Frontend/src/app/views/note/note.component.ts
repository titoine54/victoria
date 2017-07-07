import { Component, EventEmitter } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { MaterializeAction } from "angular2-materialize";
import { Ap } from "app/classes/ap";
import { Evaluation } from "app/classes/evaluation";
import { GlobalVariablesService } from "app/services/global-variables.service";
import { EvaluationNotesService } from "app/services/evaluation-notes.service";

@Component({
    selector: "app-note",
    templateUrl: './note.component.html',
    styleUrls: ['./note.component.scss']
})

export class NoteComponent {

    evaluationTitle: string;

    constructor(private global: GlobalVariablesService, private notesService: EvaluationNotesService, private route: ActivatedRoute, private router: Router) {
        this.route.params.subscribe(params => this.evaluationTitle = params['evaluation']);
    }

    getSelectedEvaluation() {
        if (this.global.evaluations) {
            var selectedEvaluation = this.global.evaluations.find(x => x.titre == this.evaluationTitle);

            if (!selectedEvaluation) {
                this.router.navigate(['/notes']);
            }

            return selectedEvaluation;
        }
        return null;
    }

}