/** Represent an certain "Compétence" of an "Activité Pédagogique" */
export class Competence {
    competenceNumero: number;
    description: string;

    constructor(competenceNumero: number, description?: string) {
        this.competenceNumero = competenceNumero;
        this.description = description;
    }
}
