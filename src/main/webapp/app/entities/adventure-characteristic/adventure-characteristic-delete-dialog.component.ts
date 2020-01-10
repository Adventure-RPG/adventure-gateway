import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAdventureCharacteristic } from 'app/shared/model/adventure-characteristic.model';
import { AdventureCharacteristicService } from './adventure-characteristic.service';

@Component({
  templateUrl: './adventure-characteristic-delete-dialog.component.html'
})
export class AdventureCharacteristicDeleteDialogComponent {
  adventureCharacteristic?: IAdventureCharacteristic;

  constructor(
    protected adventureCharacteristicService: AdventureCharacteristicService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.adventureCharacteristicService.delete(id).subscribe(() => {
      this.eventManager.broadcast('adventureCharacteristicListModification');
      this.activeModal.close();
    });
  }
}
