import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISettings } from '../dto/isettings.interface';

@Injectable({
  providedIn: 'root'
})

export class ConfigService {

  private settings = <ISettings[]>[];

  constructor(private http: HttpClient) {
    //chiuamo la funzionalità per il recupero dei settings  e ne eseguo lo store nella variabile preposta
    this.LoadSettings().pipe()
  }

  /**funzione di recupero settings  */
  private LoadSettings() : Observable<ISettings[]> {
    return this.http.get<ISettings[]>("https://localhost:7124/api/Settings")
  }

  /**
   * REcupero il valore associato ad una chiave
   * @param keyToSearch Chiave da ricercare
   * @return string | null
   */
  public GetValue(keyToSearch: string): any{ 
   
    if (this.settings != null && this.settings.length > 0) {
      var item = this.settings.filter((el) => { return el.key === keyToSearch });
      return (item.length > 0) ? item[0].value : null;
    }
    return null;
  }
}
