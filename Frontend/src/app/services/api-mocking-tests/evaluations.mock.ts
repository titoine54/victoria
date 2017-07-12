import { Evaluation } from "app/classes/evaluation";

export const MockEvaluations: any = [
    {
        "evaluationId": 123, "nom": "Rapport APP1", "individuel": true, "estNouveau": false,
        "activites": {
            "GIF500": [{ "competenceNumero": 1, "note": 35, "ponderation": 40 }],
            "GIF510": [{ "competenceNumero": 1, "note": 80, "ponderation": 100 }, { "competenceNumero": 2, "note": 56, "ponderation": 70 }]
        }
    },
    {
        "evaluationId": 456, "nom": "Examen Sommatif APP1", "individuel": true, "estNouveau": false,
        "activites": {
            "GIF500": [{ "competenceNumero": 1, "note": null, "ponderation": 20 }],
            "GIF520": [{ "competenceNumero": 1, "note": null, "ponderation": 40 }, { "competenceNumero": 2, "note": null, "ponderation": 50 }]
        }
    },
    {
        "evaluationId": 321, "nom": "Rapport APP2", "individuel": true, "estNouveau": true,
        "activites": {
            "GIF520": [{ "competenceNumero": 1, "note": 34, "ponderation": 40 }, { "competenceNumero": 2, "note": 47, "ponderation": 50 }],
            "GIF540": [{ "competenceNumero": 1, "note": 64, "ponderation": 70 }]
        }
    },
    {
        "evaluationId": 654, "nom": "Oral - Projet", "individuel": false, "estNouveau": true,
        "activites": {
            "GIF560": [{ "competenceNumero": 1, "note": 22, "ponderation": 40 }, { "competenceNumero": 2, "note": 63, "ponderation": 70 }]
        }
    }
];