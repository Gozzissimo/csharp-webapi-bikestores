import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concat, of } from 'rxjs';
import { Store } from '../../dto/Store.interface';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-show-store',
  templateUrl: './show-store.component.html',
  styleUrls: ['./show-store.component.css']
})
export class ShowStoreComponent implements OnInit {

  storeId!: number;
  actualStore!: Store;
  isLoading: boolean = true;
  id: number = 0;

  constructor(
    private _Activatedroute: ActivatedRoute,
    private storeService: StoreService,
    private router: Router
  ) {
  }

  GetDataByParam() {
    concat(
      this.storeId = this._Activatedroute.snapshot.params["storeId"],
      of(this.storeService
        .FindByIdAsync(this.storeId)
        .subscribe(
          (res) => {
            this.actualStore = res
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
    if (confirm("Are you sure do you want to delete this Store?")) {
      this.storeService.DeleteAsync(id)
        .subscribe(
          (response) => {                           //next() callback
            this.router.navigate(['/customers']);
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
