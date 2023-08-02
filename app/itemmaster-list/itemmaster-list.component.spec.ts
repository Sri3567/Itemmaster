import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemmasterListComponent } from './itemmaster-list.component';

describe('ItemmasterListComponent', () => {
  let component: ItemmasterListComponent;
  let fixture: ComponentFixture<ItemmasterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemmasterListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemmasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
