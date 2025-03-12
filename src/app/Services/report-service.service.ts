import { Injectable } from "@angular/core"
import type { Report } from "../Models/report.model"

@Injectable({
  providedIn: "root",
})
export class ReportService {
  private reports: Report[] = []
  private readonly storageKey = "maintenance-reports"

  constructor() {
    this.loadReports()
  }

  private loadReports(): void {
    const savedReports = localStorage.getItem(this.storageKey)
    if (savedReports) {
      this.reports = JSON.parse(savedReports)
    }
  }

  private saveToStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.reports))
  }

  getReports(): Report[] {
    return this.reports
  }

  saveReport(report: Report): void {
    this.reports.push(report)
    this.saveToStorage()
  }

  deleteReport(index: number): void {
    if (index >= 0 && index < this.reports.length) {
      this.reports.splice(index, 1)
      this.saveToStorage()
    }
  }
}

