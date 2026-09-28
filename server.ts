import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import {
  INITIAL_SERVICES,
  INITIAL_ALERTS,
  INITIAL_REPORTS
} from './src/data/emergencyData.ts';
import { EmergencyService, EmergencyAlert, LocalProblemReport } from './src/types/index.ts';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// In-Memory Database store initialized from verified seed data
let servicesDatabase: EmergencyService[] = [...INITIAL_SERVICES];
let alertsDatabase: EmergencyAlert[] = [...INITIAL_ALERTS];
let reportsDatabase: LocalProblemReport[] = [...INITIAL_REPORTS];

// Helper: Haversine distance in kilometers
function calculateHaversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

// -------------------------------------------------------------
// API ROUTES
// -------------------------------------------------------------

// 1. Emergency Services Endpoints
app.get('/api/services', (req: Request, res: Response) => {
  const { category, city, state, search, lat, lng } = req.query;
  let results = [...servicesDatabase];

  if (category && typeof category === 'string' && category !== 'all') {
    results = results.filter((s) => s.category.toLowerCase() === category.toLowerCase());
  }

  if (city && typeof city === 'string' && city !== 'all') {
    results = results.filter((s) => s.city.toLowerCase() === city.toLowerCase());
  }

  if (state && typeof state === 'string' && state !== 'all') {
    results = results.filter((s) => s.state.toLowerCase() === state.toLowerCase());
  }

  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    results = results.filter(
      (s) =>
        s.service_name.toLowerCase().includes(q) ||
        s.address.toLowerCase().includes(q) ||
        s.area.toLowerCase().includes(q) ||
        (s.sub_category && s.sub_category.toLowerCase().includes(q)) ||
        (s.capabilities && s.capabilities.some((c) => c.toLowerCase().includes(q)))
    );
  }

  // Calculate distance if coordinates provided
  if (lat && lng) {
    const userLat = parseFloat(lat as string);
    const userLng = parseFloat(lng as string);
    if (!isNaN(userLat) && !isNaN(userLng)) {
      results = results.map((item) => ({
        ...item,
        distance: calculateHaversineDistance(userLat, userLng, item.latitude, item.longitude)
      })).sort((a: any, b: any) => (a.distance || 0) - (b.distance || 0));
    }
  }

  res.json({ success: true, count: results.length, data: results });
});

app.post('/api/services', (req: Request, res: Response) => {
  const newService: EmergencyService = {
    ...req.body,
    service_id: `srv-${Date.now().toString(36)}`,
    last_verified: new Date().toISOString().split('T')[0],
    verification_status: req.body.verification_status || 'verified'
  };

  if (!newService.service_name || !newService.category || !newService.phone) {
    return res.status(400).json({ success: false, error: 'Missing required service fields' });
  }

  servicesDatabase.unshift(newService);
  res.status(201).json({ success: true, data: newService });
});

app.put('/api/services/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = servicesDatabase.findIndex((s) => s.service_id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, error: 'Service not found' });
  }

  servicesDatabase[index] = {
    ...servicesDatabase[index],
    ...req.body,
    service_id: id,
    last_verified: new Date().toISOString().split('T')[0]
  };

  res.json({ success: true, data: servicesDatabase[index] });
});

app.delete('/api/services/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const initialLength = servicesDatabase.length;
  servicesDatabase = servicesDatabase.filter((s) => s.service_id !== id);

  if (servicesDatabase.length === initialLength) {
    return res.status(404).json({ success: false, error: 'Service not found' });
  }

  res.json({ success: true, message: 'Service removed successfully' });
});

// 2. Emergency Alerts Endpoints
app.get('/api/alerts', (req: Request, res: Response) => {
  const { activeOnly, city } = req.query;
  let results = [...alertsDatabase];

  if (activeOnly === 'true') {
    results = results.filter((a) => a.is_active);
  }

  if (city && typeof city === 'string' && city !== 'all') {
    results = results.filter((a) => !a.city || a.city.toLowerCase() === city.toLowerCase());
  }

  res.json({ success: true, count: results.length, data: results });
});

app.post('/api/alerts', (req: Request, res: Response) => {
  const newAlert: EmergencyAlert = {
    ...req.body,
    alert_id: `alt-${Date.now().toString(36)}`,
    created_at: new Date().toISOString(),
    is_active: true,
    is_demo_data: req.body.is_demo_data ?? false
  };

  if (!newAlert.title || !newAlert.severity || !newAlert.affected_area) {
    return res.status(400).json({ success: false, error: 'Title, severity, and affected area are required' });
  }

  alertsDatabase.unshift(newAlert);
  res.status(201).json({ success: true, data: newAlert });
});

app.delete('/api/alerts/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  alertsDatabase = alertsDatabase.filter((a) => a.alert_id !== id);
  res.json({ success: true, message: 'Alert dismissed or deleted' });
});

// 3. Local Problem Reports Endpoints
app.get('/api/reports', (req: Request, res: Response) => {
  res.json({ success: true, count: reportsDatabase.length, data: reportsDatabase });
});

app.post('/api/reports', (req: Request, res: Response) => {
  const { category, description, location, contact_info, reporter_name, image, city, area } = req.body;

  if (!category || !description || !location) {
    return res.status(400).json({ success: false, error: 'Category, description, and location are required' });
  }

  const newReport: LocalProblemReport = {
    report_id: `REP-${Math.floor(1000 + Math.random() * 9000)}`,
    category,
    description,
    location,
    city: city || 'Unspecified',
    area: area || 'Unspecified',
    image: image || undefined,
    created_at: new Date().toISOString(),
    status: 'pending',
    contact_info: contact_info || undefined,
    reporter_name: reporter_name || 'Anonymous Community Member',
    priority: category === 'fire' || category === 'road_accident' || category === 'electrical_hazard' ? 'High' : 'Medium'
  };

  reportsDatabase.unshift(newReport);
  res.status(201).json({
    success: true,
    message: 'Report submitted successfully. Your community hazard ticket has been logged for municipal review.',
    data: newReport
  });
});

app.patch('/api/reports/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, priority } = req.body;

  const report = reportsDatabase.find((r) => r.report_id === id);
  if (!report) {
    return res.status(404).json({ success: false, error: 'Report not found' });
  }

  if (status) report.status = status;
  if (priority) report.priority = priority;

  res.json({ success: true, data: report });
});

// 4. Portal Statistics (for admin and public confidence)
app.get('/api/stats', (_req: Request, res: Response) => {
  const totalHospitals = servicesDatabase.filter((s) => s.category === 'hospital').length;
  const totalPolice = servicesDatabase.filter((s) => s.category === 'police').length;
  const totalFire = servicesDatabase.filter((s) => s.category === 'fire').length;
  const totalAmbulance = servicesDatabase.filter((s) => s.category === 'ambulance').length;
  const activeAlerts = alertsDatabase.filter((a) => a.is_active).length;
  const pendingReports = reportsDatabase.filter((r) => r.status === 'pending').length;
  const resolvedReports = reportsDatabase.filter((r) => r.status === 'resolved').length;
  const verifiedCount = servicesDatabase.filter((s) => s.verification_status === 'verified').length;

  res.json({
    success: true,
    stats: {
      totalServices: servicesDatabase.length,
      totalHospitals,
      totalPolice,
      totalFire,
      totalAmbulance,
      activeAlerts,
      pendingReports,
      resolvedReports,
      verificationRate: Math.round((verifiedCount / servicesDatabase.length) * 100) || 100,
      lastAuditDate: '2026-09-28'
    }
  });
});

// 5. Admin Authentication Endpoint
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (
    (email === 'admin@safeconnect.gov' || email === 'admin') &&
    (password === 'SafeAdmin#2026' || password === 'admin123' || password === 'demo')
  ) {
    return res.json({
      success: true,
      user: {
        user_id: 'usr-admin-01',
        name: 'Chief Emergency Operations Officer',
        email: 'admin@safeconnect.gov',
        role: 'admin',
        location: 'National Command Center'
      },
      token: 'jwt-mock-session-' + Date.now()
    });
  }

  if (
    email === 'dispatcher@safeconnect.gov' &&
    (password === 'Dispatcher#2026' || password === 'demo')
  ) {
    return res.json({
      success: true,
      user: {
        user_id: 'usr-disp-02',
        name: 'Duty Dispatch Coordinator',
        email: 'dispatcher@safeconnect.gov',
        role: 'dispatcher',
        location: 'Metropolitan Emergency Desk'
      },
      token: 'jwt-mock-session-' + Date.now()
    });
  }

  res.status(401).json({
    success: false,
    error: 'Invalid credentials. Use demo account: admin@safeconnect.gov / SafeAdmin#2026'
  });
});

// 6. SafeAssist AI Assistant Endpoint (Powered by Gemini)
app.post('/api/ai/chat', async (req: Request, res: Response) => {
  const { message, history } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ success: false, error: 'Message text is required' });
  }

  const emergencySystemPrompt = `
You are "SafeAssist", the dedicated emergency guidance assistant for the SafeConnect Local Emergency Information Portal.
Your primary mission is to help people stay safe, find the right emergency service category quickly, and provide verified first-aid and safety protocols.

MANDATORY SAFETY RULES:
1. EMERGENCY FIRST: If the user describes an active, life-threatening situation (e.g., chest pain, difficulty breathing, severe bleeding, unconsciousness, active fire, armed assault, robbery in progress, drowning), ALWAYS start your response with a bold emergency disclaimer:
   "🚨 **IMMEDIATE EMERGENCY: Call 112 (Universal) or 108 (Ambulance) / 101 (Fire) / 100 (Police) immediately.**"
2. DO NOT DIAGNOSE: You are NOT a doctor, paramedic, or police officer. Never give medical diagnoses or say "You have X disease".
3. NO DANGEROUS INSTRUCTIONS: Never tell users to delay calling emergency services, never suggest unproven home remedies for serious injuries.
4. MAP TO CATEGORIES: Identify which emergency service on SafeConnect the user needs:
   - Medical / Trauma -> Hospitals or Ambulance (108)
   - Crime / Violence / Traffic Accident -> Police (100 / 112)
   - Fire / Building Hazard / Trapped -> Fire & Rescue (101)
   - Disaster (Flood / Cyclone / Earthquake) -> Disaster Helpline (1070 / 1078)
   - Cyber Fraud -> Cybercrime Helpline (1930)
   - Women / Child in distress -> Women Helpline (1091) / Childline (1098)
5. Keep steps short, structured, bulleted, and calm.
6. Emphasize that SafeConnect is an informational tool and does not replace official dispatch.
`;

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    // Graceful fallback response if API key is not configured in environment
    const userLower = message.toLowerCase();
    let fallbackReply = `🚨 **If this is an immediate emergency, please call 112 or 108 immediately.**\n\n`;

    if (userLower.includes('heart') || userLower.includes('chest') || userLower.includes('breath') || userLower.includes('cpr')) {
      fallbackReply += `**Immediate Steps for Suspected Cardiac / Respiratory Emergency:**\n- Call **108** (Ambulance) right away.\n- Put phone on speaker so you can hear dispatcher.\n- If unresponsive and not breathing normally, begin **Hands-Only CPR**: push hard and fast in center of chest at 100-120 bpm.\n- Check SafeConnect's **Hospitals** section for the nearest Level-1 Trauma Center.`;
    } else if (userLower.includes('fire') || userLower.includes('smoke') || userLower.includes('burn')) {
      fallbackReply += `**Immediate Steps for Fire & Burn Safety:**\n- Call **101** (Fire & Rescue) immediately.\n- Crawl low under smoke to exit; never use elevators.\n- If minor burn: cool with cool running water for 10-15 minutes (do not use ice or butter).\n- Check SafeConnect's **Fire & Rescue** section for nearest fire brigade.`;
    } else if (userLower.includes('accident') || userLower.includes('crash') || userLower.includes('bleed')) {
      fallbackReply += `**Immediate Steps for Road Traffic Accident & Bleeding:**\n- Call **112** for combined Police & Ambulance dispatch.\n- Keep patient still, support head/neck.\n- Apply firm direct pressure with clean cloth over any severe bleeding.\n- Do not move victim unless immediate risk of fire or vehicle explosion.`;
    } else if (userLower.includes('flood') || userLower.includes('cyclone') || userLower.includes('earthquake')) {
      fallbackReply += `**Immediate Steps for Disaster Safety:**\n- For floods: Never walk or drive through moving water. Move to upper levels.\n- For earthquake: Drop, Cover, and Hold on under sturdy furniture.\n- Call Disaster Management Helpline at **1070** or NDRF at **1078**.\n- Check SafeConnect's **Disaster Safety** tab for complete preparedness guides.`;
    } else if (userLower.includes('cyber') || userLower.includes('fraud') || userLower.includes('scam') || userLower.includes('otp')) {
      fallbackReply += `**Immediate Steps for Cyber Financial Fraud:**\n- Call National Cyber Crime Helpline **1930** immediately.\n- Contact your bank's 24/7 card block number to freeze debit/credit cards.\n- Preserve transaction IDs, SMS alerts, and UPI reference screenshots.`;
    } else {
      fallbackReply += `I am **SafeAssist**, your emergency portal guide.\n\nI can help direct you to:\n- 🚑 **Medical & Ambulance** (Call 108)\n- 🚓 **Police & Safety** (Call 100/112)\n- 🚒 **Fire & Rescue** (Call 101)\n- 🏥 **24x7 Hospitals & Trauma Bays**\n- 💊 **All-Night Pharmacies & Blood Banks**\n- 🌪️ **Natural Disaster Evacuation Steps**\n\nPlease tell me what kind of situation you are facing so I can guide you to the right section or official hotline!`;
    }

    return res.json({
      success: true,
      reply: fallbackReply,
      source: 'offline-safety-rules'
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });

    const promptText = `
Contextual Information:
User is currently asking about an emergency or local safety issue.
User Query: "${message}"

Please respond according to your emergency assistant rules. Be concise, reassuring, actionable, and safety-focused.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        systemInstruction: emergencySystemPrompt,
        temperature: 0.3
      }
    });

    const reply = response.text || '🚨 Please call 112 or 108 for immediate emergency assistance.';

    res.json({
      success: true,
      reply,
      source: 'gemini-3.8-flash'
    });
  } catch (err: any) {
    console.error('Error contacting Gemini API:', err);
    res.json({
      success: true,
      reply: `🚨 **In an immediate emergency, please dial 112 or 108 without delay.**\n\nOur assistant is temporarily operating in safety fallback mode. Please refer directly to the **Emergency Contacts** or **Hospitals** sections on this website.`,
      source: 'safety-fallback'
    });
  }
});

// -------------------------------------------------------------
// VITE DEV SERVER / PRODUCTION STATIC SERVING
// -------------------------------------------------------------
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true'
      },
      appType: 'spa'
    });

    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SafeConnect] Server active and listening on port ${PORT}`);
  });
}

startServer();
