import {
  Component,
  ElementRef,
  ViewChild,
  ViewChildren,
  AfterViewInit,
  QueryList,
  OnInit,
  OnDestroy,
  DoCheck,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { COURSES } from "../db-data";
import { Course } from "./model/course";
import { CourseCardComponent } from "./card-component/card-component.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit, OnInit, DoCheck, OnDestroy {
  private COURSES_URL: string = "http://localhost:9000/api/courses/";
  courses$: Observable<Course[]>;
  courses: Course[];
  date = new Date();
  loaded: boolean | undefined = false;

  // @ViewChild and @ViewChildren - is a local quering mechanism.
  // They cannot see deeper into children or parents templates

  // @ViewChild -decorator, lets us query child of the AppComponent
  // @ViewChild have access only to direct top-level child of AppComponent
  // doesn't have access to child's template
  @ViewChild("rxjsCourse") card: CourseCardComponent;
  @ViewChild("containerRef") container: ElementRef;

  // @ViewChild -decorator, lets us query list of particular children of the AppComponent
  @ViewChildren(CourseCardComponent) cards: QueryList<CourseCardComponent>;

  // no logic should be implemented in constructor, only
  // passing the dependencies
  constructor(private http: HttpClient, private cd: ChangeDetectorRef) {
    console.log("@ViewChild container ", this.container);
  }

  ngDoCheck(): void {
    // to prevevnt redundant check, we should add flag this.loaded
    if (this.loaded) {
      // Custom Change Detection with ChangeDetectorRef
      this.cd.markForCheck();

      this.loaded = undefined;
    }
  }

  ngOnInit(): void {
    this.http.get<Course[]>(this.COURSES_URL).subscribe((courses: any) => {
      this.courses = courses?.payload;
      this.loaded = true;
    });
  }

  ngOnDestroy() {
    // right place for unsubscribe fron resources
    console.log("Ondestroy");
  }

  clickViewCourse(course) {
    console.log("toto", course);
    console.log("@ViewChild container ", this.container);
    console.log("@ViewChild card ", this.card);
  }

  onEditCourse() {
    // this way not working because we're trying to mutate the course directly ↓
    // this.courses[1].description = 'New Title';
    console.log("onEditCourse");
    const newCourse = { ...this.courses[1] };
    newCourse.description = "new Title";
    this.courses[1] = newCourse;

    this.courses = [];
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
