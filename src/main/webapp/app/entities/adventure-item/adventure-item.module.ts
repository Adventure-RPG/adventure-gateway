import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdventureGatewaySharedModule } from 'app/shared/shared.module';
import { AdventureItemComponent } from './adventure-item.component';
import { AdventureItemDetailComponent } from './adventure-item-detail.component';
import { AdventureItemUpdateComponent } from './adventure-item-update.component';
import { AdventureItemDeleteDialogComponent } from './adventure-item-delete-dialog.component';
import { adventureItemRoute } from './adventure-item.route';

@NgModule({
  imports: [AdventureGatewaySharedModule, RouterModule.forChild(adventureItemRoute)],
  declarations: [AdventureItemComponent, AdventureItemDetailComponent, AdventureItemUpdateComponent, AdventureItemDeleteDialogComponent],
  entryComponents: [AdventureItemDeleteDialogComponent]
})
export class AdventureGatewayAdventureItemModule {}
