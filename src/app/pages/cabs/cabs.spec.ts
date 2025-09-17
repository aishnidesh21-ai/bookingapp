import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cabs } from './cabs';

describe('Cabs', () => {
  let component: Cabs;
  let fixture: ComponentFixture<Cabs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cabs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cabs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
