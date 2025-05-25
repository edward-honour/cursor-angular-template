import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageHeaderComponent } from './layout/page-header/page-header.component';
import { PageFooterComponent } from './layout/page-footer/page-footer.component';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule, RouterLink, NavigationEnd } from '@angular/router';
import { ViewportScroller } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PageHeaderComponent, PageFooterComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'AbbsiTablet';

  private readonly viewportScroller = inject(ViewportScroller);

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _dataService: DataService,
    private _router: Router,
    public http: HttpClient  // used by upload
) {
    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.viewportScroller.scrollToPosition([0, 0]);
      }
    });
  }

  logout() {

  }

  clearTextarea() {

  }

  newConsult(): void { 
    let formData: any = { "member_id": 0 }
    this._dataService.postData("switch-member", formData).subscribe((data: any)=> { 
    location.reload();
  }) 

}
}
