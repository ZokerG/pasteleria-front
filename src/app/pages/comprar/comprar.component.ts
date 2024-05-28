import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/service/productos.service';

@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.css']
})
export class ComprarComponent implements OnInit{

  productos: any;
  
  constructor(
    private productosService: ProductoService,
  ) {}

  ngOnInit() {
    this.obtenerCarrito();
  }

  increment(producto: any) {
    producto.cantidad++;
  }

  decrement(producto: any) {
    if (producto.cantidad > 1) {
      producto.cantidad--;
    }
  }

  eliminarProducto(producto: any) {
    this.productos = this.productos.filter((p:any) => p.id !== producto.id);
  }

  procederAlPago() {
    this.productosService.comprarCarrito(1).subscribe({
      next: (res) => {
        window.open(res.url, '_blank');
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  obtenerCarrito(){
    this.productosService.listarCarrito(1).subscribe(
      (res) => {
        console.log(res);
        this.productos = res;
      },
      (err) => {
        console.error(err);
      }
    );
  }

}
