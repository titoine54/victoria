import { Consultation } from "app/classes/consultation";
import { Competence } from "app/classes/competence";
import { Dict } from "app/classes/dict.interface";
import { Note } from "app/classes/note";
import { Ap } from "app/classes/ap";

/** Represent an "Evaluation" */
export class Evaluation {
    titre: string;
    associatedAps: Dict<Note[]>;
    estNouveau: boolean;
    estEnEquipe: boolean;
    consult: Consultation;

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


    constructor(titre: string, associatedAps: Dict<Note[]>, estNouveau?: boolean, estEnEquipe?: boolean, consult?: Consultation) {
        this.titre = titre;
        this.associatedAps = associatedAps;
        this.estNouveau = (estNouveau ? estNouveau : false)
        this.estEnEquipe = (estEnEquipe ? estEnEquipe : false)
        this.consult = (consult ? consult: { aUneConsult: true, dateConsult: "8 juillet", heureConsult: "12:30", localConsult:"C1-3024" })
    }
}
