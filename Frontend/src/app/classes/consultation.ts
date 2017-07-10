/**class of Consultation */
export class Consultation {
    aUneConsult: boolean;
    dateConsult: string;
    heureConsult: string;
    localConsult: string;

    constructor(aUneConsult: boolean, dateConsult: string, heureConsult: string, localConsult: string) {
        this.aUneConsult = aUneConsult;
        this.dateConsult = dateConsult;
        this.heureConsult = heureConsult;
        this.localConsult = localConsult;
    }
}