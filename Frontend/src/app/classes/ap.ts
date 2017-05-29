import { Competence } from "app/classes/competence";

/** Represent an "Activité Pédagogique" */
export class Ap {
    apCode: string;
    titre: string;
    credit: number;
    description: string = null;
    competences: Competence[];

    constructor(apCode: string, titre: string, competences?: Competence[], description?: string, credit?: number) {
        this.apCode = apCode;
        this.titre = titre;
        this.credit = credit;
        this.description = description;
        this.competences = competences;
    }
}
