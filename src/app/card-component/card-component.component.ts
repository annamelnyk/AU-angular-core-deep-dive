import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Course } from "../model/course";
export { CATEGORY } from "../model/constants";

@Component({
  selector: "card-component",
  templateUrl: "./card-component.component.html",
  styleUrls: ["./card-component.component.css"],
})
export class CourseCardComponent {
  @Input() course: Course;
  @Input() index: number;
  @Output() onViewCourse = new EventEmitter<Course>();

  viewCourse(course: Course) {
    console.log("viewCourse ", course);
    this.onViewCourse.emit(course);
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
