import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CameraService } from '../../Services/camera.service';

@Component({
  selector: 'app-camera',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent {
  cameraService: CameraService = inject(CameraService);
  imgUrls: string[] = []; // Arreglo para almacenar imágenes
  errorMessage: string = '';
  loading: boolean = false;

  async takePicture() {
    this.errorMessage = ''; // Limpiar mensajes de error anteriores

    try {
      this.loading = true;
      const newImgUrl = await this.cameraService.takePicture();
      
      if (!newImgUrl) {
        throw new Error('No se obtuvo una imagen válida');
      }

      // Agregar la nueva imagen al arreglo, asegurando un máximo de 5 imágenes
      this.imgUrls.unshift(newImgUrl);
      if (this.imgUrls.length > 5) {
        this.imgUrls.pop();
      }

      await new Promise(resolve => setTimeout(resolve, 100));
      this.loading = false;
    } catch (error) {
      console.error('Error al capturar imagen:', error);
      this.errorMessage = String(error);
      this.loading = false;
    }
  }
}
