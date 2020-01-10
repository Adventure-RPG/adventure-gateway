import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAdventureScript } from 'app/shared/model/adventure-script.model';
import { AdventureScriptService } from './adventure-script.service';

@Component({
  templateUrl: './adventure-script-delete-dialog.component.html'
})
export class AdventureScriptDeleteDialogComponent {
  adventureScript?: IAdventureScript;

  constructor(
    protected adventureScriptService: AdventureScriptService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.adventureScriptService.delete(id).subscribe(() => {
      this.eventManager.broadcast('adventureScriptListModification');
      this.activeModal.close();
    });
  }
}
