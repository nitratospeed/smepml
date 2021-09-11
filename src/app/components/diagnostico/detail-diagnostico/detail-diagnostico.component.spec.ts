import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDiagnosticoComponent } from './detail-diagnostico.component';

describe('DetailDiagnosticoComponent', () => {
  let component: DetailDiagnosticoComponent;
  let fixture: ComponentFixture<DetailDiagnosticoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailDiagnosticoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailDiagnosticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
