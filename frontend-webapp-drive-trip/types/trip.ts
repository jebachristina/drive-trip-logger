export interface Trip {
  id?: number;
  startLocation: string;
  endLocation: string;
  startTime: string;
  endTime: string;
  distance: number;
  notes?: string;
  memorable: boolean;
}