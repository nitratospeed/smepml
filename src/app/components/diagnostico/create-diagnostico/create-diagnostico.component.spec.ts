import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDiagnosticoComponent } from './create-diagnostico.component';

describe('CreateDiagnosticoComponent', () => {
  let component: CreateDiagnosticoComponent;
  let fixture: ComponentFixture<CreateDiagnosticoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDiagnosticoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDiagnosticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
