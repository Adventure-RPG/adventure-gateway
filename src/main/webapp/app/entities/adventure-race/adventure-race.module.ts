import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdventureGatewaySharedModule } from 'app/shared/shared.module';
import { AdventureRaceComponent } from './adventure-race.component';
import { AdventureRaceDetailComponent } from './adventure-race-detail.component';
import { AdventureRaceUpdateComponent } from './adventure-race-update.component';
import { AdventureRaceDeleteDialogComponent } from './adventure-race-delete-dialog.component';
import { adventureRaceRoute } from './adventure-race.route';

@NgModule({
  imports: [AdventureGatewaySharedModule, RouterModule.forChild(adventureRaceRoute)],
  declarations: [AdventureRaceComponent, AdventureRaceDetailComponent, AdventureRaceUpdateComponent, AdventureRaceDeleteDialogComponent],
  entryComponents: [AdventureRaceDeleteDialogComponent]
})
export class AdventureGatewayAdventureRaceModule {}
