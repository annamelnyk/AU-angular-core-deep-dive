import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  Attribute,
  OnChanges,
  AfterContentInit,
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  OnInit,
  OnDestroy,
  DoCheck,
} from "@angular/core";
import { Course } from "../model/course";
export { CATEGORY } from "../model/constants";

@Component({
  selector: "card-component",
  templateUrl: "./card-component.component.html",
  styleUrls: ["./card-component.component.css"],
  // ChangeDetectionStrategy.OnPush is effectively faster and trickier to use
  // it will detect all changes that come via @input
  // it doesn't let to mutate existing object directly (see onEditCourse() in app.component.ts)
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseCardComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentChecked,
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    OnDestroy
{
  @Input() course: Course;
  @Input() index: number;
  @Output() onViewCourse = new EventEmitter<Course>();

  // @Attribute decorator - is performance optimization of Angular,
  // which prevents fron continiously checking if value was changed
  constructor(@Attribute("type") private type: string) {
    console.log("constructor");
    console.log("type ", type);
  }

  ngOnInit() {
    console.log("OnInit ---> ");
  }

  ngDoCheck(): void {
    // the place for custom change detection logic
    console.log("doCheck");
  }

  ngOnChanges(changes) {
    // right place for comparing previous value with current value
    console.log("OnChanges ---> ", changes);
  }

  ngAfterContentInit(): void {
    // the right place for @ContentChild or @ContentsChildren
    // implementattion logic

    // used if we do content projection (ng-content) 
    console.log("AfterContentInit");
  }

  ngAfterContentChecked() {
    if (this.course) {
      // right place to do last second modification
      this.course.description = "OnAfterContentChanged";
      // this.course.iconUrl = '';
    }

    // its called whenever the Angular finishes to check content part
    // it will called with every event that Angular is handling
    // here we cannot modified the data in the content part of the component
    console.log("OnAfterContentChanged ---> ");
  }

  ngAfterViewInit(): void {
    // the right place for @ViewChild or @ViewChildren
    // implementattion logic

    console.log("AfterViewInit");
  }

  ngAfterViewChecked() {
    // runs after AfterContentChecked
    // here we cannot modified content directly
    console.log("ngAfterViewChecked ---> ");
    // great place to perform common DOM operations (scrolling,
    // put focus on the element, etc)
  }

  ngOnDestroy() {
    // if we use Angular async pipe - it will automatically unsubscribe 
    // and we don't need to do it here
    console.log("OnDestroy ---> ");
  }

  viewCourse(course: Course) {
    console.log("viewCourse ", course);
    this.onViewCourse.emit(course);
  }

  onChangeDescription(newTitle: string) {
    this.course.description = newTitle;
  }

  cardClasses() {
    // if (this.course.category === 'BEGINNER') {
    //   return 'beginner';
    // }
    return {
      beginner: this.course.category === "BEGINNER",
      intermediate: this.course.category === "INTERMEDIATE",
      advanced: this.course.category === "ADVANCED",
    };
  }

  cardStyles() {
    return { "text-decoration": "underline" };
  }
}
