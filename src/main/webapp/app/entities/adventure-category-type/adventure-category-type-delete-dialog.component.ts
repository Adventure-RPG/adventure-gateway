import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAdventureCategoryType } from 'app/shared/model/adventure-category-type.model';
import { AdventureCategoryTypeService } from './adventure-category-type.service';

@Component({
  templateUrl: './adventure-category-type-delete-dialog.component.html'
})
export class AdventureCategoryTypeDeleteDialogComponent {
  adventureCategoryType?: IAdventureCategoryType;

  constructor(
    protected adventureCategoryTypeService: AdventureCategoryTypeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.adventureCategoryTypeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('adventureCategoryTypeListModification');
      this.activeModal.close();
    });
  }
}
