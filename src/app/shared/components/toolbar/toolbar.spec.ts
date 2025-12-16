import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { Toolbar } from './toolbar';

describe('Toolbar', () => {
  let component: Toolbar;
  let fixture: ComponentFixture<Toolbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Toolbar]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Toolbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render toolbar', () => {
    const imgElement = fixture.nativeElement.querySelector('img');
    expect(imgElement).toBeTruthy();
    expect(imgElement.getAttribute('alt')).toBe('Logo');
  });

  it('should have correct styling classes', () => {
    const containerElement = fixture.nativeElement.querySelector('div');
    expect(containerElement).toBeTruthy();
    expect(containerElement.classList.contains('w-full')).toBe(true);
    expect(containerElement.classList.contains('min-h-14')).toBe(true);
    expect(containerElement.classList.contains('flex')).toBe(true);
    expect(containerElement.classList.contains('items-center')).toBe(true);
  });

  it('should call ngOnInit on initialization', () => {
    const ngOnInitSpy = vi.spyOn(component, 'ngOnInit');
    component.ngOnInit();
    expect(ngOnInitSpy).toHaveBeenCalled();
  });
});
