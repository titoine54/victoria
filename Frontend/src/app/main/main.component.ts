import { Component, OnInit, ViewChild } from '@angular/core';
import { Note } from "app/classes/note";
import { Ap } from "app/classes/ap";
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [ModalComponent]
})

export class MainComponent implements OnInit {

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

  notes: Note[] = [
    { ap_code: 'GEN 510', competence_numero: 1, titre: 'Rapport de l\'APP 1',         note: 35, ponderation: 40,  moyenne: 30, ecartType: 8 },
    { ap_code: 'GEN 510', competence_numero: 1, titre: 'Examen sommatif de l\'APP 1', note: 90, ponderation: 100, moyenne: 85, ecartType: 14 },
    { ap_code: 'GEN 510', competence_numero: 1, titre: 'Examen Final',                note: 85, ponderation: 100, moyenne: 82, ecartType: 16 },
    { ap_code: 'GEN 510', competence_numero: 2, titre: 'Rapport de l\'APP 1',         note: 35, ponderation: 40,  moyenne: 32, ecartType: 10 },
    { ap_code: 'GEN 510', competence_numero: 2, titre: 'Examen sommatif de l\'APP 1', note: 70, ponderation: 80,  moyenne: 68, ecartType: 22 },
    { ap_code: 'GEN 510', competence_numero: 2, titre: 'Rapport de l\'APP 2',         note: 12, ponderation: 20,  moyenne: 15, ecartType: 4 },
    { ap_code: 'GEN 510', competence_numero: 2, titre: 'Examen sommatif de l\'APP 2', note: 85, ponderation: 100, moyenne: 82, ecartType: 16 },
    { ap_code: 'GEN 510', competence_numero: 2, titre: 'Examen Final',                note: 60, ponderation: 60,  moyenne: 55, ecartType: 8 }
  ];
  
  constructor() { }

  @ViewChild(ModalComponent)
  private modal: ModalComponent;

  openModal() {
    this.modal.modalOpen();
  }

  ngOnInit() {
  }

}
