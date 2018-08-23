import {NgModule} from "@angular/core";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
    imports:[
        MatToolbarModule,
        MatGridListModule,
        MatListModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        BrowserAnimationsModule
    ],
    exports:[
        MatToolbarModule,
        MatGridListModule,
        MatListModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule
    ]
})

export class Material{}