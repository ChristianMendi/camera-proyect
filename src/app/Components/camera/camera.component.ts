import { Component, EventEmitter, Output, inject } from "@angular/core"
import { CommonModule } from "@angular/common"
import { CameraService } from "../../Services/camera.service"

@Component({
  selector: "app-camera",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./camera.component.html",
  styleUrls: ["./camera.component.css"],
})
export class CameraComponent {
  private cameraService = inject(CameraService)
  imgUrl: string[] = []
  errorMessage = ""
  loading = false
  isMobile = false

  @Output() imageCaptured = new EventEmitter<string>()

  constructor() {
    // Detectar si es un dispositivo móvil
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  }

  async takePicture() {
    this.errorMessage = "" // Limpiar mensajes de error anteriores
    try {
      this.loading = true
      const newImgUrl = await this.cameraService.takePicture()
      if (!newImgUrl) {
        throw new Error("No se obtuvo una imagen válida")
      }
      this.imgUrl.push(newImgUrl)
      this.imageCaptured.emit(newImgUrl) // Emitir imagen al formulario
      this.loading = false
    } catch (error) {
      console.error("Error al capturar imagen:", error)
      this.errorMessage = String(error)
      this.loading = false
    }
  }

  removeImage(index: number) {
    if (index >= 0 && index < this.imgUrl.length) {
      this.imgUrl.splice(index, 1)
      // Si eliminamos la última imagen, notificamos al componente padre
      if (this.imgUrl.length > 0) {
        this.imageCaptured.emit(this.imgUrl[this.imgUrl.length - 1])
      } else {
        this.imageCaptured.emit("") // No hay imágenes
      }
    }
  }
}

