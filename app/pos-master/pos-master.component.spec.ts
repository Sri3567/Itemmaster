import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosMasterComponent } from './pos-master.component';

describe('PosMasterComponent', () => {
  let component: PosMasterComponent;
  let fixture: ComponentFixture<PosMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
