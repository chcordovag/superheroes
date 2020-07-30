import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class SuperheroesService {
  private url = "http://157.245.138.232:9091/api/v1/test/superheroes";
  private superheroes: any[] = [];

  constructor(private http: HttpClient) {
    console.log("Servicio Superheroes.services cargado!");
  }

  getSuperheroesfromAPI(): any {
    return this.http.get(this.url);

    // console.log(respuesta)
  }

  getSuperheroebyID(id: string) {
    return this.http.get(`${this.url}/${id}`);
  }
}

export interface Superheroe {
  id: number;
  nombre: string;
  nombreReal: string;
  puedeVolar: boolean;
  avatarURL: string;
}
