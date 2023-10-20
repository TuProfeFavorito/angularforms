import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipodocService } from '../services/tipodoc.service';
import { DepartamentosService } from '../services/ubigeo/departamentos.service';
import { ProvinciasService } from '../services/ubigeo/provincias.service';
import { DistritosService } from '../services/ubigeo/distritos.service';
import { AsociadoService } from '../services/asociado.service';
import { TiporequerimientoService } from '../services/tiporequerimiento.service';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {
  
  selectedTipoDoc: string = '';
  maxCaracteres: number = 8;
  invalidbutton: boolean = false;
  tipoDoc: any[] = [];
  departamentos: any[] = [];
  provincias: any[] = [];
  distritos: any[] = [];
  asociados: any[] = [];
  requerimientos: any[] = [];
  Myfile: File | null = null;
  inputValue: string = '';
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
    cupo: '',
    asociado: '',
    requerimiento : '',
    mensaje: '',
    terminos: 'SI'
  };

  constructor(
    private tipoDocService: TipodocService, 
    private departamentosService: DepartamentosService,
    private provinciasService: ProvinciasService,
    private distritosService: DistritosService,
    private asociadoService: AsociadoService,
    private tiporequerimientoService: TiporequerimientoService    
  ) {    
   
  }  

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      // Aquí puedes hacer lo que quieras con el archivo seleccionado, por ejemplo, cargarlo a un servidor.
      console.log('Archivo seleccionado:', file, file.name);
      this.Myfile = file;
    }
  }

  onCheckboxChange(checked: boolean) {
    this.data.terminos = (checked) ? "SI" : "NO";
    this.invalidbutton = (checked) ? false : true;
  }
  
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

  isInputEmpty(): boolean {
    return this.inputValue.trim() === '';
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
    this.asociadoService.getOpciones().subscribe(data => {
      this.asociados = data;
    });
    this.asociadoService.getOpciones().subscribe(data => {
      this.asociados = data;
    });
    this.tiporequerimientoService.getOpciones().subscribe(data => {
      this.requerimientos = data;
    });
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.Myfile!, this.Myfile!.name);    
  }
}
