import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAdventureModelOptions } from 'app/shared/model/adventure-model-options.model';
import { AdventureModelOptionsService } from './adventure-model-options.service';

@Component({
  templateUrl: './adventure-model-options-delete-dialog.component.html'
})
export class AdventureModelOptionsDeleteDialogComponent {
  adventureModelOptions?: IAdventureModelOptions;

  constructor(
    protected adventureModelOptionsService: AdventureModelOptionsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.adventureModelOptionsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('adventureModelOptionsListModification');
      this.activeModal.close();
    });
  }
}
