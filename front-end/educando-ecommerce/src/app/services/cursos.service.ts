import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from '../interfaces/cursos.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  url: String= "https://educando-test.onrender.com";
  
  constructor(private http:HttpClient) { }

  public getCursos(): Observable<Curso> {
    return this.http.get<Curso>(`${this.url}/Curso`);
  }
}
