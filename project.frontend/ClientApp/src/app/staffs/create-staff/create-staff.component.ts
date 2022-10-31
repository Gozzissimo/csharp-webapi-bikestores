import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Staff } from '../../dto/Staff.interface';
import { Store } from '../../dto/Store.interface';
import { StaffService } from '../../services/staff.service';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-create-staff',
  templateUrl: './create-staff.component.html',
  styleUrls: ['./create-staff.component.css']
})
export class CreateStaffComponent implements OnInit {

  public loading: boolean = false;
  public errorMessage!: string;
  public stores!: Store[];
  public staffs!: Staff[];

  //BUILDER DEL FORM
  staffForm: FormGroup = this.formBuilder.group({
    firstName: [null],
    lastName: [null],
    email: [null],
    phone: [null],
    storeId: [null],
    managerId: [null],
  })

  constructor(
    private staffService: StaffService,
    private storeService: StoreService,
    private router: Router,
    public formBuilder: FormBuilder
  ) { }

  //RECALL DEI DATI PER STORE
  public GetStores() {
    this.loading = true;
    this.errorMessage = "";
    this.storeService.GetAsync()
      .subscribe(
        (response) => {                           //next() callback
          this.stores = response;
        },
        (error) => {                              //error() callback
          console.error('Request failed with error')
          this.errorMessage = error;
          this.loading = false;
        },
        () => {                                   //complete() callback
          this.loading = false;
        })
  }

  //RECALL DEI DATI PER STAFF
  public GetStaffs() {
    this.loading = true;
    this.errorMessage = "";
    this.staffService.GetAsync()
      .subscribe(
        (response) => {                           //next() callback
          this.staffs = response;
        },
        (error) => {                              //error() callback
          console.error('Request failed with error')
          this.errorMessage = error;
          this.loading = false;
        },
        () => {                                   //complete() callback
          this.loading = false;
        })
  }

  ngOnInit() {
    this.GetStores();
    this.GetStaffs();
  }

  //FUNZIONE PER CREARE L'OGGETTO
  public CreateAsync() {

    this.loading = true;
    this.errorMessage = "";
    console.log(this.staffForm.value);
    this.staffService.CreateAsync(<Staff>this.staffForm.value)
      .subscribe(
        (response) => {                           //next() callback
          this.router.navigate(['/staffs']);
        },
        (error) => {                              //error() callback
          console.error('Request failed with error')
          this.errorMessage = error;
          this.loading = false;
        },
        () => {                                   //complete() callback
          console.info('Request completed')      //This is actually not needed 
          this.loading = false;
        })
  }
}
