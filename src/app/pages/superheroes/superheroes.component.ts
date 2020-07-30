import { Component, OnInit } from "@angular/core";
import {
  SuperheroesService,
  Superheroe,
} from "src/app/services/superheroes.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-superheroes",
  templateUrl: "./superheroes.component.html",
  styleUrls: ["./superheroes.component.css"],
})
export class SuperheroesComponent implements OnInit {
  superHeroeIdUno: Superheroe;
  allSuperheroes: Superheroe[] = [];
  superheroesFinal: Superheroe[] = [];
  superheroesFailed = false;
  superheroesToShow: Superheroe[] = [];

  constructor(public _superheroesService: SuperheroesService) {}

  ngOnInit(): void {
    this.getSuperheroeIDUno();
  }
  // obtiene superheroe con id=1
  // Llama a la funcion para obtener el listado completo de superheroes
  getSuperheroeIDUno() {
    const superheroeToFind = "1";

    this._superheroesService.getSuperheroebyID(superheroeToFind).subscribe(
      (resp: any) => {
        this.superHeroeIdUno = resp.data;

        // Si se obtiene respuesta, se consulta por la totalidad de superheroes
        this.getSuperheroesList();

        // esto es para efectos de control. Si esta vació el arreglo, mostrará un error en HTML
        if (this.superHeroeIdUno === null) {
          this.superheroesFailed = true;
        }
      },
      // esto es para efectos de control. Si hay error en respuesta desde el servidor remoto, mostrará un error en HTML
      (err: HttpErrorResponse) => {
        this.superheroesFailed = true;
      }
    );
  }

  // Obtiene el listado completo de superheroes.
  // Llama a la funcion para crear el arreglo que se mostrará en el HTML
  getSuperheroesList() {
    this._superheroesService.getSuperheroesfromAPI().subscribe(
      (resp: any) => {
        this.allSuperheroes = resp.data;

        // Si se obtiene respuesta, se creará un arreglo de objetos final.
        this.createFinalSuperheroes();

        // esto es para efectos de control. Si esta vació el arreglo, mostrará un error en HTML
        if (this.allSuperheroes.length === 0) {
          this.superheroesFailed = true;
        }
      },
      // esto es para efectos de control. Si hay error en respuesta desde el servidor remoto, mostrará un error en HTML
      (err: HttpErrorResponse) => {
        this.superheroesFailed = true;
      }
    );
  }

  // Crea el arreglo final que se mostrara en el HTML.
  // Une el superheroe con id=1 + la lista de superheroes que pueden volar.
  createFinalSuperheroes() {
    // agrega superheroe con id 1 a superheroes final
    this.superheroesFinal.push(this.superHeroeIdUno);

    // filtra superheroes que pueden volar
    const superheroesCanFly = this.allSuperheroes.filter(
      (heroe) => heroe.puedeVolar === true
    );

    // asigna superheroes que pueden volar a superheroes final
    for (const superheroeCanFly of superheroesCanFly) {
      this.superheroesFinal.push(superheroeCanFly);
    }

    this.superheroesToShow = this.superheroesFinal;
  }

  // Busca superheroes por nombre.
  // Modifica arreglo que se muestra en HTML

  buscarSuperheroes(termino: string) {
    termino = termino.toLowerCase();
    // se crea arreglo temporal para almacenar superheroes encontrados
    const superheroesArr: Superheroe[] = [];

    // recorre arreglo de objetos
    for (let i = 0; i < this.superheroesFinal.length; i++) {
      const superheroe = this.superheroesFinal[i];
      const nombre = superheroe.nombre.toLowerCase();

      // si nombre contiene el termino buscado, devuelve el indice del arreglo
      // si no lo contiene devuelve -1
      if (nombre.indexOf(termino) >= 0) {
        superheroesArr.push(superheroe);
      }
    }

    this.superheroesToShow = superheroesArr;
  }
}
