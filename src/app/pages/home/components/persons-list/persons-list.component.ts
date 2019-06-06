import { Component, OnInit } from '@angular/core';
import { IPerson } from 'src/app/models/person.interface';
import { PersonService } from 'src/app/services/person/person.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-persons-list',
  templateUrl: './persons-list.component.html',
  styleUrls: ['./persons-list.component.css']
})
export class PersonsListComponent implements OnInit {
  persons: IPerson[];
  personForm: FormGroup;

  personFilterFields = ['-- Select --', 'First Name', 'Last Name'];

  constructor(
    private personService: PersonService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.personForm = this.createFormGroup();
    console.log('constructor');
  }

  ngOnInit() {
    console.log('ngonitinit');
    this.initializeForm();
  }

  createFormGroup() {
    return new FormGroup({
      personNameFilterControl: new FormControl(),
      personName: new FormControl()
    });
  }

  initializeForm() {
    this.personForm = this.formBuilder.group({
      personNameFilterControl: this.personFilterFields[0],
      personName: ''
    });

    this.personService.getPersons().subscribe((personsList: IPerson[]) => {
      console.log('Persons data from api' + personsList);
      this.persons = personsList;
    });
  }

  onSubmitFilterResults() {
    const filterByName = this.personForm.get('personNameFilterControl').value;
    const personFirstorLastName = this.personForm.get('personName').value;

    console.log(
      'filter , name,personsList ',
      filterByName,
      personFirstorLastName
    );

    this.personService.getPersons().subscribe((personsList: IPerson[]) => {
      console.log('personsList', personsList);
      if (personsList) {
        const filterIndex = this.personFilterFields.indexOf(filterByName);

        if (filterIndex === 0) {
          this.persons = personsList;
          console.log('Reset filter');
          return;
        } else if (filterIndex === 1) {
          console.log('first name filter ');

          this.persons = personsList.filter(
            person => person.firstName === personFirstorLastName
          );
        } else if (filterIndex === 2) {
          console.log('last name filter ');

          this.persons = personsList.filter(
            person => person.lastName === personFirstorLastName
          );
        }
      }
    });
  }

  onResetFilterResults() {
    this.personService.getPersons().subscribe((personsList: IPerson[]) => {
      console.log('personsList reset', personsList);
      if (personsList) {
        this.persons = personsList;
      }
    });
  }

  onAddNewPersonClick() {
    this.router.navigate(['/add-person']); // define your component where you want to go
  }
}
