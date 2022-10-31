import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concat, of } from 'rxjs';
import { Staff } from '../../dto/Staff.interface';
import { StaffService } from '../../services/staff.service';

@Component({
  selector: 'app-show-staff',
  templateUrl: './show-staff.component.html',
  styleUrls: ['./show-staff.component.css']
})
export class ShowStaffComponent implements OnInit {

  public staffId!: number;
  public actualStaff!: Staff;
  public isLoading: boolean = true;
  public id: number = 0;

  constructor(
    private _Activatedroute: ActivatedRoute,
    private productService: StaffService,
    private router: Router
  ) {
  }

  GetDataByParam() {
    concat(
      this.staffId = this._Activatedroute.snapshot.params["staffId"],
      of(this.productService
        .FindByIdAsync(this.staffId)
        .subscribe(
          (res) => {
            this.actualStaff = res
            this.isLoading = false
          }
        ))
    )
  }

  ngOnInit(): void {
    this.GetDataByParam()
  }

  //FUNZIONE DELETE
  loading: boolean = false;
  errorMessage!: string;

  public DeleteAsync(id: number) {
    this.loading = true;
    this.errorMessage = "";
    if (confirm("Are you sure do you want to delete this Staff Member?")) {
      this.productService.DeleteAsync(id)
        .subscribe(
          (response) => {                           //next() callback
            this.router.navigate(['/products']);
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
  }
}
