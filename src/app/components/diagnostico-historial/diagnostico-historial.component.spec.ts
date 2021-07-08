import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticoHistorialComponent } from './diagnostico-historial.component';

describe('DiagnosticoHistorialComponent', () => {
  let component: DiagnosticoHistorialComponent;
  let fixture: ComponentFixture<DiagnosticoHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosticoHistorialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticoHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
