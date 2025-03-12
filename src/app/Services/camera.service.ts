import { Injectable } from "@angular/core"

@Injectable({
  providedIn: "root",
})
export class CameraService {
  constructor() {}

  private isMobile(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  }

  async checkPermissions(): Promise<void> {
    if (typeof navigator === "undefined" || !navigator.mediaDevices) {
      throw new Error("La API de cámara no está disponible en este dispositivo")
    }

    try {
      await navigator.mediaDevices.getUserMedia({ video: true })
    } catch (error) {
      throw new Error("Permisos de cámara no otorgados")
    }
  }

  async takePicture(): Promise<string> {
    await this.checkPermissions()

    // En dispositivos móviles, usar el input de tipo file para acceder a la cámara
    if (this.isMobile()) {
      return this.takePictureMobile()
    } else {
      return this.takePictureDesktop()
    }
  }

  private takePictureMobile(): Promise<string> {
    return new Promise((resolve, reject) => {
      const input = document.createElement("input")
      input.type = "file"
      input.accept = "image/*"
      input.capture = "environment" // Usar cámara trasera por defecto

      input.onchange = (event) => {
        const file = (event.target as HTMLInputElement).files?.[0]
        if (!file) {
          reject(new Error("No se seleccionó ninguna imagen"))
          return
        }

        const reader = new FileReader()
        reader.onload = () => {
          resolve(reader.result as string)
        }
        reader.onerror = () => {
          reject(new Error("Error al leer la imagen"))
        }
        reader.readAsDataURL(file)
      }

      // Simular clic en el input
      input.click()
    })
  }

  private takePictureDesktop(): Promise<string> {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video")
      const canvas = document.createElement("canvas")
      const context = canvas.getContext("2d")

      navigator.mediaDevices
        .getUserMedia({
          video: {
            facingMode: "environment", // Intentar usar cámara trasera
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        })
        .then((stream) => {
          video.srcObject = stream
          video.play()

          // Tomar foto después de que el video esté listo
          video.onloadedmetadata = () => {
            // Establecer dimensiones del canvas para que coincidan con el video
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight

            // Dibujar el cuadro de video en el canvas
            if (context) {
              context.drawImage(video, 0, 0, canvas.width, canvas.height)
            }

            // Convertir canvas a URL de datos
            const imageUrl = canvas.toDataURL("image/jpeg", 0.8) // Calidad 0.8 para reducir tamaño

            // Detener todas las pistas de video
            stream.getTracks().forEach((track) => track.stop())

            resolve(imageUrl)
          }
        })
        .catch((error) => {
          reject(new Error("Error al acceder a la cámara: " + error.message))
        })
    })
  }
}

