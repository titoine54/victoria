import { Component, OnInit, ViewChild } from '@angular/core';
import { Evaluation } from "app/classes/evaluation";
import { Ap } from "app/classes/ap";
import { NoteModalComponent } from "app/note-modal/note-modal.component";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})

export class MainComponent implements OnInit {

  @ViewChild(NoteModalComponent)
  private noteModal: NoteModalComponent;

  constructor() { }

  apList: Ap[] = [
    { ap_code: 'GEN 501', titre: 'Droit', description: null, credit: 2, competences: [] },
    { ap_code: 'GEN 500', titre: 'Conception d\'un système embarqué et réseauté', description: null, credit: 3, competences: [] },
    {
      ap_code: 'GEN 510', titre: 'Systèmes à microprocesseurs', credit: 2, description: 'Exploiter une carte comportant un microcontrôleur et des circuits d\'entrée/sortie en utilisant la documentation technique des composants et des logiciels qui la constituent; développer et mettre au point un logiciel sur un système embarqué en utilisant des outils de développement croisés.',
      competences: [
        { competence_numero: 1, description: 'Exploiter une carte comportant un microcontrôleur et des circuits d\'entrée-sortie en utilisant la documentation technique des composants et des logiciels qui la constituent.' },
        { competence_numero: 2, description: 'Développer et mettre au point un logiciel sur un système embarqué en utilisant des outils de développement croisés.' }
      ]
    },
    { ap_code: 'GEN 521', titre: 'Propriétés des matériaux', description: null, credit: 2, competences: [] },
    { ap_code: 'GEN 530', titre: 'Circuits d\'entrées/sorties et d\'interfaces', description: null, credit: 1, competences: [] },
    { ap_code: 'GEN 540', titre: 'Noyaux temps réel et programmation concurrente', description: null, credit: 2, competences: [] },
    { ap_code: 'GEN 550', titre: 'Systèmes embarqués réseautés', description: null, credit: 1, competences: [] },
    { ap_code: 'GEN 560', titre: 'Statistiques et fiabilité des systèmes', description: null, credit: 2, competences: [] }
  ];

  evaluations: Evaluation[] = [
    {
      titre: 'Rapport de l\'APP 1', evaluationNotes: [
        {
          ap_code: 'GEN 510', apNotes: [
            { competence_numero: 1, note: 35, ponderation: 40, moyenne: 30, ecartType: 8 },
            { competence_numero: 2, note: 35, ponderation: 40, moyenne: 32, ecartType: 10 }
          ]
        }
      ]
    },
    {
      titre: 'Rapport de l\'APP 2', evaluationNotes: [
        {
          ap_code: 'GEN 510', apNotes: [
            { competence_numero: 1, note: 35, ponderation: 40, moyenne: 30, ecartType: 8 },
          ]
        },
        {
          ap_code: 'GEN 530', apNotes: [
            { competence_numero: 1, note: 35, ponderation: 40, moyenne: 30, ecartType: 8 },
          ]
        }
      ]
    },
    {
      titre: 'Examen final', evaluationNotes: [
        {
          ap_code: 'GEN 510', apNotes: [
            { competence_numero: 1, note: 35, ponderation: 40, moyenne: 30, ecartType: 8 },
          ]
        }
      ]
    }
  ];

  ngOnInit() {
  }

}
