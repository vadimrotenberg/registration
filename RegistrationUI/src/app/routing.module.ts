import {RouterModule} from "@angular/router";
import {Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes =
  [
    {path: '', component: LoginComponent}
  ]
@NgModule(
  {
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
  }
)
export class RoutingModule {}
