import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Card } from './card';

describe('Card', () => {
  let component: Card;
  let fixture: ComponentFixture<Card>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Card]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Card);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render with correct classes', () => {
    const cardElement = fixture.nativeElement.querySelector('div');
    expect(cardElement).toBeTruthy();
    expect(cardElement.classList.contains('bg-white')).toBe(true);
    expect(cardElement.classList.contains('rounded-lg')).toBe(true);
    expect(cardElement.classList.contains('shadow-2xl')).toBe(true);
  });

  it('should have ng-content for content projection', () => {
    const cardElement = fixture.nativeElement.querySelector('div');
    expect(cardElement).toBeTruthy();
    expect(cardElement.innerHTML).toContain('');
  });
});
