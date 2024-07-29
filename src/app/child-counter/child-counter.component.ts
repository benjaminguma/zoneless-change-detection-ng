import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  signal,
} from '@angular/core';
import { GrandChildComponent } from '../grand-child/grand-child.component';

@Component({
  selector: 'app-child-counter',
  standalone: true,
  imports: [GrandChildComponent],
  template: `
    <h1>child-counter Component</h1>

    <h3>Instance variable counter {{ count }}</h3>
    <button (click)="increment()">inc count</button>

    {{ detectChanges() }}
    <h3>signal counter {{ signalCount() }}</h3>
    <button (click)="incrementSignal()">inc count</button>

    <app-grand-child />
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildCounterComponent {
  cdr = inject(ChangeDetectorRef);
  detectChanges() {
    console.log('CHILD_COMPONENT detected changes', new Date().getSeconds());
  }
  signalCount = signal<number>(0);
  count = 0;
  incrementSignal() {
    this.signalCount.set(this.signalCount() + 1);
    console.log('signalCount', this.signalCount());
  }

  increment() {
    this.count++;
    // this.cdr.detectChanges();
    console.log('count', this.count);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // setTimeout(() => {
    //   this.increment();
    // }, 5000);
  }
}
