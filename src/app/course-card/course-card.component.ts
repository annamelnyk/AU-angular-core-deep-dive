import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Inject,
  Self,
  Optional,
} from "@angular/core";
import { Course } from "../model/course";
import { CoursesService } from "../services/courses.service";
import { COURSES_SERVICE } from "../app.component";
@Component({
  selector: "course-card",
  templateUrl: "./course-card.component.html",
  styleUrls: ["./course-card.component.css"],
  providers: [CoursesService],
})
export class CourseCardComponent implements OnInit {
  @Input()
  course: Course;

  @Input()
  cardIndex: number;

  @Output("courseChanged")
  courseEmitter = new EventEmitter<Course>();

  // This secorators for edge cases are used:
  // @Self() decorator overrides default behavior of DI. This dependency will
  // not come longer from parent component, it can come only from the component itself!

  // @SkipSelf() provider will ignore current service provider and will search
  // provider in parent components

  // with Optional decorator app will not be crash if no service provided
  // but in ngOnInit we should handle case when service is not provided
  constructor(@Optional() private coursesService: CoursesService) {}

  ngOnInit() {}

  onSaveClicked(description: string) {
    this.courseEmitter.emit({ ...this.course, description });
  }
}
