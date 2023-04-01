import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

import { Course } from "../model/course";

@Injectable({
  // means that setvice is the application Singleton
  providedIn: "root",
})
export class CoursesService {
  private COURSES_URL: string = "http://localhost:9000/api/courses/";

  constructor(private http: HttpClient) {}

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
