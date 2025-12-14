import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmptyState } from './empty-state';

describe('EmptyState', () => {
  let component: EmptyState;
  let fixture: ComponentFixture<EmptyState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyState]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyState);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the empty state message', () => {
    const messageElement = fixture.nativeElement.querySelector('span');
    expect(messageElement).toBeTruthy();
    expect(messageElement.textContent.trim()).toBe('Nenhum registro encontrado!');
  });

  it('should contain a card component', () => {
    const cardElement = fixture.nativeElement.querySelector('app-card');
    expect(cardElement).toBeTruthy();
  });

  it('should have correct styling classes', () => {
    const containerElement = fixture.nativeElement.querySelector('div.flex');
    expect(containerElement).toBeTruthy();
    expect(containerElement.classList.contains('justify-center')).toBe(true);
  });
});
