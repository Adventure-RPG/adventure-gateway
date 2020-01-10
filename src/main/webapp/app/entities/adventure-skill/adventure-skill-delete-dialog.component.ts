import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAdventureSkill } from 'app/shared/model/adventure-skill.model';
import { AdventureSkillService } from './adventure-skill.service';

@Component({
  templateUrl: './adventure-skill-delete-dialog.component.html'
})
export class AdventureSkillDeleteDialogComponent {
  adventureSkill?: IAdventureSkill;

  constructor(
    protected adventureSkillService: AdventureSkillService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.adventureSkillService.delete(id).subscribe(() => {
      this.eventManager.broadcast('adventureSkillListModification');
      this.activeModal.close();
    });
  }
}
