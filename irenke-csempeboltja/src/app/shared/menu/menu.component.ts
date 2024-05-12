import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  @Input() loggedInUser?: firebase.default.User | null;
  @Input() isAdmin?: boolean;
  @Output() onCloseSidenav: EventEmitter<boolean> = new EventEmitter();
  @Output() onLogout: EventEmitter<boolean> = new EventEmitter();


  close(logout?: boolean) {

    if (logout) {
      this.onLogout.emit(true);
    }

    this.onCloseSidenav.emit(true);
  }
}
