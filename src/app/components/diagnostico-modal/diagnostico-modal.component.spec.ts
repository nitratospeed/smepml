import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticoModalComponent } from './diagnostico-modal.component';

describe('DiagnosticoModalComponent', () => {
  let component: DiagnosticoModalComponent;
  let fixture: ComponentFixture<DiagnosticoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosticoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
