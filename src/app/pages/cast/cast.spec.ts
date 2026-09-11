import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cast } from './cast';

describe('Cast', () => {
  let component: Cast;
  let fixture: ComponentFixture<Cast>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cast]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Cast);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
