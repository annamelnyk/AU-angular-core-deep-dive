import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

import { Course } from "../model/course";

// @Injectable({
//   // means that setvice is the application Singleton
//   providedIn: "root",

let counter = 0;

// for Singletons we should always prefer Tree-Shakeable syntax because
// it result is smaller application bundle and better runtime performance
@Injectable({
  // here used Tree-Shakeable Provider syntax used inside Injectable decorator
  providedIn: "root",
  // manually add provider function for service
  // option 1
  useFactory: (http) => new CoursesService(http),
  deps: [HttpClient],

  // option 2
  //useClass: CoursesService,
})
export class CoursesService {
  private COURSES_URL: string = "http://localhost:9000/api/courses/";
  id: number;

  constructor(private http: HttpClient) {
    counter++;
    this.id = counter;
    console.log("CoursesService.id = ", this.id);
  }

  loadCourses(): Observable<Course[]> {
    const params = new HttpParams().set("page", "1").set("pageSize", "10");

    return this.http.get<Course[]>(this.COURSES_URL, { params });
  }

  saveCourse(course: Course) {
    const headers = new HttpHeaders().set("X-Auth", "userId");

    return this.http.put(`${this.COURSES_URL}${course.id}`, course, {
      headers,
    });
  }
}
