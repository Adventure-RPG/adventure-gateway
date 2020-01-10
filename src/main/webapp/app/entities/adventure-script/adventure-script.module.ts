import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdventureGatewaySharedModule } from 'app/shared/shared.module';
import { AdventureScriptComponent } from './adventure-script.component';
import { AdventureScriptDetailComponent } from './adventure-script-detail.component';
import { AdventureScriptUpdateComponent } from './adventure-script-update.component';
import { AdventureScriptDeleteDialogComponent } from './adventure-script-delete-dialog.component';
import { adventureScriptRoute } from './adventure-script.route';

@NgModule({
  imports: [AdventureGatewaySharedModule, RouterModule.forChild(adventureScriptRoute)],
  declarations: [
    AdventureScriptComponent,
    AdventureScriptDetailComponent,
    AdventureScriptUpdateComponent,
    AdventureScriptDeleteDialogComponent
  ],
  entryComponents: [AdventureScriptDeleteDialogComponent]
})
export class AdventureGatewayAdventureScriptModule {}
