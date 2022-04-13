import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../../models/contact';

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.scss']
})
export class TitlebarComponent {

  @Input() contact: Contact | undefined;
  @Input() search: boolean = false;
  currentPath: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
  ) {
    if (this.route.routeConfig && this.route.routeConfig.path) {
      this.currentPath = this.route.routeConfig.path;
    }
  }

  back(main: boolean = false): void {
    if (main) {
      this.router.navigateByUrl('/');
    } else {
      this.location.back();
    }
  }

}
