import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { Animal } from 'src/app/model/animal';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  animalObj: Animal = new Animal;
  animalArr: Animal[] = [];

  addAnimalName: string = ''
  addAnimalType: string = ''

  constructor (private crudService: CrudService) {}

  ngOnInit(): void {
    this.animalObj = new Animal()
    this.animalArr = []
    this.getAnimals()
  }

  getAnimals() {
    this.crudService.getAnimals().subscribe(res => {
      this.animalArr = res

    }, err => {
      alert(err)
    })
  }

  addAnimal() {
    this.animalObj.name = this.addAnimalName
    this.animalObj.type = this.addAnimalType
    this.crudService.addAnimal(this.animalObj).subscribe(res => {
      this.ngOnInit()
      this.addAnimalName = ''
      this.addAnimalType = ''
    }, err => {
      alert(err)
    })
  }

  deleteAnimal(animal: Animal) {
    this.crudService.deleteAnimal(animal).subscribe(res => {
      this.ngOnInit()
    }, err => {
      alert(err)
    })
  }

}
