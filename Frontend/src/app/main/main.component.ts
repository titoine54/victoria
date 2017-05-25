import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  apList: any[] = [
    { code: 'GEN 501', titre: 'Droit', credit: 2 },
    { code: 'GEN 500', titre: 'Conception d\'un système embarqué et réseauté', credit: 3 },
    {
      code: 'GEN 510', titre: 'Systèmes à microprocesseurs', credit: 2, description: 'Exploiter une carte comportant un microcontrôleur et des circuits d\'entrée/sortie en utilisant la documentation technique des composants et des logiciels qui la constituent; développer et mettre au point un logiciel sur un système embarqué en utilisant des outils de développement croisés.',
      competences: [
        { numero: 1, description: 'Exploiter une carte comportant un microcontrôleur et des circuits d\'entrée-sortie en utilisant la documentation technique des composants et des logiciels qui la constituent.' },
        { numero: 2, description: 'Développer et mettre au point un logiciel sur un système embarqué en utilisant des outils de développement croisés.' }
      ]
    },
    { code: 'GEN 521', titre: 'Propriétés des matériaux', credit: 2 },
    { code: 'GEN 530', titre: 'Circuits d\'entrées/sorties et d\'interfaces', credit: 1 },
    { code: 'GEN 540', titre: 'Noyaux temps réel et programmation concurrente', credit: 2 },
    { code: 'GEN 550', titre: 'Systèmes embarqués réseautés', credit: 1 },
    { code: 'GEN 560', titre: 'Statistiques et fiabilité des systèmes', credit: 2 }
  ];

  notes: any[] = [
    { ap: 'GEN 510', competence: 1, titre: 'Rapport de l\'APP 1', note: 35, ponderation: 40, moyenne: 30, ecartType: 8 },
    { ap: 'GEN 510', competence: 1, titre: 'Examen sommatif de l\'APP 1', note: 90, ponderation: 100, moyenne: 85, ecartType: 14 },
    { ap: 'GEN 510', competence: 1, titre: 'Examen Final', note: 85, ponderation: 100, moyenne: 82, ecartType: 16 },
    { ap: 'GEN 510', competence: 2, titre: 'Rapport de l\'APP 1', note: 35, ponderation: 40, moyenne: 32, ecartType: 10 },
    { ap: 'GEN 510', competence: 2, titre: 'Examen sommatif de l\'APP 1', note: 70, ponderation: 80, moyenne: 68, ecartType: 22 },
    { ap: 'GEN 510', competence: 2, titre: 'Rapport de l\'APP 2', note: 12, ponderation: 20, moyenne: 15, ecartType: 4 },
    { ap: 'GEN 510', competence: 2, titre: 'Examen sommatif de l\'APP 2', note: 85, ponderation: 100, moyenne: 82, ecartType: 16 },
    { ap: 'GEN 510', competence: 2, titre: 'Examen Final', note: 60, ponderation: 60, moyenne: 55, ecartType: 8 }
  ];
  
  constructor() { }

  ngOnInit() {
  }

}
