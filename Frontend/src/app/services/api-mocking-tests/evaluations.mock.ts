import { Evaluation } from "app/classes/evaluation";

export const MockEvaluations: Evaluation[] = [
    new Evaluation('Rapport de l\'APP 1', {
        'GEN 510': [
            { evaluationId: 1, competenceNumero: 1, note: 35, ponderation: 40, moyenne: 30, ecartType: 8 },
            { evaluationId: 2, competenceNumero: 1, note: null, ponderation: 40, moyenne: null, ecartType: null },
            { evaluationId: 3,competenceNumero: 2, note: 35, ponderation: 40, moyenne: 32, ecartType: 10 }
        ]
    }, true, 
    ),
    new Evaluation('Examen Sommatif', {
        'GEN 510': [{evaluationId: 4, competenceNumero: 1, note: 50, ponderation: 70, moyenne: 30, ecartType: 8 }]
    }, true, true

    ),
    new Evaluation('Rapport de l\'APP 2', {
        'GEN 510': [{evaluationId: 5, competenceNumero: 1, note: null, ponderation: 40, moyenne: 30, ecartType: 8 }],
        'GEN 530': [{evaluationId: 6, competenceNumero: 1, note: null, ponderation: 40, moyenne: 30, ecartType: 8 }]

    }, false, true
    ),
    new Evaluation('Oral projet', {
        'GEN 550': [{evaluationId: 7, competenceNumero: 1, note: 110, ponderation: 125, moyenne: 30, ecartType: 8 }]
    }, false, false
    )
];