import { ChangeDetectionStrategy, Component, effect, input, InputSignal, model, ModelSignal, OnDestroy, output, OutputEmitterRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, takeUntil } from 'rxjs';

@Component({
  selector: 'app-input',
  imports: [FormsModule],
  templateUrl: './input.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomInput implements OnDestroy {
  public label: InputSignal<string> = input<string>('');
  public placeholder: InputSignal<string> = input<string>('');
  public debounce: InputSignal<number> = input<number>(1000);
  public value: ModelSignal<string> = model<string>('');
  public blur: OutputEmitterRef<void> = output<void>();

  private inputSubject = new Subject<string>();
  private destroy$ = new Subject<void>();
  private subscriptionDestroy$ = new Subject<void>();
  private currentInputValue = '';

  constructor() {
    effect(() => {
      const debounceMs = this.debounce();
      this.subscriptionDestroy$.next();
      this.inputSubject
        .pipe(
          debounceTime(debounceMs),
          takeUntil(this.subscriptionDestroy$),
          takeUntil(this.destroy$)
        )
        .subscribe((val) => {
          this.value.set(val);
        });
    });
  }

  public handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.currentInputValue = target.value;
    this.inputSubject.next(target.value);
  }

  public handleBlur(): void {
    if (this.currentInputValue !== this.value()) {
      this.value.set(this.currentInputValue);
    }
    this.blur.emit();
  }

  ngOnDestroy(): void {
    this.subscriptionDestroy$.next();
    this.subscriptionDestroy$.complete();
    this.destroy$.next();
    this.destroy$.complete();
    this.inputSubject.complete();
  }
}
