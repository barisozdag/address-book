import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-avatar-initials',
  templateUrl: './avatar-initials.component.html',
  styleUrls: ['./avatar-initials.component.scss']
})
export class AvatarInitialsComponent implements OnInit {

  @Input() public photoUrl: string = '';
  @Input() public name: string = '';
  @Input() public size: number = 40; // px

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
    const regex = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');

    const initials = [...this.name.matchAll(regex)] || [];

    this.initials = (
      (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
    ).toUpperCase();
  }

}
