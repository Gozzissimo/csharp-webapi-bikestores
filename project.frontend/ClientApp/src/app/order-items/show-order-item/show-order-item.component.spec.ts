import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOrderItemComponent } from './show-order-item.component';

describe('ShowOrderItemComponent', () => {
  let component: ShowOrderItemComponent;
  let fixture: ComponentFixture<ShowOrderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowOrderItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowOrderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
