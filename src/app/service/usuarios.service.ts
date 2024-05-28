import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class UsuariosServicio {

    httpOption = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }

    constructor(
        private httpClient: HttpClient
    ){}

    buscarPorId(id: any){
        return this.httpClient.get<any>('http://localhost:8080/api/usuario/buscar/' + id);
    }

    login(request: any){
        return this.httpClient.post<any>('http://localhost:8080/api/usuario/login', request);
    }

    registrar(request: any){
        return this.httpClient.post<any>('http://localhost:8080/api/usuario', request);
    }
}