import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from "./auth/auth.guard";
import { QuestionsComponent } from "./questions/questions.component";
import { UserComponent } from "./auth/user/user.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { AnswersComponent } from "./answers/answers.component";

const appRoutes: Routes = [
    { path: '', component: QuestionsComponent },
    { path: 'user', component: UserComponent, canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'answers/:id', component: AnswersComponent },
    { path: '**', component: QuestionsComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }