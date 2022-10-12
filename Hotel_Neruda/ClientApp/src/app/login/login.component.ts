import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Validators } from '../models/validators';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from '../Hotel_Neruda/models/persona';
import { ServicioAutenticacion } from '../services/servicio-autenticacion.service';
import { Mensajes } from '../services/mensajes';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  v:Validators;
  form:FormGroup;
  returnUrl: string;
  submitted = false;
  loading = false;
  error = false;
  
  constructor(private route: ActivatedRoute, private router: Router, private mensajes: Mensajes,
    private servicioAutenticacion: ServicioAutenticacion, private _form:FormBuilder) { this.build(); }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  private build(){
    this.v = new Validators();
    this.form = this._form.group({
      user:['', this.v.space],
      pass:['', this.v.space]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.servicioAutenticacion.iniciarSesion(this.user.value, this.pass.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.mensajes.Mostrar('Acceso Denegado', error.error);
          this.loading = false;
          this.error = true;
        });
  }

  get user() { return this.form.get('user'); }
  get pass() { return this.form.get('pass'); }
}