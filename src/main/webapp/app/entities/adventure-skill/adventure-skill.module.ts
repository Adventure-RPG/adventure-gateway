import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdventureGatewaySharedModule } from 'app/shared/shared.module';
import { AdventureSkillComponent } from './adventure-skill.component';
import { AdventureSkillDetailComponent } from './adventure-skill-detail.component';
import { AdventureSkillUpdateComponent } from './adventure-skill-update.component';
import { AdventureSkillDeleteDialogComponent } from './adventure-skill-delete-dialog.component';
import { adventureSkillRoute } from './adventure-skill.route';

@NgModule({
  imports: [AdventureGatewaySharedModule, RouterModule.forChild(adventureSkillRoute)],
  declarations: [
    AdventureSkillComponent,
    AdventureSkillDetailComponent,
    AdventureSkillUpdateComponent,
    AdventureSkillDeleteDialogComponent
  ],
  entryComponents: [AdventureSkillDeleteDialogComponent]
})
export class AdventureGatewayAdventureSkillModule {}
