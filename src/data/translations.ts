export type SupportedLanguage = 'en' | 'hi' | 'es';

export interface Translations {
  appName: string;
  tagline: string;
  emergencyDisclaimer: string;
  disclaimerDetail: string;
  ambulance: string;
  police: string;
  fire: string;
  hospitals: string;
  pharmacies: string;
  emergencySos: string;
  useMyLocation: string;
  locationPermissionDenied: string;
  searchPlaceholder: string;
  nearbyServicesTitle: string;
  safetyTips: string;
  reportProblem: string;
  safeAssistAi: string;
  callNow: string;
  copyNumber: string;
  directions: string;
  verifiedOfficial: string;
  open247: string;
}

export const TRANSLATIONS: Record<SupportedLanguage, Translations> = {
  en: {
    appName: 'SafeConnect',
    tagline: 'Quick Information When Every Second Matters',
    emergencyDisclaimer: 'Emergency Disclaimer: SafeConnect provides informational guidance. In an active, life-threatening emergency, dial 112 / 108 / 911 immediately.',
    disclaimerDetail: 'This portal supplements official public safety departments. Do not wait for a web response during active fires, cardiac arrest, or armed violence.',
    ambulance: 'Ambulance',
    police: 'Police',
    fire: 'Fire & Rescue',
    hospitals: 'Hospitals',
    pharmacies: 'Pharmacies',
    emergencySos: 'Emergency SOS',
    useMyLocation: 'Use My Location',
    locationPermissionDenied: 'Location access unavailable. Please select your area manually.',
    searchPlaceholder: 'Search emergency services, hospitals, or police near you...',
    nearbyServicesTitle: 'Verified Emergency Services Near You',
    safetyTips: 'Step-by-Step Emergency Guides',
    reportProblem: 'Report a Hazard / Emergency',
    safeAssistAi: 'SafeAssist AI Guide',
    callNow: 'Call Now',
    copyNumber: 'Copy Number',
    directions: 'Get Directions',
    verifiedOfficial: 'Official Verified Resource',
    open247: 'Open 24/7'
  },
  hi: {
    appName: 'सेफ़कनेक्ट (SafeConnect)',
    tagline: 'त्वरित जानकारी जब हर सेकंड मायने रखता है',
    emergencyDisclaimer: 'आपातकालीन अस्वीकरण: सेफ़कनेक्ट केवल सूचनात्मक मार्गदर्शन प्रदान करता है। गंभीर आपात स्थिति में तुरंत 112 या 108 पर कॉल करें।',
    disclaimerDetail: 'यह पोर्टल आधिकारिक सुरक्षा सेवाओं का पूरक है। गंभीर स्थिति में सीधे हेल्पलाइन नंबर डायल करें।',
    ambulance: 'एम्बुलेंस (108)',
    police: 'पुलिस (100/112)',
    fire: 'अग्निशमन दल (101)',
    hospitals: 'अस्पताल',
    pharmacies: 'दवा दुकानें (24x7)',
    emergencySos: 'तत्काल सहायता (112)',
    useMyLocation: 'मेरे स्थान का उपयोग करें',
    locationPermissionDenied: 'स्थान अनुमति अनुपलब्ध है। कृपया अपना क्षेत्र चुनें।',
    searchPlaceholder: 'अपने नजदीकी आपातकालीन सेवाएं, अस्पताल खोजें...',
    nearbyServicesTitle: 'आपके नजदीकी सत्यापित आपातकालीन सेवाएं',
    safetyTips: 'आपातकालीन सुरक्षा निर्देश',
    reportProblem: 'स्थानीय समस्या / खतरे की सूचना दें',
    safeAssistAi: 'सेफ़असिस्ट एआई सहायक',
    callNow: 'कॉल करें',
    copyNumber: 'नंबर कॉपी करें',
    directions: 'दिशा-निर्देश',
    verifiedOfficial: 'आधिकारिक सत्यापित सेवा',
    open247: '24/7 खुला है'
  },
  es: {
    appName: 'SafeConnect',
    tagline: 'Información Rápida Cuando Cada Segundo Cuenta',
    emergencyDisclaimer: 'Aviso de Emergencia: SafeConnect proporciona orientación informativa. En emergencias con riesgo de vida, llame al 112 o 911 de inmediato.',
    disclaimerDetail: 'Este portal complementa los servicios oficiales de seguridad pública.',
    ambulance: 'Ambulancia',
    police: 'Policía',
    fire: 'Bomberos y Rescate',
    hospitals: 'Hospitales',
    pharmacies: 'Farmacias 24h',
    emergencySos: 'SOS Emergencias',
    useMyLocation: 'Usar Mi Ubicación',
    locationPermissionDenied: 'Acceso de ubicación no disponible. Seleccione su zona manualmente.',
    searchPlaceholder: 'Buscar servicios de emergencia cerca de usted...',
    nearbyServicesTitle: 'Servicios de Emergencia Verificados Cercanos',
    safetyTips: 'Guías de Emergencia Paso a Paso',
    reportProblem: 'Reportar Peligro / Incidente',
    safeAssistAi: 'Asistente IA SafeAssist',
    callNow: 'Llamar',
    copyNumber: 'Copiar',
    directions: 'Direcciones',
    verifiedOfficial: 'Recurso Oficial Verificado',
    open247: 'Abierto 24/7'
  }
};
