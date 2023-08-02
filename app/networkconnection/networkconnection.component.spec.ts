import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkconnectionComponent } from './networkconnection.component';

describe('NetworkconnectionComponent', () => {
  let component: NetworkconnectionComponent;
  let fixture: ComponentFixture<NetworkconnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetworkconnectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkconnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
