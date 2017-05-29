/** Represent a "Note" */
export class Note {
    competence_numero: number;
    note: number;
    ponderation: number;
    moyenne: number;
    ecartType: number;

    constructor(competence_numero: number, note: number, ponderation: number, moyenne?: number, ecartType?: number) {
        this.competence_numero = competence_numero;
        this.note = note;
        this.ponderation = ponderation;
        this.moyenne = moyenne;
        this.ecartType = ecartType;
    }
}
