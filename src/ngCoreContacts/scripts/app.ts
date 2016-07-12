import {Component} from '@angular/core';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
@Component({
    selector: 'my-app',
    template: '<button md-raised-button color="accent">ACCENT RAISED</button>',
    directives: [        
        MD_BUTTON_DIRECTIVES,        
    ],
})
export class AppComponent { }