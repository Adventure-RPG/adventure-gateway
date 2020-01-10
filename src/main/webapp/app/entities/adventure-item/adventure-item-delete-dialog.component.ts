import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAdventureItem } from 'app/shared/model/adventure-item.model';
import { AdventureItemService } from './adventure-item.service';

@Component({
  templateUrl: './adventure-item-delete-dialog.component.html'
})
export class AdventureItemDeleteDialogComponent {
  adventureItem?: IAdventureItem;

  constructor(
    protected adventureItemService: AdventureItemService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.adventureItemService.delete(id).subscribe(() => {
      this.eventManager.broadcast('adventureItemListModification');
      this.activeModal.close();
    });
  }
}
