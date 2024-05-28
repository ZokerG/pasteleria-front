import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ProductoService } from 'src/app/service/productos.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit{

  productoForm!: FormGroup;
  fileData!: File;
  categoriaList: any;
  productoList: any;

  constructor(private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private productoService: ProductoService
  ) { }

  ngOnInit() {
    this.productoForm = this.fb.group({
      categoriaId: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0.01)]],
      stock: ['', [Validators.required, Validators.min(1)]]
    });
    this.listarcategorias();
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.fileData = event.target.files[0];
    }
  }

  onSubmit() {}

  listarcategorias(){
    this.categoriaService.listar().subscribe(
      (res) => {
        console.log(res);
        this.categoriaList = res;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  crearProducto(){
    const { categoriaId, nombre, descripcion, precio, stock } = this.productoForm.value;
    console.log(categoriaId, nombre, descripcion, precio, stock);
    console.log(this.fileData);
    this.productoService.crear(categoriaId, this.fileData, nombre, descripcion, precio, stock).subscribe(
      (res) => {
        console.log(res);
        this.limpiarFormulario();
      },
      (err) => {
        console.error(err);
      }
    );
  }

  limpiarFormulario(){
    this.productoForm.reset();
  }

}
