import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'adventure-account-character',
        loadChildren: () =>
          import('./adventure-account-character/adventure-account-character.module').then(
            m => m.AdventureGatewayAdventureAccountCharacterModule
          )
      },
      {
        path: 'adventure-race',
        loadChildren: () => import('./adventure-race/adventure-race.module').then(m => m.AdventureGatewayAdventureRaceModule)
      },
      {
        path: 'adventure-fraction',
        loadChildren: () => import('./adventure-fraction/adventure-fraction.module').then(m => m.AdventureGatewayAdventureFractionModule)
      },
      {
        path: 'adventure-race-options',
        loadChildren: () =>
          import('./adventure-race-options/adventure-race-options.module').then(m => m.AdventureGatewayAdventureRaceOptionsModule)
      },
      {
        path: 'adventure-model',
        loadChildren: () => import('./adventure-model/adventure-model.module').then(m => m.AdventureGatewayAdventureModelModule)
      },
      {
        path: 'adventure-skill',
        loadChildren: () => import('./adventure-skill/adventure-skill.module').then(m => m.AdventureGatewayAdventureSkillModule)
      },
      {
        path: 'adventure-script',
        loadChildren: () => import('./adventure-script/adventure-script.module').then(m => m.AdventureGatewayAdventureScriptModule)
      },
      {
        path: 'adventure-model-options',
        loadChildren: () =>
          import('./adventure-model-options/adventure-model-options.module').then(m => m.AdventureGatewayAdventureModelOptionsModule)
      },
      {
        path: 'adventure-category-type',
        loadChildren: () =>
          import('./adventure-category-type/adventure-category-type.module').then(m => m.AdventureGatewayAdventureCategoryTypeModule)
      },
      {
        path: 'adventure-characteristic',
        loadChildren: () =>
          import('./adventure-characteristic/adventure-characteristic.module').then(m => m.AdventureGatewayAdventureCharacteristicModule)
      },
      {
        path: 'adventure-inventory-char',
        loadChildren: () =>
          import('./adventure-inventory-char/adventure-inventory-char.module').then(m => m.AdventureGatewayAdventureInventoryCharModule)
      },
      {
        path: 'adventure-item',
        loadChildren: () => import('./adventure-item/adventure-item.module').then(m => m.AdventureGatewayAdventureItemModule)
      },
      {
        path: 'adventure-attributes',
        loadChildren: () =>
          import('./adventure-attributes/adventure-attributes.module').then(m => m.AdventureGatewayAdventureAttributesModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class AdventureGatewayEntityModule {}
