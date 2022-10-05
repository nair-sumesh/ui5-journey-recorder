import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ChromeExtensionService } from 'src/app/services/chromeExtensionService/chrome_extension_service';
import { Observable } from 'rxjs';
import { TestScenario } from 'src/app/classes/testScenario';
import { ScenarioService } from 'src/app/services/scenarioService/scenario.service';
import { ReplayService } from 'src/app/services/replayService/replay.service';
import {
  AppFooterService,
  LoadStatus,
} from 'src/app/components/app-footer/app-footer.service';
import { AppHeaderService } from 'src/app/components/app-header/app-header.service';
import { MessageService } from 'src/app/services/messageService/message.service';
import { SnackSeverity } from 'src/app/components/dialogs/snack-dialog/snack-dialog.component';
import { Step } from 'src/app/classes/Step';
import { LoaderService } from 'src/app/services/loaderService/loaderService';
import { ReplaySetupDialogComponent } from '../../dialogs/ReplaySetupDialog/ReplaySetupDialog.component';
import { MatDialog } from '@angular/material/dialog';

type ReplayStep = Step & {
  testResult?: boolean | null;
};

@Component({
  selector: 'app-object-page',
  templateUrl: './object_page.component.html',
  styleUrls: ['./object_page.component.scss'],
})
export class ObjectPageComponent implements OnInit, OnDestroy {
  navigatedPage: string = 'Test';
  tab: chrome.tabs.Tab | undefined;

  steps: any[] = [];
  scenario: TestScenario = new TestScenario('0');
  scenarioSteps: ReplayStep[] = [];

  replay: boolean = false;

  private scenario_id: string = '';

  constructor(
    private incommingRoute: ActivatedRoute,
    private chr_ext_srv: ChromeExtensionService,
    private router: Router,
    private active_route: ActivatedRoute,
    private scenarioService: ScenarioService,
    private replayService: ReplayService,
    public app_footer_service: AppFooterService,
    private app_header_service: AppHeaderService,
    private messageService: MessageService,
    private loaderService: LoaderService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.app_header_service.showBack();
    this.app_header_service.setCustomBackUrl('');
    this.incommingRoute.params.subscribe((params: Params) => {
      this.scenario_id = params['scenarioId'];
      this.scenarioService
        .getScenario(this.scenario_id)
        .then((scen: TestScenario | undefined) => {
          if (!scen) {
            this.navBack();
          } else {
            this.scenario = scen;
            this.scenarioSteps = scen.testPages.reduce(
              (a, b) => [...a, ...b.steps],
              [] as ReplayStep[]
            );
          }
        })
        .catch(() => this.navBack.bind(this));
    });
  }

  ngOnDestroy(): void {
    this.chr_ext_srv.disconnect().catch(() => {});
  }

  navBack(): void {
    this.router.navigate(['']);
  }

  saveCurrentScenario(): void {
    if (this.scenario) {
      this.scenarioService.saveScenario(this.scenario).then(() => {
        this.messageService.show({
          severity: SnackSeverity.SUCCESS,
          title: 'Save',
          detail: 'Current scenario saved!',
        });
      });
    }
  }

  replayMode() {
    const ref = this.dialog.open(ReplaySetupDialogComponent, {
      disableClose: true,
    });

    ref.afterClosed().subscribe((result) => {
      if (result) {
        if (this.scenario) {
          this.app_footer_service.loadingIndicatorSource.subscribe(
            (status: LoadStatus) => {
              if (status === LoadStatus.DISCONNECTED) {
                this.replay = false;
              }
            }
          );
          this.replayService.startReplay(this.scenario.startUrl).then(() => {
            this.scenarioSteps.forEach((sSt) => (sSt.testResult = null));
            this.replay = true;
          });
        }
      }
    });
  }

  stopReplay() {
    if (this.scenario) {
      this.replayService.stopReplay().then(() => {
        this.replay = false;
      });
    }
  }

  disconnect() {
    this.replayService.stopReplay();
  }

  connectToPage() {
    if (this.scenario) {
      this.replayService.startReplay(this.scenario?.startUrl);
    }
  }

  editViewStep(s: Step) {
    this.router.navigate(['step', encodeURIComponent(s.controlId)], {
      relativeTo: this.active_route,
    });
  }

  performAction(date: Step, event: any) {
    if (event.target.innerHTML !== 'play_arrow') {
      return;
    }
    if (date) {
      this.replayService
        .performAction(date)
        .then(() => {
          event.target.parentElement.parentElement.style.color = 'green';
          event.target.innerHTML = 'check_circle';
        })
        .catch((e) => {
          console.log(e);
          event.target.parentElement.parentElement.style.color = 'red';
          event.target.innerHTML = 'error';
        });
    }
  }

  export() {
    this.loaderService.startLoading();
    const link = document.createElement('a');
    const blob = new Blob([this.scenario?.toString() || ''], {
      type: 'octet/stream',
    });
    const name =
      this.replaceUnsupportedFileSigns(this.scenario?.name || 'blub', '_') +
      '.json';

    link.setAttribute('href', window.URL.createObjectURL(blob));
    link.setAttribute('download', name);
    link.click();
    this.loaderService.endLoading();
  }

  showCodePage(): void {
    this.router.navigate(['code'], {
      relativeTo: this.active_route,
    });
  }

  private replaceUnsupportedFileSigns(
    text: string,
    replacement_sign: string
  ): string {
    return text.replace(/[\s\/\\\:\*\?\"\<\>\|\-]+/gm, replacement_sign);
  }
}
