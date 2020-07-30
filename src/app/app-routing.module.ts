import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SuperheroesComponent } from "./pages/superheroes/superheroes.component";

const routes: Routes = [
  { path: "superheroes", component: SuperheroesComponent },
  { path: "**", pathMatch: "full", redirectTo: "superheroes" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
