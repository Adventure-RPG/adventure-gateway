import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdventureGatewaySharedModule } from 'app/shared/shared.module';
import { AdventureModelComponent } from './adventure-model.component';
import { AdventureModelDetailComponent } from './adventure-model-detail.component';
import { AdventureModelUpdateComponent } from './adventure-model-update.component';
import { AdventureModelDeleteDialogComponent } from './adventure-model-delete-dialog.component';
import { adventureModelRoute } from './adventure-model.route';

@NgModule({
  imports: [AdventureGatewaySharedModule, RouterModule.forChild(adventureModelRoute)],
  declarations: [
    AdventureModelComponent,
    AdventureModelDetailComponent,
    AdventureModelUpdateComponent,
    AdventureModelDeleteDialogComponent
  ],
  entryComponents: [AdventureModelDeleteDialogComponent]
})
export class AdventureGatewayAdventureModelModule {}
