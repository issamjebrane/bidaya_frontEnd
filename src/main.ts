import { AppModule } from './app/app.module';
import {register as registerSwiperElements} from 'swiper/element/bundle';
import {platformBrowser} from "@angular/platform-browser";

registerSwiperElements();
platformBrowser().bootstrapModule(AppModule)
  .catch(err => console.error(err));
