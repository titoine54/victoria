/** Represent a "Note" */
export class Note {
    evaluationId: number;
    competenceNumero: number;
    note: number;
    ponderation: number;
    moyenne: number;
    ecartType: number;

    constructor(evaluationId: number, competenceNumero: number, note: number, ponderation: number, moyenne?: number, ecartType?: number) {
        this.evaluationId = evaluationId;
        this.competenceNumero = competenceNumero;
        this.note = note;
        this.ponderation = ponderation;
        //this.moyenne = moyenne;
        //this.ecartType = ecartType;
        this.moyenne = null;
        this.ecartType = null;
    }
}
