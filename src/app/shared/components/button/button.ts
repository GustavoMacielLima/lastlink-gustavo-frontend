import { ChangeDetectionStrategy, Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Button {
  public label: InputSignal<string> = input<string>('');
  public type: InputSignal<string> = input<string>('button');
  public isDisabled: InputSignal<boolean> = input<boolean>(false);
  public style: InputSignal<string> = input<string>('primary');
  public onClick: OutputEmitterRef<void> = output<void>();

  constructor(){}

  public action(): void {
    this.onClick.emit();
  }
}
