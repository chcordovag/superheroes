import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Servicios
import { HttpClientModule } from "@angular/common/http";

// componentes
import { AppComponent } from "./app.component";
import { SuperheroesComponent } from "./pages/superheroes/superheroes.component";

@NgModule({
  declarations: [AppComponent, SuperheroesComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
