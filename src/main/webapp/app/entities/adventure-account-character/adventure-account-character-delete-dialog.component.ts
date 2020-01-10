import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAdventureAccountCharacter } from 'app/shared/model/adventure-account-character.model';
import { AdventureAccountCharacterService } from './adventure-account-character.service';

@Component({
  templateUrl: './adventure-account-character-delete-dialog.component.html'
})
export class AdventureAccountCharacterDeleteDialogComponent {
  adventureAccountCharacter?: IAdventureAccountCharacter;

  constructor(
    protected adventureAccountCharacterService: AdventureAccountCharacterService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.adventureAccountCharacterService.delete(id).subscribe(() => {
      this.eventManager.broadcast('adventureAccountCharacterListModification');
      this.activeModal.close();
    });
  }
}
