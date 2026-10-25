export type TimePeriod = '7d' | '30d' | '90d' | '1y';

export interface TimeSeriesPoint {
  date: string;
  label: string; // e.g. "Lun 12" o "12 Oct"
  views: number;
  whatsappClicks: number;
  completedJobs: number;
  estimatedRevenue: number;
}

export interface FunnelStage {
  id: string;
  name: string;
  description: string;
  count: number;
  rateFromPrevious: number; // Porcentaje relativo a la etapa anterior
  rateFromTotal: number;    // Porcentaje relativo al inicio del embudo
  dropoffRate: number;      // Porcentaje de abandono
}

export interface ServicePerformance {
  serviceId: string;
  serviceName: string;
  inquiries: number;
  estimatedPrice: number;
  sharePercentage: number;  // Debe sumar exactamente 100% con los demás
  estimatedRevenue: number;
}

export interface StarBreakdown {
  stars: number;
  count: number;
  percentage: number;
}

export interface RatingStats {
  averageRating: number;
  totalReviews: number;
  breakdown: StarBreakdown[];
  satisfactionScore: number; // Porcentaje de 4 y 5 estrellas
  recommendationRate: number; // NPS estimado
}

export interface DayDemand {
  dayName: string;
  shortName: string;
  inquiries: number;
  percentage: number;
  isPeakDay: boolean;
}

export interface HourlySlotDemand {
  hourRange: string;
  label: string;
  inquiries: number;
  percentage: number;
  level: 'bajo' | 'medio' | 'alto' | 'pico';
}

export interface ProviderMetricsSummary {
  period: TimePeriod;
  totalViews: number;
  viewsDelta: number; // % cambio vs periodo anterior
  totalWhatsAppClicks: number;
  whatsappDelta: number;
  conversionRate: number; // (clics / vistas) * 100
  conversionDelta: number;
  estimatedJobs: number;
  closingRate: number; // (trabajos / clics) * 100
  estimatedAverageTicket: number;
  estimatedTotalRevenue: number;
  revenueDelta: number;
  averageResponseMinutes: number;
  searchImpressions: number;
  ctrImpressionsToViews: number; // (vistas / impresiones) * 100
}

export interface BusinessFullAnalytics {
  businessId: string;
  period: TimePeriod;
  summary: ProviderMetricsSummary;
  timeSeries: TimeSeriesPoint[];
  funnel: FunnelStage[];
  servicePerformance: ServicePerformance[];
  dayDemand: DayDemand[];
  hourlyDemand: HourlySlotDemand[];
  ratingStats: RatingStats;
}
