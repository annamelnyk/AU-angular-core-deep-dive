import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  Attribute,
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
export class CourseCardComponent {
  @Input() course: Course;
  @Input() index: number;
  @Output() onViewCourse = new EventEmitter<Course>();

  // @Attribute decorator - is performance optimization of Angular,
  // which prevents fron continiously checking if value was changed
  constructor(@Attribute("type") private type: string) {
    console.log("type ", type);
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
