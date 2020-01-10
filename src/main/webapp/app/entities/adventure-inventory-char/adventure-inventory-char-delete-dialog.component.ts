import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAdventureInventoryChar } from 'app/shared/model/adventure-inventory-char.model';
import { AdventureInventoryCharService } from './adventure-inventory-char.service';

@Component({
  templateUrl: './adventure-inventory-char-delete-dialog.component.html'
})
export class AdventureInventoryCharDeleteDialogComponent {
  adventureInventoryChar?: IAdventureInventoryChar;

  constructor(
    protected adventureInventoryCharService: AdventureInventoryCharService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.adventureInventoryCharService.delete(id).subscribe(() => {
      this.eventManager.broadcast('adventureInventoryCharListModification');
      this.activeModal.close();
    });
  }
}
