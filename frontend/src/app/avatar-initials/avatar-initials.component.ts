import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-avatar-initials',
  templateUrl: './avatar-initials.component.html',
  styleUrls: ['./avatar-initials.component.scss']
})
export class AvatarInitialsComponent implements OnInit {

  @Input() public photoUrl: string = '';
  @Input() public name: string = '';

  public showInitials = false;
  public initials: string = '';

  constructor() { }

  ngOnInit(): void {
    if (!this.photoUrl) {
      this.showInitials = true;
      this.createInititals();
    }
  }

  private createInititals(): void {
    let initials = "";

    for (let i = 0; i < this.name.length; i++) {
      if (this.name.charAt(i) === ' ') {
        continue;
      }

      if (this.name.charAt(i) === this.name.charAt(i).toUpperCase()) {
        initials += this.name.charAt(i);

        if (initials.length == 2) {
          break;
        }
      }
    }

    this.initials = initials;
  }

}
