import {
  Directive,
  HostBinding,
  HostListener,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";

@Directive({
  selector: "[highlighted]",
  exportAs: "hl",
})
export class HighlightedDirective {
  @Input("highlighted")
  isHighlighted = false;

  @Output()
  toggleHighlighted = new EventEmitter();

  constructor() {
    console.log("Highlighted directive is created");
  }

  // with @HostBinding decorator we can write porperty to the known DOM property (attribute)
  @HostBinding("class.highlighted")
  get cssClasses() {
    return this.isHighlighted;
  }

  // The equal way to write the class ↓:
  // @HostBinding("className")
  // get cssClasses() {
  //   return "highlighted";
  // }

  @HostBinding("attr.disabled")
  get disabled(): boolean {
    return true;
  }

  // Handling events in Directives
  // we have access to native event object as arguments
  @HostListener("mouseover", ["$event"])
  mouseOver($event) {
    console.log("$event ", $event);
    this.isHighlighted = true;
    this.toggleHighlighted.emit(this.isHighlighted);
  }

  @HostListener("mouseleave")
  mouseLeave() {
    this.isHighlighted = false;
    this.toggleHighlighted.emit(this.isHighlighted);
  }

  // @HostListener("click")
  // mouseClick() {
  //   this.toggleHighlighted.emit(this.isHighlighted = !this.isHighlighted);
  // }

  toggle() {
    this.isHighlighted = !this.isHighlighted;
    this.toggleHighlighted.emit(this.isHighlighted);
  }
}
