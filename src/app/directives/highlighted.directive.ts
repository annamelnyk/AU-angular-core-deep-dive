import { CoursesService } from "./../services/courses.service";
import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  Host,
} from "@angular/core";

@Directive({
  selector: "[highlighted]",
  exportAs: "hl",
})
export class HighlightedDirective {
  @Input("highlighted")
  isHighlighted = false;

  @Output()
  toggleHighlight = new EventEmitter();

  // @Host decorator will get the service provider from component
  // where directive is located(hosted)
  constructor(@Host() private coursesService: CoursesService) {
    console.log("CoursesService highlighted: ", this.coursesService.id);
  }

  @HostBinding("class.highlighted")
  get cssClasses() {
    return this.isHighlighted;
  }

  @HostListener("mouseover", ["$event"])
  mouseOver($event) {
    console.log($event);

    this.isHighlighted = true;
    this.toggleHighlight.emit(this.isHighlighted);
  }

  @HostListener("mouseleave")
  mouseLeave() {
    this.isHighlighted = false;
    this.toggleHighlight.emit(this.isHighlighted);
  }

  toggle() {
    this.isHighlighted = !this.isHighlighted;
    this.toggleHighlight.emit(this.isHighlighted);
  }
}
