import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from 'src/app/service/productos.service';

@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.css']
})
export class ComprarComponent implements OnInit{

  productos: any;
  clienteId: any = localStorage.getItem('userId');
  
  constructor(
    private productosService: ProductoService,
    private toastr: ToastrService
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
    this.toastr.success('Producto eliminado del carrito', 'Producto eliminado');
  }

  procederAlPago() {
    this.productosService.comprarCarrito(this.clienteId).subscribe({
      next: (res) => {
        window.open(res.url, '_blank');
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  obtenerCarrito(){
    this.productosService.listarCarrito(this.clienteId).subscribe(
      (res) => {
        console.log(res);
        this.productos = res;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  deleteCarrito(){
    this.productosService.eliminarCarrito(this.clienteId).subscribe(
      (res) => {
        console.log(res);
        this.productos = [];
      },
      (err) => {
        console.error(err);
      }
    );
  }

}
