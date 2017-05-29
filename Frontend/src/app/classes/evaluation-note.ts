import { Note } from "app/classes/note";

/** Represent a note for an "Activité Pédagogique" */
export class EvaluationNote {
    ap_code: string;
    apNotes: Note[];

    constructor(ap_code: string, apNotes: Note[]) {
        this.ap_code = ap_code;
        this.apNotes = apNotes;
    }
}
