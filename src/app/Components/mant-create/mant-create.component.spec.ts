import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantCreateComponent } from './mant-create.component';

describe('MantCreateComponent', () => {
  let component: MantCreateComponent;
  let fixture: ComponentFixture<MantCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MantCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MantCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
