import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IAdventureScript, AdventureScript } from 'app/shared/model/adventure-script.model';
import { AdventureScriptService } from './adventure-script.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IAdventureSkill } from 'app/shared/model/adventure-skill.model';
import { AdventureSkillService } from 'app/entities/adventure-skill/adventure-skill.service';

@Component({
  selector: 'jhi-adventure-script-update',
  templateUrl: './adventure-script-update.component.html'
})
export class AdventureScriptUpdateComponent implements OnInit {
  isSaving = false;

  adventureskills: IAdventureSkill[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    file: [],
    fileContentType: [],
    argumentsScript: [],
    adventureSkillId: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected adventureScriptService: AdventureScriptService,
    protected adventureSkillService: AdventureSkillService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ adventureScript }) => {
      this.updateForm(adventureScript);

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

  updateForm(adventureScript: IAdventureScript): void {
    this.editForm.patchValue({
      id: adventureScript.id,
      name: adventureScript.name,
      file: adventureScript.file,
      fileContentType: adventureScript.fileContentType,
      argumentsScript: adventureScript.argumentsScript,
      adventureSkillId: adventureScript.adventureSkillId
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

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const adventureScript = this.createFromForm();
    if (adventureScript.id !== undefined) {
      this.subscribeToSaveResponse(this.adventureScriptService.update(adventureScript));
    } else {
      this.subscribeToSaveResponse(this.adventureScriptService.create(adventureScript));
    }
  }

  private createFromForm(): IAdventureScript {
    return {
      ...new AdventureScript(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      fileContentType: this.editForm.get(['fileContentType'])!.value,
      file: this.editForm.get(['file'])!.value,
      argumentsScript: this.editForm.get(['argumentsScript'])!.value,
      adventureSkillId: this.editForm.get(['adventureSkillId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAdventureScript>>): void {
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

  trackById(index: number, item: IAdventureSkill): any {
    return item.id;
  }
}
