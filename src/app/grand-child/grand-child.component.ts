import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  inject,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-grand-child',
  standalone: true,
  imports: [],
  template: `
    <h1>Grand child Component</h1>

    <h3>Instance variable counter {{ count }}</h3>
    <button (click)="increment()">inc count</button>

    {{ detectChanges() }}
    <h3>signal counter {{ signalCount() }}</h3>
    <button (click)="incrementSignal()">inc count</button>
  `,
  styles: `
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GrandChildComponent {
  cdr = inject(ChangeDetectorRef);

  detectChanges() {
    console.log(
      ' GRAND_CHILD_COMPONENT detected changes',
      new Date().getSeconds()
    );
  }
  signalCount = signal<number>(0);
  count = 0;
  incrementSignal() {
    this.signalCount.set(this.signalCount() + 1);
    console.log('signalCount', this.signalCount());
  }

  increment() {
    this.count++;
    this.cdr.markForCheck();
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    setTimeout(() => {
      console.log('=====');
      this.increment();
    }, 1000);
  }
}
