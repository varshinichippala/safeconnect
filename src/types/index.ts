export type ServiceCategory = 
  | 'ambulance'
  | 'hospital'
  | 'police'
  | 'fire'
  | 'pharmacy'
  | 'blood_bank'
  | 'helpline'
  | 'disaster';

export type AlertSeverity = 'Critical' | 'Warning' | 'Advisory';

export type AlertCategory = 
  | 'weather'
  | 'flood'
  | 'cyclone'
  | 'fire'
  | 'road'
  | 'health'
  | 'earthquake'
  | 'heatwave'
  | 'public_safety';

export type ProblemCategory = 
  | 'road_accident'
  | 'fire'
  | 'water_leakage'
  | 'fallen_tree'
  | 'electrical_hazard'
  | 'blocked_road'
  | 'unsafe_area'
  | 'medical_hazard'
  | 'other';

export interface EmergencyService {
  service_id: string;
  service_name: string;
  category: ServiceCategory;
  sub_category?: string;
  address: string;
  phone: string;
  secondary_phone?: string;
  latitude: number;
  longitude: number;
  verification_status: 'verified' | 'pending' | 'review_needed';
  last_verified: string;
  source: string;
  country?: string;
  state: string;
  district: string;
  city: string;
  area: string;
  pincode?: string;
  is_24x7: boolean;
  operating_status: 'Open 24/7' | 'Open Now' | 'Closed' | 'Emergency Only';
  capabilities?: string[];
  blood_types_available?: string[];
  notes?: string;
  distance?: number;
}

export interface EmergencyAlert {
  alert_id: string;
  title: string;
  category: AlertCategory;
  description: string;
  affected_area: string;
  state?: string;
  city?: string;
  severity: AlertSeverity;
  source: string;
  created_at: string;
  expiry_time: string;
  recommended_action: string;
  is_active: boolean;
  is_demo_data: boolean;
}

export interface LocalProblemReport {
  report_id: string;
  category: ProblemCategory;
  description: string;
  location: string;
  area?: string;
  city?: string;
  image?: string;
  created_at: string;
  status: 'pending' | 'investigating' | 'resolved' | 'escalated';
  contact_info?: string;
  reporter_name?: string;
  priority?: 'High' | 'Medium' | 'Low';
}

export interface SafetyGuide {
  id: string;
  title: string;
  category: 'medical' | 'fire' | 'accident' | 'disaster' | 'safety';
  icon: string;
  summary: string;
  dos: string[];
  donts: string[];
  steps: {
    step: number;
    title: string;
    description: string;
  }[];
  criticalHotline?: {
    label: string;
    number: string;
  };
}

export interface UserLocation {
  country?: string;
  state: string;
  district: string;
  city: string;
  area: string;
  pincode?: string;
  formattedAddress?: string;
  latitude?: number;
  longitude?: number;
  accuracyMeters?: number;
  isGpsActive?: boolean;
  isManualOverride?: boolean;
}

export interface AdminUser {
  user_id: string;
  name: string;
  email: string;
  role: 'admin' | 'dispatcher' | 'viewer';
  location: string;
}
