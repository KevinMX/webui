import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { ProductType } from 'app/enums/product-type.enum';
import { WebSocketService, SystemGeneralService } from 'app/services';
import { AppLoaderService } from 'app/services/app-loader/app-loader.service';
import { DialogService } from 'app/services/dialog.service';
import { LocaleService } from 'app/services/locale.service';

@UntilDestroy()
@Component({
  selector: 'system-shutdown',
  templateUrl: './shutdown.component.html',
  styleUrls: ['./shutdown.component.scss'],
})
export class ShutdownComponent implements OnInit {
  product_type: ProductType;
  copyrightYear = this.localeService.getCopyrightYearFromBuildTime();

  readonly ProductType = ProductType;

  constructor(
    protected ws: WebSocketService,
    protected router: Router,
    protected loader: AppLoaderService,
    public translate: TranslateService,
    protected dialogService: DialogService,
    private sysGeneralService: SystemGeneralService,
    private localeService: LocaleService,
  ) {
    this.sysGeneralService.getProductType.pipe(untilDestroyed(this)).subscribe((res) => {
      this.product_type = res as ProductType;
    });
  }

  ngOnInit(): void {
    this.ws.call('system.shutdown', {}).pipe(untilDestroyed(this)).subscribe(
      () => {
      },
      (res) => { // error on shutdown
        this.dialogService.errorReport(res.error, res.reason, res.trace.formatted)
          .pipe(untilDestroyed(this))
          .subscribe(() => {
            this.router.navigate(['/session/signin']);
          });
      },
      () => {
        this.ws.prepare_shutdown();
      },
    );
    // fade to black after 60 sec on shut down
    setTimeout(() => {
      const overlay = document.getElementById('overlay');
      overlay.setAttribute('class', 'blackout');
    }, 60000);
  }
}
