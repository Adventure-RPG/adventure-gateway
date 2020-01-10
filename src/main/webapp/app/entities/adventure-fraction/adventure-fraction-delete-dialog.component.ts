import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAdventureFraction } from 'app/shared/model/adventure-fraction.model';
import { AdventureFractionService } from './adventure-fraction.service';

@Component({
  templateUrl: './adventure-fraction-delete-dialog.component.html'
})
export class AdventureFractionDeleteDialogComponent {
  adventureFraction?: IAdventureFraction;

  constructor(
    protected adventureFractionService: AdventureFractionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.adventureFractionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('adventureFractionListModification');
      this.activeModal.close();
    });
  }
}
