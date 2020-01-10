import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdventureGatewaySharedModule } from 'app/shared/shared.module';
import { AdventureCategoryTypeComponent } from './adventure-category-type.component';
import { AdventureCategoryTypeDetailComponent } from './adventure-category-type-detail.component';
import { AdventureCategoryTypeUpdateComponent } from './adventure-category-type-update.component';
import { AdventureCategoryTypeDeleteDialogComponent } from './adventure-category-type-delete-dialog.component';
import { adventureCategoryTypeRoute } from './adventure-category-type.route';

@NgModule({
  imports: [AdventureGatewaySharedModule, RouterModule.forChild(adventureCategoryTypeRoute)],
  declarations: [
    AdventureCategoryTypeComponent,
    AdventureCategoryTypeDetailComponent,
    AdventureCategoryTypeUpdateComponent,
    AdventureCategoryTypeDeleteDialogComponent
  ],
  entryComponents: [AdventureCategoryTypeDeleteDialogComponent]
})
export class AdventureGatewayAdventureCategoryTypeModule {}
