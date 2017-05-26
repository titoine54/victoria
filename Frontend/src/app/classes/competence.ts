/** Represent an certain "Compétence" of an "Activité Pédagogique" */
export class Competence {
    competence_numero: number;
    description: string;

    constructor(competence_numero: number, description?: string) {
        this.competence_numero = competence_numero;
        this.description = description;
    }
}
