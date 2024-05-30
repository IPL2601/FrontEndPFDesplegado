import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { HoyComponent } from './components/main/hoy/hoy.component';
import { FormularioComponent } from './components/main/formulario/formulario.component';
import { CalendarioComponent } from './components/main/calendario/calendario.component';
import { SemanaComponent } from './components/main/semana/semana.component';
import { RegisterComponent } from './components/register/register.component';
import { TaskComponent } from './components/main/task/task/task.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {path:'about-us', component: AboutUsComponent},
    {path:'InicioSesion', component: InicioSesionComponent},
    {path:'hoy', component: HoyComponent},
    {path:'semana', component: SemanaComponent},
    {path:'calendario', component: CalendarioComponent},
    {path:'formulario', component: FormularioComponent},
    {path:'', pathMatch:'full', redirectTo: 'about-us'},
    { path: 'register', component: RegisterComponent },
    {path:'login', component: InicioSesionComponent},
    {path:'task/:id', component: TaskComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

  export class AppRoutingModule { }
