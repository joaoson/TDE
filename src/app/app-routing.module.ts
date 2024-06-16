import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClockComponent } from './clock/clock.component';
import { ClockanalogicComponent } from './clockanalogic/clockanalogic.component';

const routes: Routes = [
  {path:"clock",component:ClockComponent},
  {path:"clockAnalogic",component:ClockanalogicComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
