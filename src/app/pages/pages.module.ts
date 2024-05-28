import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaComponent } from './lista/lista.component';
import { PagesComponent } from './pages.component';
import { CrearComponent } from './crear/crear.component';
import { ComprarComponent } from './comprar/comprar.component';
import { PerfilComponent } from './perfil/perfil.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PagesRoutingModule
  ],
  declarations: [
    ListaComponent,
    PagesComponent,
    CrearComponent,
    ComprarComponent,
    PerfilComponent
  ]
})
export class PagesModule { }
