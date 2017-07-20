import { Component, Input } from '@angular/core';
import { Evaluation } from "app/classes/evaluation";
import { Ap } from "app/classes/ap";
import { EvaluationNotesService } from "app/services/evaluation-notes.service";

@Component({
    selector: 'app-evaluation',
    templateUrl: './evaluation.component.html',
    styleUrls: ['./evaluation.component.scss']
})
export class EvaluationComponent {

    @Input() apCode: string;
    @Input() evaluation: Evaluation;

    constructor(public notesService: EvaluationNotesService) {}

}
