import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Loading } from './loading';

describe('Loading', () => {
  let component: Loading;
  let fixture: ComponentFixture<Loading>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Loading]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Loading);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default size of 3', () => {
    expect(component.size()).toBe(3);
  });

  it('should render loading spinner with correct classes', () => {
    const spinnerElement = fixture.nativeElement.querySelector('div.animate-spin');
    expect(spinnerElement).toBeTruthy();
    expect(spinnerElement.classList.contains('rounded-full')).toBe(true);
    expect(spinnerElement.classList.contains('border-gray-300')).toBe(true);
    expect(spinnerElement.classList.contains('border-t-blue-500')).toBe(true);
  });

  it('should apply size correctly to spinner', () => {
    fixture.componentRef.setInput('size', 5);
    fixture.detectChanges();
    const spinnerElement = fixture.nativeElement.querySelector('div.animate-spin');
    expect(spinnerElement.style.width).toBe('5rem');
    expect(spinnerElement.style.height).toBe('5rem');
  });

  it('should have fixed positioning container', () => {
    const containerElement = fixture.nativeElement.querySelector('div.flex');
    expect(containerElement).toBeTruthy();
    expect(containerElement.classList.contains('fixed')).toBe(true);
    expect(containerElement.classList.contains('inset-0')).toBe(true);
  });
});
