import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IAdventureCategoryType, AdventureCategoryType } from 'app/shared/model/adventure-category-type.model';
import { AdventureCategoryTypeService } from './adventure-category-type.service';
import { IAdventureModel } from 'app/shared/model/adventure-model.model';
import { AdventureModelService } from 'app/entities/adventure-model/adventure-model.service';

@Component({
  selector: 'jhi-adventure-category-type-update',
  templateUrl: './adventure-category-type-update.component.html'
})
export class AdventureCategoryTypeUpdateComponent implements OnInit {
  isSaving = false;

  adventuremodels: IAdventureModel[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    desc: [],
    adventureModelId: []
  });

  constructor(
    protected adventureCategoryTypeService: AdventureCategoryTypeService,
    protected adventureModelService: AdventureModelService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ adventureCategoryType }) => {
      this.updateForm(adventureCategoryType);

      this.adventureModelService
        .query()
        .pipe(
          map((res: HttpResponse<IAdventureModel[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IAdventureModel[]) => (this.adventuremodels = resBody));
    });
  }

  updateForm(adventureCategoryType: IAdventureCategoryType): void {
    this.editForm.patchValue({
      id: adventureCategoryType.id,
      name: adventureCategoryType.name,
      desc: adventureCategoryType.desc,
      adventureModelId: adventureCategoryType.adventureModelId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const adventureCategoryType = this.createFromForm();
    if (adventureCategoryType.id !== undefined) {
      this.subscribeToSaveResponse(this.adventureCategoryTypeService.update(adventureCategoryType));
    } else {
      this.subscribeToSaveResponse(this.adventureCategoryTypeService.create(adventureCategoryType));
    }
  }

  private createFromForm(): IAdventureCategoryType {
    return {
      ...new AdventureCategoryType(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      desc: this.editForm.get(['desc'])!.value,
      adventureModelId: this.editForm.get(['adventureModelId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAdventureCategoryType>>): void {
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

  trackById(index: number, item: IAdventureModel): any {
    return item.id;
  }
}
