import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class CategoriaService {



    httpOption = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }

    constructor(
        private httpClient: HttpClient
    ){}

    listar(){
        return this.httpClient.get<any>('http://localhost:8080/api/categoria');
    }
}