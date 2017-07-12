import { Evaluation } from "app/classes/evaluation";

export const MockEvaluations: any = [
    {
        "evaluationId": 123, "nom": "Rapport APP1", "individuel": true, "estNouveau": false,
        "activites": {
            "GIF500": [{ "competenceNumero": 1, "note": 35, "ponderation": 40 }],
            "GIF510": [{ "competenceNumero": 1, "note": null, "ponderation": 100 }, { "competenceNumero": 2, "note": 56, "ponderation": 70 }]
        }
    },
    {
        "evaluationId": 456, "nom": "Examen Sommatif APP1", "individuel": true, "estNouveau": true,
        "activites": {
            "GIF520": [{ "competenceNumero": 1, "note": null, "ponderation": 40 }, { "competenceNumero": 2, "note": null, "ponderation": 50 }]
        }
    },
    {
        "evaluationId": 321, "nom": "Rapport APP2", "individuel": false, "estNouveau": true,
        "activites": {
            "GIF520": [{ "competenceNumero": 1, "note": null, "ponderation": 40 }, { "competenceNumero": 2, "note": null, "ponderation": 50 }],
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

const MockEvaluations_old: Evaluation[] = [
    new Evaluation('Rapport de l\'APP 1', {
        'GEN 510': [
            { evaluationId: 1, competenceNumero: 1, note: 35, ponderation: 40, moyenne: 30, ecartType: 8 },
            { evaluationId: 2, competenceNumero: 1, note: null, ponderation: 40, moyenne: null, ecartType: null },
            { evaluationId: 3, competenceNumero: 2, note: 35, ponderation: 40, moyenne: 32, ecartType: 10 }
        ]
    }, true,
    ),
    new Evaluation('Examen Sommatif', {
        'GEN 510': [{ evaluationId: 4, competenceNumero: 1, note: 50, ponderation: 70, moyenne: 30, ecartType: 8 }]
    }, true, true

    ),
    new Evaluation('Rapport de l\'APP 2', {
        'GEN 510': [{ evaluationId: 5, competenceNumero: 1, note: null, ponderation: 40, moyenne: 30, ecartType: 8 }],
        'GEN 530': [{ evaluationId: 6, competenceNumero: 1, note: null, ponderation: 40, moyenne: 30, ecartType: 8 }]

    }, false, true
    ),
    new Evaluation('Oral projet', {
        'GEN 550': [{ evaluationId: 7, competenceNumero: 1, note: 110, ponderation: 125, moyenne: 30, ecartType: 8 }]
    }, false, false
    )
];