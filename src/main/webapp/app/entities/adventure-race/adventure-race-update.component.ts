import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IAdventureRace, AdventureRace } from 'app/shared/model/adventure-race.model';
import { AdventureRaceService } from './adventure-race.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IAdventureFraction } from 'app/shared/model/adventure-fraction.model';
import { AdventureFractionService } from 'app/entities/adventure-fraction/adventure-fraction.service';
import { IAdventureAccountCharacter } from 'app/shared/model/adventure-account-character.model';
import { AdventureAccountCharacterService } from 'app/entities/adventure-account-character/adventure-account-character.service';

type SelectableEntity = IAdventureFraction | IAdventureAccountCharacter;

@Component({
  selector: 'jhi-adventure-race-update',
  templateUrl: './adventure-race-update.component.html'
})
export class AdventureRaceUpdateComponent implements OnInit {
  isSaving = false;

  adventurefractions: IAdventureFraction[] = [];

  adventureaccountcharacters: IAdventureAccountCharacter[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    desc: [null, [Validators.required]],
    image: [null, [Validators.required]],
    imageContentType: [],
    adventureFractions: [],
    adventureAccountCharacterId: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected adventureRaceService: AdventureRaceService,
    protected adventureFractionService: AdventureFractionService,
    protected adventureAccountCharacterService: AdventureAccountCharacterService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ adventureRace }) => {
      this.updateForm(adventureRace);

      this.adventureFractionService
        .query()
        .pipe(
          map((res: HttpResponse<IAdventureFraction[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IAdventureFraction[]) => (this.adventurefractions = resBody));

      this.adventureAccountCharacterService
        .query()
        .pipe(
          map((res: HttpResponse<IAdventureAccountCharacter[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IAdventureAccountCharacter[]) => (this.adventureaccountcharacters = resBody));
    });
  }

  updateForm(adventureRace: IAdventureRace): void {
    this.editForm.patchValue({
      id: adventureRace.id,
      name: adventureRace.name,
      desc: adventureRace.desc,
      image: adventureRace.image,
      imageContentType: adventureRace.imageContentType,
      adventureFractions: adventureRace.adventureFractions,
      adventureAccountCharacterId: adventureRace.adventureAccountCharacterId
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('adventureGatewayApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const adventureRace = this.createFromForm();
    if (adventureRace.id !== undefined) {
      this.subscribeToSaveResponse(this.adventureRaceService.update(adventureRace));
    } else {
      this.subscribeToSaveResponse(this.adventureRaceService.create(adventureRace));
    }
  }

  private createFromForm(): IAdventureRace {
    return {
      ...new AdventureRace(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      desc: this.editForm.get(['desc'])!.value,
      imageContentType: this.editForm.get(['imageContentType'])!.value,
      image: this.editForm.get(['image'])!.value,
      adventureFractions: this.editForm.get(['adventureFractions'])!.value,
      adventureAccountCharacterId: this.editForm.get(['adventureAccountCharacterId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAdventureRace>>): void {
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

  getSelected(selectedVals: IAdventureFraction[], option: IAdventureFraction): IAdventureFraction {
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
