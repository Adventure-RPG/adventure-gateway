import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IAdventureScript } from 'app/shared/model/adventure-script.model';

@Component({
  selector: 'jhi-adventure-script-detail',
  templateUrl: './adventure-script-detail.component.html'
})
export class AdventureScriptDetailComponent implements OnInit {
  adventureScript: IAdventureScript | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ adventureScript }) => {
      this.adventureScript = adventureScript;
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
