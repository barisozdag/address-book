import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from 'src/models/contact';

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.scss']
})
export class TitlebarComponent implements OnInit {

  @Input() contact: Contact | undefined;
  currentPath: string = '';

  constructor(
    private route: ActivatedRoute,
  ) {
    if (this.route.routeConfig && this.route.routeConfig.path) {
      this.currentPath = this.route.routeConfig.path;
    }
  }

  ngOnInit(): void {
  }

}
