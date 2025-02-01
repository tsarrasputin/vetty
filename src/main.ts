import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BoardComponent } from './app/board/board.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BoardComponent],
  template: '<app-board></app-board>'
})
export class App {}

bootstrapApplication(App, {
  providers: [provideAnimations()]
});