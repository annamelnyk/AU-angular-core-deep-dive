import { Pipe, PipeTransform } from "@angular/core";
import { Course } from "../model/course";

@Pipe({
  name: "filterByCategory",
  // by default pipes are pure: true
  // if pipe is impure - method transform will be called if value (courses here) 
  // was changed/mutated
  // impure pipes can be expensive operations (depends on what is
  // implemented in transform())
  pure: false
})
export class FilterByCategoryPipe implements PipeTransform {
  transform(courses: Course[], category: string): Course[] {
    return courses.filter((course) => course?.category === category);
  }
}
