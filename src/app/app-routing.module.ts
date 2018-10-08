import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./user/login/login.component";
import { SignupComponent } from "./user/signup/signup.component";
import { AnswersComponent } from "./main-page/answers/answers.component";
import { UserComponent } from "./user/user.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { AuthGuard } from "./auth.guard";

const appRoutes: Routes = [
    { path: '', component: MainPageComponent },
    { path: 'user', component: UserComponent, canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'answers/:id', component: AnswersComponent },
    { path: '**', component: MainPageComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }