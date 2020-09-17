import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveToSellerComponent } from './move-to-seller.component';

describe('MoveToSellerComponent', () => {
  let component: MoveToSellerComponent;
  let fixture: ComponentFixture<MoveToSellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveToSellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveToSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
