import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteOrderItemComponent } from './delete-order-item.component';

describe('DeleteOrderItemComponent', () => {
  let component: DeleteOrderItemComponent;
  let fixture: ComponentFixture<DeleteOrderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteOrderItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteOrderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
