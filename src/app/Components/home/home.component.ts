import { Component, type OnInit, inject } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterLink } from "@angular/router"
import { ReportService } from "../../Services/report-service.service"
import type { Report } from "../../Models/report.model"

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  private reportService = inject(ReportService)
  reports: Report[] = []

  ngOnInit(): void {
    this.loadReports()
  }

  loadReports(): void {
    this.reports = this.reportService.getReports()
  }

  deleteReport(index: number): void {
    if (confirm("¿Estás seguro de que deseas eliminar este reporte?")) {
      this.reportService.deleteReport(index)
      this.loadReports()
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }
}

