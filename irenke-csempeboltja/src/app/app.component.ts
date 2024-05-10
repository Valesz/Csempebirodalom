import { Component, NgZone } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ScrollDispatcher, CdkScrollable } from "@angular/cdk/scrolling";
import { Navigation, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'irenke-csempeboltja';
  isOnTop = true;
  page: string;

  constructor(
    private scrollDispatcher: ScrollDispatcher,
    private zone: NgZone,
    private router:Router
  ) {
    this.page = this.router.url;
  }

  toggleSideNav(sidenav: MatSidenav) {
    sidenav.toggle();
  }

  ngOnInit() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((evts: any) => {
      this.page = (evts.urlAfterRedirects as string).split('/')[1];
      this.isOnTop = true;
    });

    this.scrollDispatcher.scrolled().subscribe((event: any) => {
      const scroll = event.measureScrollOffset("top");
      let newIsOnTop = this.isOnTop;
      this.router.url
      if (scroll > 0) {
        newIsOnTop = false
      } else {
        newIsOnTop = true;
      }

      if (newIsOnTop !== this.isOnTop) {
        this.zone.run(() => {
          this.isOnTop = newIsOnTop;
        });
      }
    });
  }
}
