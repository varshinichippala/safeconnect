import { SafetyGuide } from '../types';

export const SAFETY_GUIDES: SafetyGuide[] = [
  {
    id: 'guide-medical',
    title: 'Medical Emergency & Cardiac Event',
    category: 'medical',
    icon: 'HeartPulse',
    summary: 'Rapid response for suspected heart attack, stroke, or unresponsive individual.',
    criticalHotline: {
      label: 'Call Ambulance Immediately',
      number: '108',
    },
    steps: [
      {
        step: 1,
        title: 'Check Responsiveness & Breathing',
        description: 'Gently tap shoulders and shout "Are you okay?". Look at chest for normal breathing movements for no more than 10 seconds.'
      },
      {
        step: 2,
        title: 'Call 108 / 112 Immediately',
        description: 'Put call on speakerphone. State your exact location and clearly report "Unresponsive adult/child".'
      },
      {
        step: 3,
        title: 'Begin Hands-Only CPR (if not breathing)',
        description: 'Place heels of both hands in center of chest. Push hard and fast at 100–120 beats per minute (to rhythm of "Stayin Alive") until paramedics arrive.'
      },
      {
        step: 4,
        title: 'For Suspected Stroke: Test F.A.S.T.',
        description: 'Face drooping? Arm weakness? Slurred speech? Note exact Time symptoms started and inform paramedics.'
      }
    ],
    dos: [
      'Keep patient calm, lying down or half-sitting if breathing.',
      'Loosen tight clothing around neck and waist.',
      'Clear crowds to ensure adequate fresh airflow.',
      'Unlock building doors for inbound ambulance crew.'
    ],
    donts: [
      'DO NOT give liquids, food, or aspirin if patient is unconscious or drowsy.',
      'DO NOT leave patient unattended to fetch water.',
      'DO NOT attempt to drive a severely unstable cardiac patient yourself if ambulance is en route.'
    ]
  },
  {
    id: 'guide-fire',
    title: 'Fire Outbreak & Smoke Evacuation',
    category: 'fire',
    icon: 'Flame',
    summary: 'Immediate action during residential, commercial, or electrical fire.',
    criticalHotline: {
      label: 'Call Fire Services',
      number: '101',
    },
    steps: [
      {
        step: 1,
        title: 'Sound the Alarm & Alert Occupants',
        description: 'Yell "Fire!" loud and clear, activate manual fire pull stations, and call 101 or 112 without delay.'
      },
      {
        step: 2,
        title: 'Crawl Low Under Smoke',
        description: 'Toxic fumes rise. Stay on hands and knees where air is coolest and cleanest. Cover mouth and nose with a damp cloth if available.'
      },
      {
        step: 3,
        title: 'Test Closed Doors with Back of Hand',
        description: 'Touch doorknob and upper door. If warm, DO NOT open—fire is on the other side. Seek alternative exit or window.'
      },
      {
        step: 4,
        title: 'Evacuate via Stairs Only',
        description: 'Never use elevators during a fire; electrical power can fail instantly. Assemble at predetermined safe outdoor point.'
      }
    ],
    dos: [
      'Remember STOP, DROP, AND ROLL if clothing catches fire.',
      'Close doors behind you as you exit to contain flame and oxygen.',
      'Discharge ABC dry chemical extinguisher using PASS (Pull, Aim, Squeeze, Sweep) only if fire is small and exit is behind you.'
    ],
    donts: [
      'DO NOT throw water on electrical fires or burning cooking oil (grease fires).',
      'DO NOT re-enter a burning structure for pets, phones, or valuables.',
      'DO NOT use elevators.'
    ]
  },
  {
    id: 'guide-accident',
    title: 'Road Traffic Accident',
    category: 'accident',
    icon: 'CarCrash',
    summary: 'Securing the scene, preventing secondary collisions, and managing severe trauma.',
    criticalHotline: {
      label: 'Call Police & Ambulance',
      number: '112',
    },
    steps: [
      {
        step: 1,
        title: 'Secure the Crash Site',
        description: 'Park your vehicle safely away with hazard lights on. Place warning triangles or markers 50m before the scene to alert oncoming traffic.'
      },
      {
        step: 2,
        title: 'Switch Off Ignitions',
        description: 'Turn off vehicle engines of involved cars to prevent fuel ignition and battery sparking.'
      },
      {
        step: 3,
        title: 'Dial 112 / 108',
        description: 'Report number of casualties, trapped individuals, fuel leaks, and precise landmark/highway kilometer stone.'
      },
      {
        step: 4,
        title: 'Control Severe Bleeding with Direct Pressure',
        description: 'Use clean cloth or trauma dressing. Apply firm, continuous pressure directly on wound. Elevate injured limb if no fracture suspected.'
      }
    ],
    dos: [
      'Support victim head and neck in neutral alignment if spinal injury is suspected.',
      'Reassure conscious victims and keep them still and warm.',
      'Good Samaritan Law protects bystanders who render first aid in good faith.'
    ],
    donts: [
      'DO NOT move an injured person from vehicle unless immediate risk of fire or explosion.',
      'DO NOT remove a motorcyclist helmet unless airway is obstructed and you are trained.',
      'DO NOT administer fluids to victims in shock.'
    ]
  },
  {
    id: 'guide-flood',
    title: 'Flood & Urban Waterlogging',
    category: 'disaster',
    icon: 'Waves',
    summary: 'Flash floods, breached drains, and monsoon inundation safety.',
    criticalHotline: {
      label: 'Disaster Helpline',
      number: '1070',
    },
    steps: [
      {
        step: 1,
        title: 'Move to Higher Ground Immediately',
        description: 'Do not wait for formal instructions if water levels start rising rapidly. Move to upper floors or high ground.'
      },
      {
        step: 2,
        title: 'Disconnect Main Utilities',
        description: 'Turn off electricity at the main breaker board and shut main gas valve if it is safe to reach.'
      },
      {
        step: 3,
        title: 'Never Walk or Drive Through Moving Water',
        description: '"Turn Around, Don\'t Drown." Just 15 cm (6 inches) of moving water can knock you down, and 30 cm can float a small car.'
      },
      {
        step: 4,
        title: 'Monitor Official Emergency Radio / Alerts',
        description: 'Listen to official state disaster warnings and follow designated evacuation corridors.'
      }
    ],
    dos: [
      'Store boiled or sealed drinking water in clean containers.',
      'Keep waterproof grab-bag with ID cards, medicines, torch, and power bank.',
      'Watch out for submerged snakes, open manholes, and live downed cables.'
    ],
    donts: [
      'DO NOT wade into dark flood water where manhole covers may have popped off.',
      'DO NOT touch submerged electrical panels or wet switches.',
      'DO NOT eat food that has come into contact with floodwater.'
    ]
  },
  {
    id: 'guide-cyclone',
    title: 'Cyclone & Severe Gale Storm',
    category: 'disaster',
    icon: 'Wind',
    summary: 'High-speed winds, storm surges, and flying debris precautions.',
    criticalHotline: {
      label: 'NDRF Rescue Cell',
      number: '1078',
    },
    steps: [
      {
        step: 1,
        title: 'Secure Exterior Structures & Windows',
        description: 'Board up or tape glass windows. Tie down loose outdoor furniture, tin roofs, and rooftop water tanks.'
      },
      {
        step: 2,
        title: 'Retreat to the Strongest Interior Room',
        description: 'Stay inside a central windowless room, hallway, or basement on ground floor during peak winds.'
      },
      {
        step: 3,
        title: 'Beware of the "Eye of the Storm"',
        description: 'If winds suddenly stop and sky clears, the storm is NOT over. The calm center is passing; opposite ferocious winds will resume shortly.'
      },
      {
        step: 4,
        title: 'Wait for Official All-Clear',
        description: 'Remain sheltered until disaster authorities declare the cyclone has completely passed inland.'
      }
    ],
    dos: [
      'Fully charge mobile devices, power banks, and battery lamps in advance.',
      'Keep dry food rations (nuts, biscuits, canned food) for at least 72 hours.',
      'Trim overhanging dead tree branches near power lines before the storm season.'
    ],
    donts: [
      'DO NOT venture outdoors during the eye of the storm.',
      'DO NOT park vehicles under large trees, billboards, or electric poles.',
      'DO NOT spread unverified panic rumors on social messaging apps.'
    ]
  },
  {
    id: 'guide-earthquake',
    title: 'Earthquake Tremors & Shaking',
    category: 'disaster',
    icon: 'Activity',
    summary: 'Immediate behavioral safety during seismic ground tremors.',
    criticalHotline: {
      label: 'Unified Emergency SOS',
      number: '112',
    },
    steps: [
      {
        step: 1,
        title: 'DROP, COVER, AND HOLD ON',
        description: 'Drop to your hands and knees. Cover your head and neck under a sturdy table or desk. Hold on until shaking stops.'
      },
      {
        step: 2,
        title: 'Stay Indoors if Inside',
        description: 'Most injuries occur when people try to exit buildings while shaking is active due to falling bricks, glass, and parapets.'
      },
      {
        step: 3,
        title: 'If Outdoors, Move to Open Space',
        description: 'Stay clear of buildings, power lines, streetlights, and overpasses. Drop to ground and protect head.'
      },
      {
        step: 4,
        title: 'Inspect for Gas Leaks & Structural Damage',
        description: 'Once shaking stops, use stairs to exit. If you smell gas, open windows, evacuate, and do NOT flip light switches.'
      }
    ],
    dos: [
      'Protect head with pillows or arms if in bed and unable to crawl.',
      'Expect aftershocks; stay alert and prepared to repeat Drop, Cover, Hold on.',
      'Use text messages or messaging apps rather than voice calls to leave networks open for emergency services.'
    ],
    donts: [
      'DO NOT run outside while ground is actively shaking.',
      'DO NOT use elevators.',
      'DO NOT stand under doorways (modern doorways are not stronger than rest of building).'
    ]
  },
  {
    id: 'guide-heatwave',
    title: 'Extreme Heat & Heatstroke Emergency',
    category: 'disaster',
    icon: 'SunMedium',
    summary: 'Recognizing life-threatening heatstroke vs. heat exhaustion.',
    criticalHotline: {
      label: 'Medical Advice Helpline',
      number: '104',
    },
    steps: [
      {
        step: 1,
        title: 'Recognize Heatstroke Warning Signs',
        description: 'Body temperature > 103°F (39.4°C), hot red dry skin (or heavy sweat), confusion, nausea, or loss of consciousness.'
      },
      {
        step: 2,
        title: 'Call 108 Immediately for Heatstroke',
        description: 'Heatstroke is a medical emergency that can damage brain and vital organs within minutes.'
      },
      {
        step: 3,
        title: 'Rapidly Cool the Person Down',
        description: 'Move to shade or air conditioning. Apply cold wet towels or ice packs to neck, armpits, and groin. Fan aggressively.'
      },
      {
        step: 4,
        title: 'Hydrate ONLY if Fully Conscious',
        description: 'Sip cool water or ORS solution slowly. Never force liquids if person is confused or vomiting.'
      }
    ],
    dos: [
      'Wear loose, lightweight, light-colored cotton clothing.',
      'Schedule strenuous outdoor labor before 9:00 AM or after 5:30 PM.',
      'Check on elderly neighbors and vulnerable family members daily during heatwaves.'
    ],
    donts: [
      'DO NOT leave children, disabled persons, or pets in closed parked cars even for 1 minute.',
      'DO NOT drink alcohol or sugary beverages which accelerate dehydration.',
      'DO NOT give salt tablets without direct doctor recommendation.'
    ]
  },
  {
    id: 'guide-missing',
    title: 'Missing Person & Child Outreach',
    category: 'safety',
    icon: 'UserX',
    summary: 'Critical first 2 hours after someone disappears.',
    criticalHotline: {
      label: 'Childline / Police Helpdesk',
      number: '1098',
    },
    steps: [
      {
        step: 1,
        title: 'Conduct an Immediate Thorough Local Search',
        description: 'Check house hiding spots, closets, vehicles, neighbors, nearby ponds, transit stops, and recent walking routes.'
      },
      {
        step: 2,
        title: 'Contact Police Immediately (No 24-Hour Wait)',
        description: 'There is NO law requiring a 24-hour waiting period for missing persons or children. File a missing person report right away.'
      },
      {
        step: 3,
        title: 'Gather Key Descriptive Information',
        description: 'Recent clear photograph, exact clothing worn, height/weight, distinguishing marks, medical requirements, and mobile phone IMEI/number.'
      },
      {
        step: 4,
        title: 'Preserve Physical Evidence',
        description: 'Do not disturb the person bedroom or personal items (preserves scent for tracking dogs and forensic verification).'
      }
    ],
    dos: [
      'Call Childline (1098) immediately if a minor is missing.',
      'Alert security at local metro/bus/train stations with child description.',
      'Verify last known phone location with family circle tracking if enabled.'
    ],
    donts: [
      'DO NOT wait 24 hours to contact the police.',
      'DO NOT post full home address or sensitive identity documents publicly on social media.',
      'DO NOT conduct solitary searches in hazardous terrain at night.'
    ]
  },
  {
    id: 'guide-suspicious',
    title: 'Suspicious Activity & Cyber Fraud',
    category: 'safety',
    icon: 'ShieldQuestion',
    summary: 'Unattended packages, potential threat indicators, and online financial scams.',
    criticalHotline: {
      label: 'Cyber Fraud Golden Hour',
      number: '1930',
    },
    steps: [
      {
        step: 1,
        title: 'For Financial Cyber Fraud: Act in First 2 Hours',
        description: 'Immediately call 1930 or visit cybercrime.gov.in. State transaction IDs, bank accounts, and UPI references to freeze transfer funds.'
      },
      {
        step: 2,
        title: 'Unattended Luggage / Suspicious Bag in Public',
        description: 'DO NOT touch, move, or open the item. Keep at least 100m distance. Notify security or call 112 with exact location.'
      },
      {
        step: 3,
        title: 'Lock Banking Apps & Cards',
        description: 'Call your bank 24x7 helpline to block debit/credit cards, net banking, and change email passwords from a secure device.'
      },
      {
        step: 4,
        title: 'Preserve Screenshots & Call Logs',
        description: 'Save SMS OTP notices, fraudulent URL links, sender phone numbers, and transaction reference screens without altering them.'
      }
    ],
    dos: [
      'Immediately block unauthorized transactions with your bank.',
      'Share details only through official police and cyber crime portals.',
      'Report suspicious individuals loitering near vital installations directly to 100/112.'
    ],
    donts: [
      'DO NOT install screen-sharing apps (AnyDesk, TeamViewer) at request of unknown callers.',
      'DO NOT share OTP, UPI PIN, or ATM PIN with anyone claiming to be bank or police personnel.',
      'DO NOT inspect unattended packages yourself.'
    ]
  }
];
