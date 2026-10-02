import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent {
  // Inyección de dependencias
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);

  categorias = ['Electrónica', 'Ropa', 'Hogar', 'Alimentos', 'Juguetes'];

  enviando = signal(false);
  mensajeExito = signal('');
  productosRegistrados = signal<(Product & { id: number })[]>([]);

  form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
    precio: [null as number | null, [Validators.required, Validators.min(0.01), Validators.max(100000)]],
    categoria: ['', [Validators.required]],
    stock: [null as number | null, [Validators.required, Validators.min(0), Validators.max(10000), Validators.pattern(/^\d+$/)]],
    sku: ['', [Validators.required, Validators.pattern(/^[A-Z]{3}-\d{4}$/)]],
  });

  private mensajes: Record<string, (e: any) => string> = {
    required: () => 'Este campo es obligatorio.',
    minlength: (e) => `Mínimo ${e.requiredLength} caracteres (lleva ${e.actualLength}).`,
    maxlength: (e) => `Máximo ${e.requiredLength} caracteres.`,
    min: (e) => `El valor mínimo permitido es ${e.min}.`,
    max: (e) => `El valor máximo permitido es ${e.max}.`,
    pattern: () => 'El formato no es válido.',
  };

  private patronesCampo: Record<string, string> = {
    stock: 'El stock debe ser un número entero (sin decimales).',
    sku: 'Formato de SKU: 3 letras mayúsculas, guion y 4 números (ej. ABC-1234).',
  };

  mostrarError(control: AbstractControl): boolean {
    return control.invalid && (control.touched || control.dirty);
  }

  mostrarValido(control: AbstractControl): boolean {
    return control.valid && (control.touched || control.dirty);
  }

  errores(nombreCampo: string): string[] {
    const control = this.form.get(nombreCampo);
    if (!control || !control.errors) return [];

    return Object.keys(control.errors).map((clave) => {
      if (clave === 'pattern' && this.patronesCampo[nombreCampo]) {
        return this.patronesCampo[nombreCampo];
      }
      return this.mensajes[clave]?.(control.errors![clave]) ?? 'Valor inválido.';
    });
  }

  enviar(): void {
    this.mensajeExito.set('');

    // Solo se envía al servicio si el formulario es válido
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.warn('[Formulario] Inválido, no se envía al backend.');
      return;
    }

    this.enviando.set(true);
    const producto = this.form.getRawValue() as Product;

    this.productService.registrarProducto(producto).subscribe({
      next: (resp) => {
        this.mensajeExito.set(resp.mensaje);
        this.productosRegistrados.set(this.productService.obtenerProductos());
        this.enviando.set(false);
        this.form.reset();
      },
      error: () => this.enviando.set(false),
    });
  }

  limpiar(): void {
    this.form.reset();
    this.mensajeExito.set('');
  }
}