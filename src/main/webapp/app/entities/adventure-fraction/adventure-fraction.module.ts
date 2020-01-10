import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdventureGatewaySharedModule } from 'app/shared/shared.module';
import { AdventureFractionComponent } from './adventure-fraction.component';
import { AdventureFractionDetailComponent } from './adventure-fraction-detail.component';
import { AdventureFractionUpdateComponent } from './adventure-fraction-update.component';
import { AdventureFractionDeleteDialogComponent } from './adventure-fraction-delete-dialog.component';
import { adventureFractionRoute } from './adventure-fraction.route';

@NgModule({
  imports: [AdventureGatewaySharedModule, RouterModule.forChild(adventureFractionRoute)],
  declarations: [
    AdventureFractionComponent,
    AdventureFractionDetailComponent,
    AdventureFractionUpdateComponent,
    AdventureFractionDeleteDialogComponent
  ],
  entryComponents: [AdventureFractionDeleteDialogComponent]
})
export class AdventureGatewayAdventureFractionModule {}
