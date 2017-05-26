import { Competence } from "app/classes/competence";

/** Represent an "Activité Pédagogique" */
export class Ap {
    ap_code: string;
    titre: string;
    credit: number;
    description: string = null;
    competences: Competence[];

    constructor(ap_code: string, titre: string, competences?: Competence[], description?: string, credit?: number) {
        this.ap_code = ap_code;
        this.titre = titre;
        this.credit = credit;
        this.description = description;
        this.competences = competences;
    }
}
