import { Component, NgZone } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ScrollDispatcher, CdkScrollable } from "@angular/cdk/scrolling";
import { Navigation, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from './shared/services/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
	export class AppComponent {
	title = 'irenke-csempeboltja';
	isOnTop = true;
	page: string;
	loggedInUser?: firebase.default.User | null;
	isAdmin: boolean = false;

	constructor(
		private scrollDispatcher: ScrollDispatcher,
		private zone: NgZone,
		private router:Router,
		private auth:AuthService
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

		this.retriveUser();
	}

	retriveUser() {
		this.auth.getUser().subscribe(
			{
				next: user => {
					this.loggedInUser = user
					console.log(this.loggedInUser)
				},
				error: err => console.log(err)
			}
		);
	}

	logout() {
		console.log("logging out!")
		this.auth.logout();
	}

	closeSidenav(sidenav: MatSidenav) {
		sidenav.close();
	}
}
