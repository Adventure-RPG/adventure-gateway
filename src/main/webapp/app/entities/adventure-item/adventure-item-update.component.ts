import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IAdventureItem, AdventureItem } from 'app/shared/model/adventure-item.model';
import { AdventureItemService } from './adventure-item.service';
import { IAdventureAttributes } from 'app/shared/model/adventure-attributes.model';
import { AdventureAttributesService } from 'app/entities/adventure-attributes/adventure-attributes.service';
import { IAdventureInventoryChar } from 'app/shared/model/adventure-inventory-char.model';
import { AdventureInventoryCharService } from 'app/entities/adventure-inventory-char/adventure-inventory-char.service';

type SelectableEntity = IAdventureAttributes | IAdventureInventoryChar;

@Component({
  selector: 'jhi-adventure-item-update',
  templateUrl: './adventure-item-update.component.html'
})
export class AdventureItemUpdateComponent implements OnInit {
  isSaving = false;

  adventureattributes: IAdventureAttributes[] = [];

  adventureinventorychars: IAdventureInventoryChar[] = [];

  editForm = this.fb.group({
    id: [],
    isEquipment: [],
    equipmentSlot: [],
    price: [],
    weight: [],
    adventureAttributesId: [],
    adventureInventoryCharId: []
  });

  constructor(
    protected adventureItemService: AdventureItemService,
    protected adventureAttributesService: AdventureAttributesService,
    protected adventureInventoryCharService: AdventureInventoryCharService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ adventureItem }) => {
      this.updateForm(adventureItem);

      this.adventureAttributesService
        .query({ filter: 'adventureitem-is-null' })
        .pipe(
          map((res: HttpResponse<IAdventureAttributes[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IAdventureAttributes[]) => {
          if (!adventureItem.adventureAttributesId) {
            this.adventureattributes = resBody;
          } else {
            this.adventureAttributesService
              .find(adventureItem.adventureAttributesId)
              .pipe(
                map((subRes: HttpResponse<IAdventureAttributes>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IAdventureAttributes[]) => {
                this.adventureattributes = concatRes;
              });
          }
        });

      this.adventureInventoryCharService
        .query()
        .pipe(
          map((res: HttpResponse<IAdventureInventoryChar[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IAdventureInventoryChar[]) => (this.adventureinventorychars = resBody));
    });
  }

  updateForm(adventureItem: IAdventureItem): void {
    this.editForm.patchValue({
      id: adventureItem.id,
      isEquipment: adventureItem.isEquipment,
      equipmentSlot: adventureItem.equipmentSlot,
      price: adventureItem.price,
      weight: adventureItem.weight,
      adventureAttributesId: adventureItem.adventureAttributesId,
      adventureInventoryCharId: adventureItem.adventureInventoryCharId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const adventureItem = this.createFromForm();
    if (adventureItem.id !== undefined) {
      this.subscribeToSaveResponse(this.adventureItemService.update(adventureItem));
    } else {
      this.subscribeToSaveResponse(this.adventureItemService.create(adventureItem));
    }
  }

  private createFromForm(): IAdventureItem {
    return {
      ...new AdventureItem(),
      id: this.editForm.get(['id'])!.value,
      isEquipment: this.editForm.get(['isEquipment'])!.value,
      equipmentSlot: this.editForm.get(['equipmentSlot'])!.value,
      price: this.editForm.get(['price'])!.value,
      weight: this.editForm.get(['weight'])!.value,
      adventureAttributesId: this.editForm.get(['adventureAttributesId'])!.value,
      adventureInventoryCharId: this.editForm.get(['adventureInventoryCharId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAdventureItem>>): void {
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
}
