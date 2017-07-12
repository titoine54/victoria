/** Represent a "Note" */
export class Note {
    competenceNumero: number;
    note: number;
    ponderation: number;
    moyenne: number;
    ecartType: number;

    constructor(competenceNumero: number, note: number, ponderation: number, moyenne?: number, ecartType?: number) {
        this.competenceNumero = competenceNumero;
        this.note = note;
        this.ponderation = ponderation;
        //this.moyenne = moyenne;
        //this.ecartType = ecartType;
        this.moyenne = null;
        this.ecartType = null;
    }
}
