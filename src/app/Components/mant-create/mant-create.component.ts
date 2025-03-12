import { Component, ViewChild, inject } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule, type NgForm } from "@angular/forms"
import { RouterLink, Router } from "@angular/router"
import { CameraComponent } from "../camera/camera.component"
import { ReportService } from "../../Services/report-service.service"

@Component({
  selector: "app-mant-create",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, CameraComponent],
  templateUrl: "./mant-create.component.html",
  styleUrls: ["./mant-create.component.css"],
})
export class MantCreateComponent {
  @ViewChild("reportForm") reportForm!: NgForm

  private reportService = inject(ReportService)
  private router = inject(Router)

  equipmentId = ""
  description = ""
  imageUrl = ""
  formSubmitted = false

  onImageCaptured(imageUrl: string) {
    this.imageUrl = imageUrl
  }

  removeImage() {
    this.imageUrl = ""
  }

  saveReport() {
    this.formSubmitted = true

    if (!this.equipmentId || !this.description || !this.imageUrl) {
      return
    }

    try {
      this.reportService.saveReport({
        equipmentId: this.equipmentId,
        description: this.description,
        imageUrl: this.imageUrl,
        date: new Date().toISOString(),
      })

      // Mostrar mensaje de éxito
      alert("Reporte guardado correctamente")

      // Navegar a la lista de reportes
      this.router.navigate(["/reportes"])
    } catch (error) {
      console.error("Error al guardar el reporte:", error)
      alert("Error al guardar el reporte. Por favor, inténtalo de nuevo.")
    }
  }
}

