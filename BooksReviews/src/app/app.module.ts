import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { JwtInterceptor } from './core/interceptors/jwt.intercenptor';
import { ResponseHandlerInterceptor } from './core/interceptors/response-handler.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { ListBookResolver } from './core/resolvers/list-books.resolver';
import { EditBookResolver } from './core/resolvers/edit-book.resolver';
import { MyPostsResolver } from './core/resolvers/my-porsts.resolver';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseHandlerInterceptor,
      multi: true
    },
    ListBookResolver,
    MyPostsResolver,
    EditBookResolver,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
