import { Component, OnInit } from '@angular/core';
import { TipodocService } from '../services/tipodoc.service';
import { DepartamentosService } from '../services/ubigeo/departamentos.service';
import { ProvinciasService } from '../services/ubigeo/provincias.service';
import { DistritosService } from '../services/ubigeo/distritos.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {
  selectedTipoDoc: string = '';
  maxCaracteres: number = 8;
  tipoDoc: any[] = [];
  departamentos: any[] = [];
  provincias: any[] = [];
  distritos: any[] = [];
  data = {
    tipodocumento: '',
    num_documento: '',
    nombres_apellidos: '',
    celular: '',
    email: '',
    departamento: '',
    provincia: '',    
    distrito: '',
    num_contrato: '',
    grupo: '',
    cupo: ''
  };

  constructor(
    private tipoDocService: TipodocService, 
    private departamentosService: DepartamentosService,
    private provinciasService: ProvinciasService,
    private distritosService: DistritosService
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
  }

  onSubmit() {
    console.log(this.data);
  }
}
