import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosServicio } from 'src/app/service/usuarios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit{
  perfilForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private usuarioService: UsuariosServicio
  ) { }

  ngOnInit() {
    this.perfilForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rol: [{value: 'Usuario', disabled: true}] // Rol predeterminado, deshabilitado para edición
    });
    this.buscarUsuario();
  }

  onSubmit() {
    console.log('Perfil actualizado', this.perfilForm.value);
    // Aquí podrías añadir lógica para enviar los datos actualizados al servidor
  }

  buscarUsuario(){
    this.usuarioService.buscarPorId(1).subscribe(
      (res) => {
        console.log(res);
        this.perfilForm.patchValue(res);
      },
      (err) => {
        console.error(err);
      }
    );
  }

}
