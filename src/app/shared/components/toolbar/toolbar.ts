import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  imports: [CommonModule],
  templateUrl: './toolbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Toolbar implements OnInit {
  constructor(
  ) {}

  ngOnInit(): void {
  }
}