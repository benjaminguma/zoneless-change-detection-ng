import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  NgZone,
  OnChanges,
  OnInit,
  afterRender,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ChildCounterComponent } from './child-counter/child-counter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ChildCounterComponent],
  template: `
    <h3>Instance variable counter {{ count }}</h3>
    <button (click)="increment()">inc count</button>

    <h3>signal counter {{ signalCount() }}</h3>
    <button (click)="incrementSignal()">inc count</button>

    <h3>observable counter {{ observableCount | async }}</h3>
    <button (click)="incrementObservable()">inc count</button>

    {{ detectChanges() }}

    <app-child-counter></app-child-counter>
  `,
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnChanges {
  cdr = inject(ChangeDetectorRef);

  observableCount = new BehaviorSubject(0);
  signalCount = signal<number>(0);

  count = 0;

  increment() {
    this.count++;
  }
  incrementSignal() {
    this.signalCount.set(this.signalCount() + 1);

    console.log('signalCount', this.signalCount());
  }

  incrementObservable() {
    this.observableCount.next(this.observableCount.value + 1);
  }

  ngOnInit(): void {
    setInterval(() => {
      this.increment();
      this.cdr.markForCheck();
    }, 100);
  }

  ngOnChanges(changes: any): void {
    console.log(changes);
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log({ inAngularZone: NgZone.isInAngularZone() });
  }

  detectChanges() {
    console.log(' ROOT_COMPONENT detected changes', new Date().getSeconds());
  }
}
