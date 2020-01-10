import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdventureGatewaySharedModule } from 'app/shared/shared.module';
import { AdventureAccountCharacterComponent } from './adventure-account-character.component';
import { AdventureAccountCharacterDetailComponent } from './adventure-account-character-detail.component';
import { AdventureAccountCharacterUpdateComponent } from './adventure-account-character-update.component';
import { AdventureAccountCharacterDeleteDialogComponent } from './adventure-account-character-delete-dialog.component';
import { adventureAccountCharacterRoute } from './adventure-account-character.route';

@NgModule({
  imports: [AdventureGatewaySharedModule, RouterModule.forChild(adventureAccountCharacterRoute)],
  declarations: [
    AdventureAccountCharacterComponent,
    AdventureAccountCharacterDetailComponent,
    AdventureAccountCharacterUpdateComponent,
    AdventureAccountCharacterDeleteDialogComponent
  ],
  entryComponents: [AdventureAccountCharacterDeleteDialogComponent]
})
export class AdventureGatewayAdventureAccountCharacterModule {}
