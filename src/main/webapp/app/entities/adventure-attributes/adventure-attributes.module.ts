import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdventureGatewaySharedModule } from 'app/shared/shared.module';
import { AdventureAttributesComponent } from './adventure-attributes.component';
import { AdventureAttributesDetailComponent } from './adventure-attributes-detail.component';
import { AdventureAttributesUpdateComponent } from './adventure-attributes-update.component';
import { AdventureAttributesDeleteDialogComponent } from './adventure-attributes-delete-dialog.component';
import { adventureAttributesRoute } from './adventure-attributes.route';

@NgModule({
  imports: [AdventureGatewaySharedModule, RouterModule.forChild(adventureAttributesRoute)],
  declarations: [
    AdventureAttributesComponent,
    AdventureAttributesDetailComponent,
    AdventureAttributesUpdateComponent,
    AdventureAttributesDeleteDialogComponent
  ],
  entryComponents: [AdventureAttributesDeleteDialogComponent]
})
export class AdventureGatewayAdventureAttributesModule {}
