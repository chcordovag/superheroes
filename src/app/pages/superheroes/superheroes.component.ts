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
  superHeroebyID = {};
  allSuperheroes: any[] = [];
  superheroesFinal: any[] = [];
  superheroesFailed = false;
  superheroesToShow: any[] = [];

  constructor(public _superheroesService: SuperheroesService) {}

  ngOnInit(): void {
    this.getSuperheroeIDUno();
  }

  getSuperheroeIDUno() {
    const superheroeToFind = "1";

    this._superheroesService.getSuperheroebyID(superheroeToFind).subscribe(
      (resp: any) => {
        this.superHeroebyID = resp.data;

        this.getSuperheroesList();

        if (this.superHeroebyID === null) {
          this.superheroesFailed = true;
        }
      },
      (err: HttpErrorResponse) => {
        this.superheroesFailed = true;
      }
    );
  }

  getSuperheroesList() {
    this._superheroesService.getSuperheroesfromAPI().subscribe(
      (resp: any) => {
        this.allSuperheroes = resp.data;
        // console.log(this.allSuperheroes);
        this.createFinalSuperheroes();

        if (this.allSuperheroes.length === 0) {
          this.superheroesFailed = true;
        }

        // this.cargado = true;a
        // return resp;
      },
      (err: HttpErrorResponse) => {
        this.superheroesFailed = true;
      }
    );
  }

  createFinalSuperheroes() {
    //agrega superheroe con id 1 a superheroes final
    this.superheroesFinal.push(this.superHeroebyID);

    //filtra superheroes que pueden volar
    let superheroesCanFly = this.allSuperheroes.filter(
      (heroe) => heroe.puedeVolar === true
    );

    //asigna superheroes que pueden volar a superheroes final
    for (let superheroeCanFly of superheroesCanFly) {
      this.superheroesFinal.push(superheroeCanFly);
    }

    this.superheroesToShow = this.superheroesFinal;
  }

  buscarSuperheroes(termino: string) {
    termino = termino.toLowerCase();
    let superheroesArr: any[] = [];

    for (let i = 0; i < this.superheroesFinal.length; i++) {
      let heroe = this.superheroesFinal[i];
      const nombre = heroe.nombre.toLowerCase();

      if (nombre.indexOf(termino) >= 0) {
        // heroe.idx = i;
        superheroesArr.push(heroe);
      }
    }

    this.superheroesToShow = superheroesArr;

    console.log(this.superheroesToShow);
  }
}
