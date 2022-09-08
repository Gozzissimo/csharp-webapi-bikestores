import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISetting } from '../dto/ISetting.interface';

@Injectable({
  providedIn: 'root'
})

export class ConfigService {

  public setting = <ISetting[]>[];
  public settingLoaded: boolean = false;
  public isLoading: boolean = false;
  public testBoolean: Observable<boolean> = new Observable((observer) => {
    observer.next(false)
  });

  constructor(private http: HttpClient) {
    //chiamo la funzionalità per il recupero dei Setting  e ne eseguo lo store nella variabile preposta
    this.ReloadConf();
  }

  public ReloadConf() {
    console.log("ReloadConf Start")
    this.isLoading = true;
    this.LoadSetting()
      .subscribe(
        (response) => {                           //next() callback
          this.setting = response;
          this.isLoading = false;
          this.settingLoaded = true;
          //this.testBoolean.subscribe({
          //  next
          //})
          console.log("ReloadConf END")
        },
        (error) => {                              //error() callback
          console.error('Request failed with error')
          this.isLoading = false;
          this.settingLoaded = false;
        })
  }

  /**funzione di recupero Setting  */
  public LoadSetting() : Observable<ISetting[]> {
    return this.http.get<ISetting[]>("https://localhost:7124/api/Setting")
  }

  /**
   * Recupero il valore associato ad una chiave
   * @param keyToSearch Chiave da ricercare
   * @return string | null
   */
  public GetValue(keyToSearch: string): any{ 
   
    if (this.setting != null && this.setting.length > 0) {
      var item = this.setting.filter((el) => { return el.settingKey === keyToSearch });
      
      return (item.length > 0) ? item[0].settingValue : null;
    }
    return null;
  }
}
