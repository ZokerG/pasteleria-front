import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosServicio } from 'src/app/service/usuarios.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit{

  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private usuarioService: UsuariosServicio,
    private router: Router
  ) {
    this.initFrom();
   }

  ngOnInit() {
  }

  initFrom() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.usuarioService.login(this.loginForm.value).subscribe({
        next: (res) => {
          localStorage.setItem('userId', res.userInfo.userId);
          console.log(localStorage.getItem('userId'));
          this.router.navigate(['pages/lista']);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  registrar() {
    this.router.navigate(['security/sign-up']);
  }

}
