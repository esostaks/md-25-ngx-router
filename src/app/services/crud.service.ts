import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Animal } from '../model/animal';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  serviceURL: string

  constructor(private http: HttpClient) { 
    this.serviceURL = "http://localhost:3004/animals"
  }

  addAnimal(animal: Animal): Observable<Animal> {
    return this.http.post<Animal>(this.serviceURL, animal)
  }

  getAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>(this.serviceURL)
  }

  deleteAnimal(animal: Animal): Observable<Animal> {
    return this.http.delete<Animal>(`${this.serviceURL}/${animal.id}`)
  }
}  
