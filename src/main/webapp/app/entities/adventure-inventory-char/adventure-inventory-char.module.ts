import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdventureGatewaySharedModule } from 'app/shared/shared.module';
import { AdventureInventoryCharComponent } from './adventure-inventory-char.component';
import { AdventureInventoryCharDetailComponent } from './adventure-inventory-char-detail.component';
import { AdventureInventoryCharUpdateComponent } from './adventure-inventory-char-update.component';
import { AdventureInventoryCharDeleteDialogComponent } from './adventure-inventory-char-delete-dialog.component';
import { adventureInventoryCharRoute } from './adventure-inventory-char.route';

@NgModule({
  imports: [AdventureGatewaySharedModule, RouterModule.forChild(adventureInventoryCharRoute)],
  declarations: [
    AdventureInventoryCharComponent,
    AdventureInventoryCharDetailComponent,
    AdventureInventoryCharUpdateComponent,
    AdventureInventoryCharDeleteDialogComponent
  ],
  entryComponents: [AdventureInventoryCharDeleteDialogComponent]
})
export class AdventureGatewayAdventureInventoryCharModule {}
