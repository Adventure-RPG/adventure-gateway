import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdventureGatewaySharedModule } from 'app/shared/shared.module';
import { AdventureRaceOptionsComponent } from './adventure-race-options.component';
import { AdventureRaceOptionsDetailComponent } from './adventure-race-options-detail.component';
import { AdventureRaceOptionsUpdateComponent } from './adventure-race-options-update.component';
import { AdventureRaceOptionsDeleteDialogComponent } from './adventure-race-options-delete-dialog.component';
import { adventureRaceOptionsRoute } from './adventure-race-options.route';

@NgModule({
  imports: [AdventureGatewaySharedModule, RouterModule.forChild(adventureRaceOptionsRoute)],
  declarations: [
    AdventureRaceOptionsComponent,
    AdventureRaceOptionsDetailComponent,
    AdventureRaceOptionsUpdateComponent,
    AdventureRaceOptionsDeleteDialogComponent
  ],
  entryComponents: [AdventureRaceOptionsDeleteDialogComponent]
})
export class AdventureGatewayAdventureRaceOptionsModule {}
