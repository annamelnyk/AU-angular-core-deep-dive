import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CourseCardComponent } from './card-component/card-component.component';
import { FilterByCategoryPipe } from './courses/filter-by-category.pipe';
import { CourseTitleComponent } from './course-title/course-title.component';

@NgModule({
  declarations: [
    // here we put components, directives, pipes
    AppComponent,
    CourseCardComponent,
    FilterByCategoryPipe,
    CourseTitleComponent,
  ],
  imports: [
    // dependencies modules here
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
  providers: [
  //here providers for services our application need
  ],
  bootstrap: [
    // root components for our app
    AppComponent
  ],
  entryComponents: [CourseTitleComponent]
})
export class AppModule { }
