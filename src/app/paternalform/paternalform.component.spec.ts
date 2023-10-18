import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaternalformComponent } from './paternalform.component';

describe('PaternalformComponent', () => {
  let component: PaternalformComponent;
  let fixture: ComponentFixture<PaternalformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaternalformComponent]
    });
    fixture = TestBed.createComponent(PaternalformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
