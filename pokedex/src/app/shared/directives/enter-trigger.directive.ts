import {Directive, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[enterTrigger]',
  standalone: true
})
export class EnterTriggerDirective {

  @Input() filterFunction!: () => void;

  @HostListener('keydown.enter', ['$event'])
  onEnterKey(event: KeyboardEvent) {
    event.preventDefault();
    this.filterFunction();
  }
}
