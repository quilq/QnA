import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./User/login/login.component";
import { SignupComponent } from "./User/signup/signup.component";
import { HomeComponent } from "./home/home.component";
import { AnswersComponent } from "./main-page/answers/answers.component";

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'answers', component: AnswersComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {}