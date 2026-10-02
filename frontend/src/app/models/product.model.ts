export interface Product {
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  stock: number;
  sku: string;
}

export interface ProductResponse {
  ok: boolean;
  mensaje: string;
  producto: Product & { id: number };
}