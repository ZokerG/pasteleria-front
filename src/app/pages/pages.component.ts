import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit{
  userName: string = 'Usuario';
  sidebarOpen = true;

  constructor(
    private router: Router
  ) { }
  
  ngOnInit(): void {
  }

  logout() {
    this.router.navigate(['security/sign-in']);
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
}

}
