import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CourseCardComponent } from './card-component/card-component.component';
import { CourseImageComponent } from './course-image/course-image.component';

@NgModule({
  declarations: [
    AppComponent,
    CourseCardComponent,
    CourseImageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
