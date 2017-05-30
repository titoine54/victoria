import { Ap } from "app/classes/ap";

export const MockApList: Ap[] = [
    { apCode: 'GEN 501', titre: 'Droit', description: null, credit: 2, competences: [] },
    { apCode: 'GEN 500', titre: 'Conception d\'un système embarqué et réseauté', description: null, credit: 3, competences: [] },
    {
        apCode: 'GEN 510', titre: 'Systèmes à microprocesseurs', credit: 2, description: 'Exploiter une carte comportant un microcontrôleur et des circuits d\'entrée/sortie en utilisant la documentation technique des composants et des logiciels qui la constituent; développer et mettre au point un logiciel sur un système embarqué en utilisant des outils de développement croisés.',
        competences: [
            { competenceNumero: 1, description: 'Exploiter une carte comportant un microcontrôleur et des circuits d\'entrée-sortie en utilisant la documentation technique des composants et des logiciels qui la constituent.' },
            { competenceNumero: 2, description: 'Développer et mettre au point un logiciel sur un système embarqué en utilisant des outils de développement croisés.' }
        ]
    },
    { apCode: 'GEN 521', titre: 'Propriétés des matériaux', description: null, credit: 2, competences: [] },
    { apCode: 'GEN 530', titre: 'Circuits d\'entrées/sorties et d\'interfaces', description: null, credit: 1, competences: [] },
    { apCode: 'GEN 540', titre: 'Noyaux temps réel et programmation concurrente', description: null, credit: 2, competences: [] },
    { apCode: 'GEN 550', titre: 'Systèmes embarqués réseautés', description: null, credit: 1, competences: [] },
    { apCode: 'GEN 560', titre: 'Statistiques et fiabilité des systèmes', description: null, credit: 2, competences: [] }
];