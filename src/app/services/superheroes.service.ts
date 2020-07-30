import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class SuperheroesService {
  private url = "http://157.245.138.232:9091/api/v1/test/superheroes";

  constructor(private http: HttpClient) {}

  getSuperheroesfromAPI() {
    return this.http.get(this.url);
  }

  getSuperheroebyID(id: string) {
    return this.http.get(`${this.url}/${id}`);
  }
}

// se declara interface para usar como tipo de dato en objetos y
// arreglo de objetos de superheroes
export interface Superheroe {
  avatarURL: string;
  descripcion: string;
  habilidades: [];
  id: number;
  nombre: string;
  nombreReal: string;
  puedeVolar: boolean;
}
