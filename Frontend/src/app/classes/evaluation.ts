import { EvaluationNote } from "app/classes/evaluation-note";

/** Represent an "Evaluation" */
export class Evaluation {
    titre: string;
    evaluationNotes: EvaluationNote[];

    constructor(titre: string, evaluationNotes: EvaluationNote[]) {
        this.titre = titre;
        this.evaluationNotes = evaluationNotes;
    }
}
