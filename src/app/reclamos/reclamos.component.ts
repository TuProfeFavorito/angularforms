import { Component } from '@angular/core';
import { TipodocService } from '../services/tipodoc.service';
import { DepartamentosService } from '../services/ubigeo/departamentos.service';
import { ProvinciasService } from '../services/ubigeo/provincias.service';
import { DistritosService } from '../services/ubigeo/distritos.service';
import { TiendaService } from '../services/tienda.service';
import { ReclamoService } from '../services/reclamo.service';
import { ProductoservicioService } from '../services/productoservicio.service';

@Component({
  selector: 'app-reclamos',
  templateUrl: './reclamos.component.html',
  styleUrls: ['./reclamos.component.scss']
})
export class ReclamosComponent {
  selectedTipoDoc: string = '';
  maxCaracteres: number = 8;
  tipoDoc: any[] = [];
  departamentos: any[] = [];
  provincias: any[] = [];
  distritos: any[] = [];  
  departamentos_padre: any[] = [];
  provincias_padre: any[] = [];
  distritos_padre: any[] = [];  
  tiendas: any[] = [];  
  reclamos: any[] = [];
  productos: any[] = [];
  mostrarPaternal: boolean = false;
  data = {
    tipodocumento: '',
    num_documento: '',
    nombres: '',
    apellidos: '',
    celular: '',
    email: '',
    departamento: '',
    provincia: '',    
    distrito: '',
    direccion: '',
    tienda: '',
    reclamo: '',
    producto: '',
    descripcionproducto: '',
    monto: '',
    terminos: 'NO',
    nombres_padre: '',
    apellidos_padre: '',
    type_telefono_padre: '',
    telefono_padre: '',
    email_padre: '',
    direccion_padre: '',
    departamento_padre: '',
    provincia_padre: '',    
    distrito_padre: '',
  };
  constructor(
    private tipoDocService: TipodocService,
    private departamentosService: DepartamentosService,
    private provinciasService: ProvinciasService,
    private distritosService: DistritosService,
    private tiendaService: TiendaService,
    private reclamoService: ReclamoService,
    private productoservicioService: ProductoservicioService,    
  ) {} 

  onDepartamentoChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedOption = selectElement.selectedOptions[0];    
    const customValue = selectedOption.getAttribute('data-id');
    this.provincias = [];
    this.distritos = [];
    this.provinciasService.getOpciones().subscribe(data => {
      this.provincias = data.filter(opcion => opcion.department_id === customValue);
    });
  }

  onProvinciaChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedOption = selectElement.selectedOptions[0];    
    const customValue = selectedOption.getAttribute('data-id');
    this.distritos = [];
    this.distritosService.getOpciones().subscribe(data => {
      this.distritos = data.filter(opcion => opcion.province_id === customValue);
    });
  }

  onDepartamentoPadreChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedOption = selectElement.selectedOptions[0];    
    const customValue = selectedOption.getAttribute('data-id');
    this.provincias_padre = [];
    this.distritos_padre = [];
    this.provinciasService.getOpciones().subscribe(data => {
      this.provincias_padre = data.filter(opcion => opcion.department_id === customValue);
    });
  }

  onProvinciaPadreChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedOption = selectElement.selectedOptions[0];    
    const customValue = selectedOption.getAttribute('data-id');
    this.distritos_padre = [];
    this.distritosService.getOpciones().subscribe(data => {
      this.distritos_padre = data.filter(opcion => opcion.province_id === customValue);
    });
  }


  onTipoDocumentoChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedOption = selectElement.selectedOptions[0];    
    const customValue = selectedOption.getAttribute('data-cant');
    this.maxCaracteres =  Number(customValue);
    this.data.num_documento = '';
  }
  filterNonNumeric(value: string): string {
    // Filtrar caracteres no numéricos utilizando una expresión regular
    return value.replace(/[^0-9]/g, '');
  }
  onCheckboxChange(checked: boolean) {
    this.data.terminos = (checked) ? "SI" : "NO"; 
    this.mostrarPaternal = (checked) ? true : false; 
  }

  onInputNumber(event: any) {
    // No permitir que se ingresen letras
    const numericValue = this.filterNonNumeric(event.target.value);
    
    // Actualizar el valor del campo de entrada
    this.data.num_documento = numericValue;
  }
  ngOnInit() {
    this.tipoDocService.getOpciones().subscribe(data => {
      this.tipoDoc = data;
    });
    this.departamentosService.getOpciones().subscribe(data => {
      this.departamentos = data;
    });
    this.departamentosService.getOpciones().subscribe(data => {
      this.departamentos_padre = data;
    });
    this.tiendaService.getOpciones().subscribe(data => {
      this.tiendas = data;
    });
    this.reclamoService.getOpciones().subscribe(data => {
      this.reclamos = data;
    });
    this.productoservicioService.getOpciones().subscribe(data => {
      this.productos = data;
    });
    
  }
  onSubmit() {
    console.log(this.data);
  }
}
