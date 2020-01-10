import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IAdventureAccountCharacter, AdventureAccountCharacter } from 'app/shared/model/adventure-account-character.model';
import { AdventureAccountCharacterService } from './adventure-account-character.service';
import { IAdventureInventoryChar } from 'app/shared/model/adventure-inventory-char.model';
import { AdventureInventoryCharService } from 'app/entities/adventure-inventory-char/adventure-inventory-char.service';
import { IAdventureCharacteristic } from 'app/shared/model/adventure-characteristic.model';
import { AdventureCharacteristicService } from 'app/entities/adventure-characteristic/adventure-characteristic.service';
import { IAdventureSkill } from 'app/shared/model/adventure-skill.model';
import { AdventureSkillService } from 'app/entities/adventure-skill/adventure-skill.service';

type SelectableEntity = IAdventureInventoryChar | IAdventureCharacteristic | IAdventureSkill;

@Component({
  selector: 'jhi-adventure-account-character-update',
  templateUrl: './adventure-account-character-update.component.html'
})
export class AdventureAccountCharacterUpdateComponent implements OnInit {
  isSaving = false;

  adventureinventorychars: IAdventureInventoryChar[] = [];

  adventurecharacteristics: IAdventureCharacteristic[] = [];

  adventureskills: IAdventureSkill[] = [];

  editForm = this.fb.group({
    id: [],
    nickname: [null, [Validators.required]],
    gender: [null, [Validators.required]],
    adventureInventoryCharId: [],
    adventureCharacteristicId: [],
    adventureSkills: []
  });

  constructor(
    protected adventureAccountCharacterService: AdventureAccountCharacterService,
    protected adventureInventoryCharService: AdventureInventoryCharService,
    protected adventureCharacteristicService: AdventureCharacteristicService,
    protected adventureSkillService: AdventureSkillService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ adventureAccountCharacter }) => {
      this.updateForm(adventureAccountCharacter);

      this.adventureInventoryCharService
        .query({ filter: 'adventureaccountcharacter-is-null' })
        .pipe(
          map((res: HttpResponse<IAdventureInventoryChar[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IAdventureInventoryChar[]) => {
          if (!adventureAccountCharacter.adventureInventoryCharId) {
            this.adventureinventorychars = resBody;
          } else {
            this.adventureInventoryCharService
              .find(adventureAccountCharacter.adventureInventoryCharId)
              .pipe(
                map((subRes: HttpResponse<IAdventureInventoryChar>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IAdventureInventoryChar[]) => {
                this.adventureinventorychars = concatRes;
              });
          }
        });

      this.adventureCharacteristicService
        .query({ filter: 'adventureaccountcharacter-is-null' })
        .pipe(
          map((res: HttpResponse<IAdventureCharacteristic[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IAdventureCharacteristic[]) => {
          if (!adventureAccountCharacter.adventureCharacteristicId) {
            this.adventurecharacteristics = resBody;
          } else {
            this.adventureCharacteristicService
              .find(adventureAccountCharacter.adventureCharacteristicId)
              .pipe(
                map((subRes: HttpResponse<IAdventureCharacteristic>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IAdventureCharacteristic[]) => {
                this.adventurecharacteristics = concatRes;
              });
          }
        });

      this.adventureSkillService
        .query()
        .pipe(
          map((res: HttpResponse<IAdventureSkill[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IAdventureSkill[]) => (this.adventureskills = resBody));
    });
  }

  updateForm(adventureAccountCharacter: IAdventureAccountCharacter): void {
    this.editForm.patchValue({
      id: adventureAccountCharacter.id,
      nickname: adventureAccountCharacter.nickname,
      gender: adventureAccountCharacter.gender,
      adventureInventoryCharId: adventureAccountCharacter.adventureInventoryCharId,
      adventureCharacteristicId: adventureAccountCharacter.adventureCharacteristicId,
      adventureSkills: adventureAccountCharacter.adventureSkills
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const adventureAccountCharacter = this.createFromForm();
    if (adventureAccountCharacter.id !== undefined) {
      this.subscribeToSaveResponse(this.adventureAccountCharacterService.update(adventureAccountCharacter));
    } else {
      this.subscribeToSaveResponse(this.adventureAccountCharacterService.create(adventureAccountCharacter));
    }
  }

  private createFromForm(): IAdventureAccountCharacter {
    return {
      ...new AdventureAccountCharacter(),
      id: this.editForm.get(['id'])!.value,
      nickname: this.editForm.get(['nickname'])!.value,
      gender: this.editForm.get(['gender'])!.value,
      adventureInventoryCharId: this.editForm.get(['adventureInventoryCharId'])!.value,
      adventureCharacteristicId: this.editForm.get(['adventureCharacteristicId'])!.value,
      adventureSkills: this.editForm.get(['adventureSkills'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAdventureAccountCharacter>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  getSelected(selectedVals: IAdventureSkill[], option: IAdventureSkill): IAdventureSkill {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
