import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatInputModule,
         MatCardModule,
         MatButtonModule,
         MatToolbarModule,
         MatNativeDateModule,
         MatFormFieldModule,
         MatSnackBarModule,
         MatDatepickerModule,
         MatDividerModule,
         MatIconModule,
         MatProgressSpinnerModule,
         MatPaginatorModule} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './pacients/create/create.component';
import { HeaderComponent } from './header/header.component';
import { ListComponent } from './pacients/list/list.component';
import { from } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewComponent } from './pacients/view/view.component';
import { AttendCreateComponent } from './attend/attend-create/attend-create.component';
import { AttendListComponent } from './attend/attend-list/attend-list.component';
import { HttpConfigInterceptor } from './interceptor/httpconfig.iterceptor';

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    HeaderComponent,
    ListComponent,
    ViewComponent,
    AttendCreateComponent,
    AttendListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatNativeDateModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatPaginatorModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
