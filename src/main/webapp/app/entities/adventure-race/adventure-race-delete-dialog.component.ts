import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAdventureRace } from 'app/shared/model/adventure-race.model';
import { AdventureRaceService } from './adventure-race.service';

@Component({
  templateUrl: './adventure-race-delete-dialog.component.html'
})
export class AdventureRaceDeleteDialogComponent {
  adventureRace?: IAdventureRace;

  constructor(
    protected adventureRaceService: AdventureRaceService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.adventureRaceService.delete(id).subscribe(() => {
      this.eventManager.broadcast('adventureRaceListModification');
      this.activeModal.close();
    });
  }
}
