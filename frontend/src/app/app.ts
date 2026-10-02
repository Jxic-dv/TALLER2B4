import { Component } from '@angular/core';
import { ProductFormComponent } from './product-form/product-form.component';

@Component({
  selector: 'app-root',
  imports: [ProductFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}