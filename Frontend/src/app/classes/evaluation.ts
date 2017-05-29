import { Competence } from "app/classes/competence";
import { Ap } from "app/classes/ap";
import { Note } from "app/classes/note";

/** Map interface of a dict */
interface Map<T> {
    [K: string]: T;
}

/** Represent an "Evaluation" */
export class Evaluation {
    titre: string;
    associatedAps: Map<Note[]>;

    /** Search for a note associated with a certain Ap and Compentence
     * @param {string} apCode The code of the "Activité Pédagogique"
     * @param {number} competenceNumero The number of the Competence
     * @return {Note} The associated note
     */
    getNote(apCode: string, competenceNumero: number) {
        var apNotes: Note[] = this.associatedAps[apCode];
        if (apNotes == undefined) { return null; }
        for (let note of apNotes) {
            if (note.competenceNumero == competenceNumero) {
                return note;
            }
        }
        return null;
    }

    constructor(titre: string, associatedAps: Map<Note[]>) {
        this.titre = titre;
        this.associatedAps = associatedAps;
    }
}
