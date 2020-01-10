import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAdventureModel } from 'app/shared/model/adventure-model.model';
import { AdventureModelService } from './adventure-model.service';

@Component({
  templateUrl: './adventure-model-delete-dialog.component.html'
})
export class AdventureModelDeleteDialogComponent {
  adventureModel?: IAdventureModel;

  constructor(
    protected adventureModelService: AdventureModelService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.adventureModelService.delete(id).subscribe(() => {
      this.eventManager.broadcast('adventureModelListModification');
      this.activeModal.close();
    });
  }
}
