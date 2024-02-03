import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoGraphicComponent } from './no-graphic.component';

describe('GraphicComponent', () => {
  let component: NoGraphicComponent;
  let fixture: ComponentFixture<NoGraphicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoGraphicComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NoGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
