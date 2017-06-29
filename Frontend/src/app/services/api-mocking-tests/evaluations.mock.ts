import { Evaluation } from "app/classes/evaluation";

export const MockEvaluations: Evaluation[] = [
    new Evaluation('Rapport de l\'APP 1', {
        'GEN 510': [
            { competenceNumero: 1, note: 35, ponderation: 40, moyenne: 30, ecartType: 8 },
            { competenceNumero: 1, note: null, ponderation: 40, moyenne: null, ecartType: null },
            { competenceNumero: 2, note: 35, ponderation: 40, moyenne: 32, ecartType: 10 }
        ]
    }, true
    ),
    new Evaluation('Rapport de l\'APP 2', {
        'GEN 510': [{ competenceNumero: 1, note: 35, ponderation: 40, moyenne: 30, ecartType: 8 }],
        'GEN 530': [{ competenceNumero: 1, note: 35, ponderation: 40, moyenne: 30, ecartType: 8 }]
    }, false
    ),
    new Evaluation('Examen final', {
        'GEN 510': [{ competenceNumero: 1, note: 35, ponderation: 40, moyenne: 30, ecartType: 8 }]
    }, false
    )
];