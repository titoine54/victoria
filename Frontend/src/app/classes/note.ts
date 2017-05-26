/** Represent a "Note" */
export class Note {
    ap_code: string;
    competence_numero: number;
    titre: string;
    note: number;
    ponderation: number;
    moyenne: number;
    ecartType: number;

    constructor(ap_code: string, competence_numero: number, note: number, ponderation: number, titre?: string, moyenne?: number, ecartType?: number) {
        this.ap_code = ap_code;
        this.competence_numero = competence_numero;
        this.note = note;
        this.ponderation = ponderation;
        this.titre = titre;
        this.moyenne = moyenne;
        this.ecartType = ecartType;
    }
}
