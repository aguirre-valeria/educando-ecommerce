import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from '../interfaces/cursos.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  url: String= "http://localhost:3000";
  
  constructor(private http:HttpClient) { }

  public getCursos(): Observable<Curso> {
    return this.http.get<Curso>(`${this.url}/cursos`);
  }
  
}
