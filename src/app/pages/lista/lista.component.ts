import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from 'src/app/service/productos.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit{

  productos: any;
  clienteId: any = localStorage.getItem('userId');
  contadorProductos: { [id: string]: number } = {};

  constructor(
    private productosService: ProductoService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.listarProductos();
  }

  increment(id: string) {
    this.contadorProductos[id]++;
  }

  decrement(id: string) {
    if (this.contadorProductos[id] > 1) {
      this.contadorProductos[id]--;
    }
  }

  agregarAlCarrito(producto: any) {
    this.productosService.agregarAlCarrito(this.clienteId, producto.id, 1, producto.precio).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success('Producto agregado al carrito', 'Producto agregado');
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  comprarAhora(producto: any) {
    this.productosService.comprarProducto(producto.id, 1).subscribe({
      next: (res) => {
        window.open(res.url, '_blank');
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  listarProductos(){
    this.productosService.listar().subscribe(
      (res) => {
        console.log(res);
        this.productos = res;
        for (let producto of this.productos) {
          this.contadorProductos[producto.id] = 1;
        }
      },
      (err) => {
        console.error(err);
      }
    );
  }



}
