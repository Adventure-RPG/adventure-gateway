import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdventureGatewaySharedModule } from 'app/shared/shared.module';
import { AdventureModelOptionsComponent } from './adventure-model-options.component';
import { AdventureModelOptionsDetailComponent } from './adventure-model-options-detail.component';
import { AdventureModelOptionsUpdateComponent } from './adventure-model-options-update.component';
import { AdventureModelOptionsDeleteDialogComponent } from './adventure-model-options-delete-dialog.component';
import { adventureModelOptionsRoute } from './adventure-model-options.route';

@NgModule({
  imports: [AdventureGatewaySharedModule, RouterModule.forChild(adventureModelOptionsRoute)],
  declarations: [
    AdventureModelOptionsComponent,
    AdventureModelOptionsDetailComponent,
    AdventureModelOptionsUpdateComponent,
    AdventureModelOptionsDeleteDialogComponent
  ],
  entryComponents: [AdventureModelOptionsDeleteDialogComponent]
})
export class AdventureGatewayAdventureModelOptionsModule {}
