import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";

// Servicios
import { HttpClientModule } from "@angular/common/http";

// componentes
import { AppComponent } from "./app.component";
import { SuperheroesComponent } from "./pages/superheroes/superheroes.component";

@NgModule({
  declarations: [AppComponent, SuperheroesComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
