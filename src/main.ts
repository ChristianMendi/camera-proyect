import { bootstrapApplication } from "@angular/platform-browser"
import { provideRouter } from "@angular/router"
import { AppComponent } from "./app/app.component"
import { routes } from "./app/app.routes"

// Configuración para mejorar la experiencia táctil
if ("ontouchstart" in document.documentElement) {
  document.body.classList.add("touch-device")

  // Prevenir zoom en doble toque en iOS
  const preventZoom = (e: TouchEvent) => {
    if (e.touches.length > 1) {
      e.preventDefault()
    }
  }

  document.addEventListener("touchstart", preventZoom, { passive: false })
}

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
}).catch((err) => console.error(err))

