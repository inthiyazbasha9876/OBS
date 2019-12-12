import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import {routes} from'./app-routing.module';
import { TokenInterceptor } from './services/token-interceptor';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes,{useHash: true}),
    HttpClientModule,
  ],
  providers: [AuthService, AuthGuard,{ useClass: TokenInterceptor,provide:HTTP_INTERCEPTORS,multi: true},],
  bootstrap: [AppComponent,]
})
export class AppModule { }
