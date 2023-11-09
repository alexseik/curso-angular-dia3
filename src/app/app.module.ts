import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CandidateListComponent } from './components/candidate-list/candidate-list.component';
import { CandidateCardComponent } from './components/candidate-card/candidate-card.component';
import { AppMaterialModule } from './app-material.module';
import { APP_CONFIG, Config } from './config/app.config';

@NgModule({
  declarations: [AppComponent, CandidateListComponent, CandidateCardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: APP_CONFIG,
      useValue: Config,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
