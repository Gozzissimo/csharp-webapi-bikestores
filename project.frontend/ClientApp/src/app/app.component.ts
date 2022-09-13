import { Component } from '@angular/core';
import { ConfigService } from './services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  settingLoaded: boolean = this.configService.settingLoaded;
  settingIsLoading: boolean = this.configService.settingIsLoading
  settingError : boolean = this.configService.settingError


  constructor(private configService: ConfigService) { }
}

