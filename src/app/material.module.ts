import {NgModule} from "@angular/core";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';

@NgModule({
    imports:[
        MatToolbarModule,
        MatGridListModule,
        MatListModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatDividerModule,
        MatExpansionModule,
        MatTooltipModule,
        MatDialogModule,
        MatMenuModule,
        MatCardModule,
        BrowserAnimationsModule
    ],
    exports:[
        MatToolbarModule,
        MatGridListModule,
        MatListModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatExpansionModule,
        MatTooltipModule,
        MatDividerModule,
        MatMenuModule,
        MatCardModule,
        MatDialogModule
    ]
})

export class Material{}