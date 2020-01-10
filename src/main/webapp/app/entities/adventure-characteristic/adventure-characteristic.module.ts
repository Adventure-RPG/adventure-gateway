import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdventureGatewaySharedModule } from 'app/shared/shared.module';
import { AdventureCharacteristicComponent } from './adventure-characteristic.component';
import { AdventureCharacteristicDetailComponent } from './adventure-characteristic-detail.component';
import { AdventureCharacteristicUpdateComponent } from './adventure-characteristic-update.component';
import { AdventureCharacteristicDeleteDialogComponent } from './adventure-characteristic-delete-dialog.component';
import { adventureCharacteristicRoute } from './adventure-characteristic.route';

@NgModule({
  imports: [AdventureGatewaySharedModule, RouterModule.forChild(adventureCharacteristicRoute)],
  declarations: [
    AdventureCharacteristicComponent,
    AdventureCharacteristicDetailComponent,
    AdventureCharacteristicUpdateComponent,
    AdventureCharacteristicDeleteDialogComponent
  ],
  entryComponents: [AdventureCharacteristicDeleteDialogComponent]
})
export class AdventureGatewayAdventureCharacteristicModule {}
