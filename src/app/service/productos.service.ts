import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class ProductoService {



    httpOption = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }

    constructor(
        private httpClient: HttpClient
    ){}

    listar(){
        return this.httpClient.get<any>('http://localhost:8080/api/producto');
    }

    crear(categoriaId: any, file: File, nombre: string, descripcion: string, precio: any, stock: any){
        const formData = new FormData();
        formData.append('file', file);
        formData.append('nombre', nombre);
        formData.append('descripcion', descripcion);
        formData.append('precio', precio);
        formData.append('stock', stock);
        return this.httpClient.post<any>('http://localhost:8080/api/producto/' + categoriaId, formData);
    }

    agregarAlCarrito(clienteId: any, productoId: any, cantidad: any, price: any){
        const params = new HttpParams().set('cantidad', cantidad).set('price', price);
        return this.httpClient.post<any>('http://localhost:8080/api/producto/agregar/carrito/' + clienteId + '/' + productoId, {}, {params});
    }

    comprarProducto(productoId: any, cantidad: any){
        const params = new HttpParams().set('cantidad', cantidad).set('productoId', productoId);
        return this.httpClient.post<any>('http://localhost:8080/api/producto/comprar', {}, {params});
    }

    listarCarrito(clienteId: any){
        return this.httpClient.get<any>('http://localhost:8080/api/producto/obtener/carrito/' + clienteId);
    }

    comprarCarrito(clienteId: any){
        return this.httpClient.post<any>('http://localhost:8080/api/producto/comprar/carrito/' + clienteId, {});
    }


}