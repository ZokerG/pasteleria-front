import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosServicio } from '../service/usuarios.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit{
  userName: string = 'Usuario';
  sidebarOpen = true;
  usuarioId: any = localStorage.getItem('userId');

  constructor(
    private router: Router,
    private usuarioService: UsuariosServicio
  ) { }
  
  ngOnInit(): void {
    this.findById();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['security/sign-in']);
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
}

findById(){
  this.usuarioService.buscarPorId(this.usuarioId).subscribe(response => {
    this.userName = response.nombre;
  });
}

}
