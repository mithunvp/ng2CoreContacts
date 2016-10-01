import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { decorateModuleRef } from './app/environment';
import { bootloader } from '@angularclass/hmr';


/*
 * Bootstrap our Angular app with a top level NgModule
 */
export function main(): Promise<any> {
    return platformBrowserDynamic()
        .bootstrapModule(AppModule)
        .then(decorateModuleRef)
        .catch(err => console.error(err));
}

// needed for hmr
// in prod this is replace for document ready
bootloader(main);
