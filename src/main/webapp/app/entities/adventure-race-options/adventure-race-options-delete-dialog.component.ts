import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAdventureRaceOptions } from 'app/shared/model/adventure-race-options.model';
import { AdventureRaceOptionsService } from './adventure-race-options.service';

@Component({
  templateUrl: './adventure-race-options-delete-dialog.component.html'
})
export class AdventureRaceOptionsDeleteDialogComponent {
  adventureRaceOptions?: IAdventureRaceOptions;

  constructor(
    protected adventureRaceOptionsService: AdventureRaceOptionsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.adventureRaceOptionsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('adventureRaceOptionsListModification');
      this.activeModal.close();
    });
  }
}
