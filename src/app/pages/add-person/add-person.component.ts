import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { PersonService } from 'src/app/services/person/person.service';
import { IPerson } from 'src/app/models/person.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {
  addPersonForm: FormGroup;
  newPerson = {} as IPerson;
  constructor(
    private formBuilder: FormBuilder,
    private personService: PersonService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  createFormGroup() {
    return new FormGroup({
      personNameFilterControl: new FormControl(),
      personName: new FormControl()
    });
  }

  initializeForm() {
    this.addPersonForm = this.formBuilder.group({
      personFirstNameControl: '',
      personLastNameControl: ''
    });
  }

  onSave() {
    this.newPerson.firstName = this.addPersonForm.get(
      'personFirstNameControl'
    ).value;
    this.newPerson.lastName = this.addPersonForm.get(
      'personLastNameControl'
    ).value;

    if (
      this.newPerson.firstName.trim() === '' ||
      this.newPerson.lastName.trim() === ''
    ) {
      return;
    }
    this.personService
      .addNewPerson(this.newPerson)
      .subscribe(() => console.log('Record added'));

    this.router.navigate(['/home']); // define your component where you want to go
  }
}
