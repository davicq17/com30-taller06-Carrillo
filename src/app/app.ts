import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StorageService } from './services/storage.service';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('com30-taller06-Carrillo');
}
