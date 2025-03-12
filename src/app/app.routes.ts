import type { Routes } from "@angular/router"
import { HomeComponent } from "./Components/home/home.component"
import { MantCreateComponent } from "./Components/mant-create/mant-create.component"

export const routes: Routes = [
  { path: "", redirectTo: "reportes", pathMatch: "full" },
  { path: "reportes", component: HomeComponent },
  { path: "crear", component: MantCreateComponent },
  { path: "**", redirectTo: "reportes" }, // Ruta comodín para redirigir a reportes
]

