import { Injectable } from '@angular/core';
import { Observable, of, delay, tap } from 'rxjs';
import { Product, ProductResponse } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private productos: (Product & { id: number })[] = [];
  private siguienteId = 1;

  registrarProducto(producto: Product): Observable<ProductResponse> {
    console.log('[ProductService] Datos recibidos:', producto);

    const nuevo = { ...producto, id: this.siguienteId++ };
    this.productos.push(nuevo);

    const respuesta: ProductResponse = {
      ok: true,
      mensaje: `Producto "${nuevo.nombre}" registrado con ID ${nuevo.id}`,
      producto: nuevo,
    };

    return of(respuesta).pipe(
      delay(800),
      tap(() => console.log('[ProductService] Productos almacenados:', this.productos))
    );
  }

  obtenerProductos(): (Product & { id: number })[] {
    return [...this.productos];
  }
}