import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app';
import { MdCardModule } from '@angular2-material/card';

@NgModule({
    imports: [BrowserModule, MdCardModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }