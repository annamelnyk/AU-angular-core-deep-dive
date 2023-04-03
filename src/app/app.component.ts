import { Component, OnInit, InjectionToken, Inject } from "@angular/core";
import { Course } from "./model/course";
import { Observable } from "rxjs";
import { CoursesService } from "./services/courses.service";
import { HttpClient } from "@angular/common/http";
import { APP_CONFIG, AppConfig, CONFIG_TOKEN } from "./config";

// build custom provider
function coursesServiceProvider(http: HttpClient): CoursesService {
  return new CoursesService(http);
}

// Providing unique Injection Token
export const COURSES_SERVICE = new InjectionToken<CoursesService>(
  "COURSES_SERVICE"
);
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [
    {
      provide: COURSES_SERVICE,
      useFactory: coursesServiceProvider,
      deps: [HttpClient], // dependency for current provider
    },
    {
      provide: CONFIG_TOKEN,
      // useFactory: () => APP_CONFIG, OR ↓
      useValue: APP_CONFIG
    },
  ],
})
export class AppComponent implements OnInit {
  //var$ - stands for Observable
  courses$: Observable<Course[]>;

  constructor(
    @Inject(COURSES_SERVICE)
    private coursesService: CoursesService,
    
    @Inject(CONFIG_TOKEN)
    private config: AppConfig
  ) {
    console.log("app config ", this.config);
  }

  ngOnInit() {
    this.courses$ = this.coursesService.loadCourses();
  }

  save(course: Course) {
    this.coursesService.saveCourse(course).subscribe(console.log);
  }
}
