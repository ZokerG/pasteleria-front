import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { ListaComponent } from './lista/lista.component';
import { CrearComponent } from './crear/crear.component';
import { ComprarComponent } from './comprar/comprar.component';
import { PerfilComponent } from './perfil/perfil.component';


const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: 
        [
            {
                path: 'lista',
                component: ListaComponent
            },
            {
                path: 'crear',
                component: CrearComponent
            },
            {
                path: 'comprar',
                component: ComprarComponent
            },
            {
                path: 'perfil',
                component: PerfilComponent
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class PagesRoutingModule { }