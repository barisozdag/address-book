import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarInitialsComponent } from './avatar-initials.component';

describe('AvatarInitialsComponent', () => {
  let component: AvatarInitialsComponent;
  let fixture: ComponentFixture<AvatarInitialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvatarInitialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarInitialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
