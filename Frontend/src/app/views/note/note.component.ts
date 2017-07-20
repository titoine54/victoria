import { AfterViewChecked, Component } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { GlobalVariablesService } from "app/services/global-variables.service";
import { EvaluationNotesService } from "app/services/evaluation-notes.service";

@Component({
    selector: "app-note",
    templateUrl: './note.component.html',
    styleUrls: ['./note.component.scss']
})

export class NoteComponent implements AfterViewChecked {

    evaluationTitle: string;

    constructor(private global: GlobalVariablesService, private notesService: EvaluationNotesService, private route: ActivatedRoute)
    {}

    ngAfterViewChecked() {
        this.route.params.subscribe(params => this.evaluationTitle = params['evaluation']);
        var evaluation = this.notesService.getSelectedEvaluation(this.evaluationTitle);

        if (evaluation) {
            this.notesService.dismissAssociatedNotification(evaluation);
        }
    }

}
