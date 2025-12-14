import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { Toast } from './toast';
import { ToastService } from './toast.service';
import { ToastType } from './toast.model';

describe('Toast', () => {
  let component: Toast;
  let fixture: ComponentFixture<Toast>;
  let toastService: ToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Toast],
      providers: [ToastService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Toast);
    component = fixture.componentInstance;
    toastService = TestBed.inject(ToastService);
    
    fixture.componentRef.setInput('id', 'test-id');
    fixture.componentRef.setInput('type', 'success');
    fixture.componentRef.setInput('message', 'Test message');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render message correctly', () => {
    const messageElement = fixture.nativeElement.textContent.trim();
    expect(messageElement).toBe('Test message');
  });

  it('should apply success styles when type is success', () => {
    fixture.componentRef.setInput('type', 'success');
    fixture.detectChanges();
    const toastElement = fixture.nativeElement.querySelector('div');
    expect(toastElement.classList.contains('bg-green-100')).toBe(true);
    expect(toastElement.classList.contains('text-green-800')).toBe(true);
  });

  it('should apply warning styles when type is warning', () => {
    fixture.componentRef.setInput('type', 'warning');
    fixture.detectChanges();
    const toastElement = fixture.nativeElement.querySelector('div');
    expect(toastElement.classList.contains('bg-yellow-100')).toBe(true);
    expect(toastElement.classList.contains('text-yellow-800')).toBe(true);
  });

  it('should apply error styles when type is error', () => {
    fixture.componentRef.setInput('type', 'error');
    fixture.detectChanges();
    const toastElement = fixture.nativeElement.querySelector('div');
    expect(toastElement.classList.contains('bg-red-100')).toBe(true);
    expect(toastElement.classList.contains('text-red-800')).toBe(true);
  });

  it('should have default type as success', () => {
    fixture.componentRef.setInput('id', 'test-id-2');
    fixture.componentRef.setInput('message', 'Test');
    fixture.detectChanges();
    expect(component.type()).toBe('success');
  });

  it('should call dismiss when clicked', () => {
    const dismissSpy = vi.spyOn(component, 'dismiss');
    const toastElement = fixture.nativeElement.querySelector('div');
    toastElement.click();
    expect(dismissSpy).toHaveBeenCalled();
  });

  it('should call toastService.remove when dismiss is called', () => {
    const removeSpy = vi.spyOn(toastService, 'remove');
    component.dismiss();
    expect(removeSpy).toHaveBeenCalledWith('test-id');
  });

  it('should have cursor-pointer class', () => {
    const toastElement = fixture.nativeElement.querySelector('div');
    expect(toastElement.classList.contains('cursor-pointer')).toBe(true);
  });

  it('should have shadow-md class', () => {
    const toastElement = fixture.nativeElement.querySelector('div');
    expect(toastElement.classList.contains('shadow-md')).toBe(true);
  });
});
