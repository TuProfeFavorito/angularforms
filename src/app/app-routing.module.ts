import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioComponent } from './formulario/formulario.component';
import { ReclamosComponent } from './reclamos/reclamos.component';

const routes: Routes = [
  { path: '', component: FormularioComponent },
  { path: 'reclamos', component: ReclamosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
