import { CourseImageComponent } from "./../course-image/course-image.component";
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ContentChild,
  ContentChildren,
  AfterViewInit,
  AfterContentInit,
  ElementRef,
  QueryList,
} from "@angular/core";
import { Course } from "../model/course";
export { CATEGORY } from "../model/constants";

@Component({
  selector: "card-component",
  templateUrl: "./card-component.component.html",
  styleUrls: ["./card-component.component.css"],
})
export class CourseCardComponent implements AfterViewInit, AfterContentInit {
  @Input() course: Course;
  @Input() index: number;
  @Output() onViewCourse = new EventEmitter<Course>();

  // @ViewChild decorater can refer to the elements which are visible in component's template
  // i.o. it can not query Content Projection (via ng-content)
  // for this should be used @ContentChild decorator
  // scope og what we can query with @ContentChild - is only what is in <ng-content>
  // can be queried by selector or by component
  @ContentChild("courseNumber")
  courseNum;

  // @ContentChild(CourseImageComponent, { read: ElementRef })
  // image: ElementRef;

  @ContentChildren(CourseImageComponent)
  images: QueryList<CourseCardComponent>;

  ngAfterViewInit(): void {
    console.log("AfterViewInit in card-components: ", this.courseNum);
    console.log("AfterViewInit in card-components: ", this.images);
  }

  ngAfterContentInit(): void {
    console.log("AfterContentInit in card-components: ", this.images);
  }

  viewCourse(course: Course) {
    console.log("viewCourse ", course);
    this.onViewCourse.emit(course);
  }

  cardClasses() {
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
