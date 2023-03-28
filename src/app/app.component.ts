import {
  Component,
  ElementRef,
  ViewChild,
  ViewChildren,
  AfterViewInit,
  QueryList,
} from "@angular/core";
import { COURSES } from "../db-data";
import { Course } from "./model/course";
import { CourseCardComponent } from "./card-component/card-component.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements AfterViewInit {
  courses: Course = COURSES;
  date = new Date();

  // @ViewChild and @ViewChildren - is a local quering mechanism.
  // They cannot see deeper into children or parents templates

  // @ViewChild -decorator, lets us query child of the AppComponent
  // @ViewChild have access only to direct top-level child of AppComponent
  // doesn't have access to child's template
  @ViewChild("rxjsCourse") card: CourseCardComponent;
  @ViewChild("containerRef") container: ElementRef;

  // @ViewChild -decorator, lets us query list of particular children of the AppComponent
  @ViewChildren(CourseCardComponent) cards: QueryList<CourseCardComponent>;

  constructor() {
    console.log("@ViewChild container ", this.container);
  }

  clickViewCourse(course) {
    console.log("toto", course);
    console.log("@ViewChild container ", this.container);
    console.log("@ViewChild card ", this.card);
  }

  ngAfterViewInit(): void {
    // the earliest hook when we have access to @ViewChild
    console.log("ngAfterViewInit @ViewChild container ", this.container);

    // in AfterViewInit lifecycle hook component data could not be modified (here framework
    // doesnt know yet what data should be displayed inside the view)

    //here could not be quieried template of child components (can not come deeper in child's elements)
    console.log("ngAfterViewInit @ViewChildren cards ", this.cards);
  }
}
