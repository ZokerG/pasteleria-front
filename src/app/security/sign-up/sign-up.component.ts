import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosServicio } from 'src/app/service/usuarios.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private usuarioService: UsuariosServicio
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmarPassword: ['', [Validators.required]],
      rol: ['CLIENTE', [Validators.required]]
    }, {
      validators: this.mustMatch('password', 'confirmarPassword')
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.usuarioService.registrar(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['security/sign-in']);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  private mustMatch(password: string, passwordConfirm: string) {
    return (formGroup: FormGroup) => {
      const passwordInput = formGroup.controls[password];
      const passwordConfirmationInput = formGroup.controls[passwordConfirm];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        passwordConfirmationInput.setErrors({ mustMatch: true });
      } else {
        passwordConfirmationInput.setErrors(null);
      }
    };
  }
}
