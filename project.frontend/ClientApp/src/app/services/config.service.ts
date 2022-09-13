import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISetting } from '../dto/ISetting.interface';

@Injectable({
  providedIn: 'root'
})

export class ConfigService {

  public setting? = <ISetting[]>[];
  public settingLoaded: boolean = false;
  public settingIsLoading: boolean = false;
  public settingError: boolean = false;

  constructor(private http: HttpClient) {
    //Chiamo la funzionalità per il recupero dei Setting
    this.load();
  }

  /**
   * Faccio una chiamata all'API con promise, il risultato lo salvo in setting
   * @return ISetting[]
   */
  public load() {
    this.settingIsLoading = true;
    return this.http.get<ISetting[]>("https://localhost:7124/api/Setting")
      .toPromise()
      .then(
        (response) => {
          this.setting = response;
          this.settingLoaded = true;
          this.settingIsLoading = false;
        },
        () => {
          this.settingIsLoading = false;
          this.settingError = true
        });
  }

  //ALTERNATIVE METHOD
  //public async load() {
  //  let response = await this.http.get<ISetting[]>("https://localhost:7124/api/Setting");
  //  this.setting = await response.toPromise();
  //  this.settingLoaded = true;
  //  this.isLoading = false;
  //}

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
