import { Ap } from "app/classes/ap";

export const MockApList: any = [
    {
        "apCode": "GIF501", "titre": "Droit", "credit": 2, "description": "Devenir un maître juridique et dominer le monde",
        "competences": []
    },
    {
        "apCode": "GIF500", "titre": "Conception d\'un système embarqué et réseauté", "credit": 3, "description": null,
        "competences": [
            { "competenceNumero": 1, "description": "Faire un réseau" },
            { "competenceNumero": 2, "description": "Embarquer sur un système" }
        ]
    },
    {
        "apCode": "GIF510", "titre": "Systèmes à microprocesseurs", "credit": 2, "description": "Exploiter une carte comportant un microcontrôleur et des circuits d\'entrée/sortie en utilisant la documentation technique des composants et des logiciels qui la constituent; développer et mettre au point un logiciel sur un système embarqué en utilisant des outils de développement croisés.",
        "competences": [
            { "competenceNumero": 1, "description": "Exploiter une carte comportant un microcontrôleur et des circuits d\'entrée-sortie en utilisant la documentation technique des composants et des logiciels qui la constituent." },
            { "competenceNumero": 2, "description": "Développer et mettre au point un logiciel sur un système embarqué en utilisant des outils de développement croisés." }
        ]
    },
    {
        "apCode": "GIF520", "titre": "Propriétés des matériaux", "credit": 2, "description": null,
        "competences": [
            { "competenceNumero": 1, "description": "Savoir si un matériel est mou" },
            { "competenceNumero": 2, "description": "Appliquer la règle du pouce" },
            { "competenceNumero": 2, "description": "Calculer des calculs de manière scientifique" }
        ]
    },
    {
        "apCode": "GIF530", "titre": "Circuits d'entrées/sorties et d'interfaces", "credit": 1, "description": null,
        "competences": [
            { "competenceNumero": 1, "description": "Circuits d'entrées" },
            { "competenceNumero": 2, "description": "Circuits de sorties" },
        ]
    },
    {
        "apCode": "GIF540", "titre": "Noyaux temps réel et programmation concurrente", "credit": 1, "description": null,
        "competences": [
            { "competenceNumero": 1, "description": "Faire de la propagande en temps réel dans un système donné" },
        ]
    },
    {
        "apCode": "GIF550", "titre": "Systèmes embarqués réseautés", "credit": 1, "description": null,
        "competences": []
    },
    {
        "apCode": "GIF560", "titre": "Statistiques et fiabilité des systèmes", "credit": 2, "description": null,
        "competences": [
            { "competenceNumero": 1, "description": "Loi normal" },
            { "competenceNumero": 2, "description": "Rendre un système fiable" }
        ]
    }
];