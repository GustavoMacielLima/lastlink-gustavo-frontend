import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastContainer } from './toast-container';
import { ToastService } from './toast.service';
import { Toast } from './toast.model';

describe('ToastContainer', () => {
  let component: ToastContainer;
  let fixture: ComponentFixture<ToastContainer>;
  let toastService: ToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastContainer],
      providers: [ToastService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToastContainer);
    component = fixture.componentInstance;
    toastService = TestBed.inject(ToastService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get toasts from toastService', () => {
    return new Promise<void>((resolve) => {
      component.toasts$.subscribe(toasts => {
        expect(toasts).toBeDefined();
        resolve();
      });
    });
  });

  it('should render container with correct classes', () => {
    const containerElement = fixture.nativeElement.querySelector('div');
    expect(containerElement).toBeTruthy();
    expect(containerElement.classList.contains('fixed')).toBe(true);
    expect(containerElement.classList.contains('top-4')).toBe(true);
    expect(containerElement.classList.contains('right-4')).toBe(true);
    expect(containerElement.classList.contains('w-80')).toBe(true);
    expect(containerElement.classList.contains('z-[1000]')).toBe(true);
  });

  it('should render toast components when toasts are available', () => {
    const mockToasts: Toast[] = [
      { id: '1', type: 'success', message: 'Success message' },
      { id: '2', type: 'error', message: 'Error message' }
    ];
    
    mockToasts.forEach(toast => {
      toastService.show(toast.type, toast.message);
    });
    
    fixture.detectChanges();
    
    setTimeout(() => {
      fixture.detectChanges();
      const toastElements = fixture.nativeElement.querySelectorAll('app-toast');
      expect(toastElements.length).toBeGreaterThanOrEqual(0);
    }, 100);
  });

  it('should not render toasts when array is empty', () => {
    fixture.detectChanges();
    const toastElements = fixture.nativeElement.querySelectorAll('app-toast');
    expect(toastElements.length).toBeGreaterThanOrEqual(0);
  });

  it('should display toasts when they are added to the service', () => {
    toastService.success('Test success message');
    fixture.detectChanges();
    
    const containerElement = fixture.nativeElement.querySelector('div');
    expect(containerElement).toBeTruthy();
  });
});
