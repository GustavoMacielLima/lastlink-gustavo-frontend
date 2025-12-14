import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { Button } from './button';

describe('Button', () => {
  let component: Button;
  let fixture: ComponentFixture<Button>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Button]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Button);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onClick event when action is called', () => {
    const emitSpy = vi.spyOn(component.onClick, 'emit');
    component.action();
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should have default values', () => {
    expect(component.label()).toBe('');
    expect(component.type()).toBe('button');
    expect(component.isDisabled()).toBe(false);
    expect(component.style()).toBe('primary');
  });

  it('should render label correctly', () => {
    fixture.componentRef.setInput('label', 'Test Button');
    fixture.detectChanges();
    const buttonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.textContent.trim()).toBe('Test Button');
  });

  it('should apply primary style by default', () => {
    const buttonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.classList.contains('bg-blue-500')).toBe(true);
    expect(buttonElement.classList.contains('text-white')).toBe(true);
  });

  it('should apply secondary style when set', () => {
    fixture.componentRef.setInput('style', 'secondary');
    fixture.detectChanges();
    const buttonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.classList.contains('bg-white')).toBe(true);
    expect(buttonElement.classList.contains('text-blue-500')).toBe(true);
    expect(buttonElement.classList.contains('border-blue-500')).toBe(true);
  });

  it('should be disabled when isDisabled is true', () => {
    fixture.componentRef.setInput('isDisabled', true);
    fixture.detectChanges();
    const buttonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.disabled).toBe(true);
    expect(buttonElement.getAttribute('aria-disabled')).toBe('true');
  });

  it('should set button type correctly', () => {
    fixture.componentRef.setInput('type', 'submit');
    fixture.detectChanges();
    const buttonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.type).toBe('submit');
  });

  it('should call action when button is clicked', () => {
    const actionSpy = vi.spyOn(component, 'action');
    const buttonElement = fixture.nativeElement.querySelector('button');
    buttonElement.click();
    expect(actionSpy).toHaveBeenCalled();
  });
});
