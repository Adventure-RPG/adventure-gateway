import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAdventureAttributes } from 'app/shared/model/adventure-attributes.model';
import { AdventureAttributesService } from './adventure-attributes.service';

@Component({
  templateUrl: './adventure-attributes-delete-dialog.component.html'
})
export class AdventureAttributesDeleteDialogComponent {
  adventureAttributes?: IAdventureAttributes;

  constructor(
    protected adventureAttributesService: AdventureAttributesService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.adventureAttributesService.delete(id).subscribe(() => {
      this.eventManager.broadcast('adventureAttributesListModification');
      this.activeModal.close();
    });
  }
}
