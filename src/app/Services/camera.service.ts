import { Injectable } from "@angular/core"

@Injectable({
  providedIn: "root",
})
export class CameraService {
  constructor() {}

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

