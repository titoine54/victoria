/** Represent a "nouvelle" */
export class Nouvelle {
    notificationId : number;
    evaluationId : number;
    nomEvaluation: string;
    description: string;

    constructor(notificationId : number, evaluationId : number, nomEvaluation: string, description: string) {
        this.notificationId = notificationId;
        this.evaluationId = evaluationId;
        this.nomEvaluation = nomEvaluation;
        this.description = description;
    }
}
