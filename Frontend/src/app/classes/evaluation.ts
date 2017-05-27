import { Note } from "app/classes/note";

/** Represent an "Evaluation" */
export class Evaluation {
    titre: string;
    notes: Note[];

    constructor(titre: string, notes: Note[]) {
        this.titre = titre;
        this.notes = notes;
    }
}
