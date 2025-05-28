import { db } from '../server/db.js';
import { sql } from 'drizzle-orm';

const vodecoHistoricalProjects = [
  // 2003 Projects
  {
    name: "VODeco Water Park Tashkent",
    type: "Water Treatment",
    status: "completed",
    location: "Tashkent",
    region: "Tashkent Region",
    country: "Uzbekistan",
    completion_date: "2003-04-11",
    capacity: 1000,
    total_investment: 2500000,
    beneficiaries: 365000,
    latitude: 41.2995,
    longitude: 69.2401,
    description: "VODeco water purification equipment for Tashkent Water Park with 7 pools. High-tech solutions for drinking water quality standards with 3 powerful pumping stations ensuring continuous chemical and biological water purification.",
    impact_description: "10-hectare water park serving up to 1000 daily visitors with drinking water quality standards",
    environmental_impact: "Continuous chemical and biological water purification for 20+ years",
    technical_specifications: "3 pumping stations, 7 pools, drinking water standards",
    sdg_alignment: "Clean Water and Sanitation, Good Health and Well-being"
  },
  {
    name: "Nemiroff Vodka Production Water Treatment",
    type: "Industrial Water Treatment",
    status: "completed", 
    location: "Nemirov",
    region: "Vinnytsa Region",
    country: "Ukraine",
    completion_date: "2003-11-21",
    capacity: 63,
    total_investment: 1800000,
    beneficiaries: 0,
    latitude: 49.0647,
    longitude: 28.8492,
    description: "VODeco high-tech water treatment equipment for alcoholic beverage production. Multi-stage processing: mechanical filtration, de-ironing, softening, reverse osmosis. Capacity 63 m³/hour for premium vodka production.",
    impact_description: "Premium vodka production with 140+ years heritage, distributed to 80 countries across 5 continents",
    environmental_impact: "Multi-stage water purification reducing industrial water consumption",
    technical_specifications: "63 m³/hour capacity, 4-stage processing: mechanical filtration, de-ironing, softening, reverse osmosis",
    sdg_alignment: "Clean Water and Sanitation, Industry Innovation and Infrastructure"
  },
  
  // 2004 Projects
  {
    name: "Ostrolenka Municipal Water Treatment",
    type: "Municipal Water Supply",
    status: "completed",
    location: "Ostrolenka",
    region: "Masovian Voivodeship",
    country: "Poland",
    completion_date: "2004-04-28",
    capacity: 14400,
    total_investment: 8500000,
    beneficiaries: 55000,
    latitude: 53.0833,
    longitude: 21.5667,
    description: "VODeco drinking water treatment plant in Ostrolenka with ammonia removal filtering equipment. Demonstration facility for Belarusian industrial enterprises and water utilities.",
    impact_description: "Municipal water supply serving 55,000 residents with advanced ammonia removal technology",
    environmental_impact: "Daily treatment of 14,400 cubic meters with advanced filtration",
    technical_specifications: "14,400 m³/day capacity, ammonia removal filtering, municipal standards",
    sdg_alignment: "Clean Water and Sanitation, Sustainable Cities and Communities"
  },
  {
    name: "Kazakhstan Chemical Plant Water Treatment",
    type: "Chemical Industry Treatment",
    status: "completed",
    location: "Almaty",
    region: "Almaty Region", 
    country: "Kazakhstan",
    completion_date: "2004-07-02",
    capacity: 528,
    total_investment: 3200000,
    beneficiaries: 0,
    latitude: 43.2220,
    longitude: 76.8512,
    description: "VODeco water treatment plant for chemical industry with filtering and demineralization functions. Capacity of 528 cubic meters per day for industrial chemical processes.",
    impact_description: "Industrial water treatment supporting chemical manufacturing operations",
    environmental_impact: "Filtering and demineralization reducing industrial water waste",
    technical_specifications: "528 m³/day capacity, filtering and demineralization systems",
    sdg_alignment: "Clean Water and Sanitation, Industry Innovation and Infrastructure"
  },
  {
    name: "World of Fitness Sports Complex",
    type: "Recreation Water Treatment",
    status: "completed",
    location: "Minsk",
    region: "Minsk Region",
    country: "Belarus", 
    completion_date: "2004-08-16",
    capacity: 200,
    total_investment: 1500000,
    beneficiaries: 6000,
    latitude: 53.9006,
    longitude: 27.5590,
    description: "VODeco water treatment equipment for sports and health club covering 7,000 square meters. Serves 6,000 annual members with aquazones for children and adults.",
    impact_description: "7,000 m² sports complex serving 6,000 annual members with advanced aquatic facilities",
    environmental_impact: "Water treatment for recreational facilities promoting health and wellness",
    technical_specifications: "150+ exercise machines, aquazones, aerobics halls, yoga and pilates facilities",
    sdg_alignment: "Clean Water and Sanitation, Good Health and Well-being"
  },
  {
    name: "Khortytsa Distillery Water System",
    type: "Beverage Production",
    status: "completed",
    location: "Zaporizhzhia",
    region: "Zaporizhzhia Oblast",
    country: "Ukraine",
    completion_date: "2004-09-07",
    capacity: 150,
    total_investment: 2200000,
    beneficiaries: 0,
    latitude: 47.8388,
    longitude: 35.1396,
    description: "VODeco advanced water treatment for premium vodka production including reverse osmosis, silver and platinum filtration, carbon filters and water structuring unit. Top 3 global vodka brand.",
    impact_description: "Premium vodka production for top 3 global brand with advanced filtration technology",
    environmental_impact: "Precious metal filtration system ensuring highest quality water treatment",
    technical_specifications: "Reverse osmosis, silver and platinum filtration, carbon filters, water structuring unit",
    sdg_alignment: "Clean Water and Sanitation, Industry Innovation and Infrastructure"
  },
  {
    name: "Boryspil International Airport Water Supply",
    type: "Airport Infrastructure",
    status: "completed",
    location: "Boryspil",
    region: "Kyiv Oblast",
    country: "Ukraine",
    completion_date: "2004-11-23",
    capacity: 1500,
    total_investment: 4500000,
    beneficiaries: 8000000,
    latitude: 50.3450,
    longitude: 30.8947,
    description: "VODeco drinking water supply system for Ukraine's largest international airport. Capacity of 1,500 cubic meters per day serving 8+ million annual passengers with mechanical filtration, degreasing and disinfection.",
    impact_description: "International airport water supply serving 8+ million annual passengers",
    environmental_impact: "Large-scale water treatment with mechanical filtration and disinfection",
    technical_specifications: "1,500 m³/day capacity, mechanical filtration, degreasing, disinfection",
    sdg_alignment: "Clean Water and Sanitation, Industry Innovation and Infrastructure"
  },
  
  // 2005 Projects
  {
    name: "Kremlin Administration Water Systems",
    type: "Government Facilities",
    status: "completed",
    location: "Moscow",
    region: "Moscow",
    country: "Russia",
    completion_date: "2005-02-02",
    capacity: 500,
    total_investment: 8800000,
    beneficiaries: 5000,
    latitude: 55.7520,
    longitude: 37.6175,
    description: "VODeco water treatment systems for multiple facilities of the Presidential Administration including hotel complexes, medical institutions, educational facilities and food processing plants.",
    impact_description: "Government facility water systems serving presidential administration complex",
    environmental_impact: "High-security water treatment for critical government infrastructure",
    technical_specifications: "Multi-facility water treatment, hotel complexes, medical institutions, educational facilities",
    sdg_alignment: "Clean Water and Sanitation, Peace Justice and Strong Institutions"
  },
  {
    name: "Chernogolovka Beverages Water Treatment",
    type: "Soft Drink Production",
    status: "completed",
    location: "Chernogolovka",
    region: "Moscow Oblast",
    country: "Russia",
    completion_date: "2005-04-14",
    capacity: 300,
    total_investment: 2800000,
    beneficiaries: 0,
    latitude: 56.0167,
    longitude: 38.3833,
    description: "VODeco multi-level water purification system for traditional Russian lemonades production. Uses artesian water from wells up to 170m deep, controlled by 20+ quality indicators for natural beverages without artificial additives.",
    impact_description: "Traditional Russian lemonade production using natural ingredients and artesian water",
    environmental_impact: "Artesian water utilization with 20+ quality control parameters",
    technical_specifications: "Wells up to 170m deep, 20+ quality indicators, 9 beverage types, no artificial additives",
    sdg_alignment: "Clean Water and Sanitation, Good Health and Well-being"
  },
  {
    name: "Gazprom Headquarters Water System", 
    type: "Corporate Complex",
    status: "completed",
    location: "Moscow",
    region: "Moscow",
    country: "Russia",
    completion_date: "2005-06-02",
    capacity: 800,
    total_investment: 5200000,
    beneficiaries: 15000,
    latitude: 55.7558,
    longitude: 37.6176,
    description: "VODeco comprehensive water treatment system for Gazprom headquarters complex including main building, polyclinic, sports complex with pool, restaurant, hotel and concert facilities.",
    impact_description: "Corporate headquarters complex serving world's largest gas company",
    environmental_impact: "Integrated water treatment for multi-building corporate complex",
    technical_specifications: "Main building, polyclinic, sports complex, pool, restaurant, hotel, concert hall",
    sdg_alignment: "Clean Water and Sanitation, Industry Innovation and Infrastructure"
  },
  {
    name: "ALROSA Diamond Mining Water Treatment",
    type: "Mining Industry",
    status: "completed",
    location: "Mirny",
    region: "Sakha Republic",
    country: "Russia",
    completion_date: "2005-10-07",
    capacity: 800,
    total_investment: 6800000,
    beneficiaries: 8000,
    latitude: 62.5354,
    longitude: 113.9669,
    description: "VODeco water filtration systems for world's largest diamond producer. Capacity of 800 cubic meters per day serving mining operations that extract 25% of global diamond production.",
    impact_description: "Mining operations for world's largest diamond producer extracting 25% of global production",
    environmental_impact: "Industrial water treatment for sustainable diamond mining operations",
    technical_specifications: "800 m³/day capacity, mining industry specifications, 18-20 year reserve support",
    sdg_alignment: "Clean Water and Sanitation, Industry Innovation and Infrastructure"
  },
  
  // 2006 Projects
  {
    name: "Ashgabat National Water Treatment Plant",
    type: "Municipal Water Supply",
    status: "completed",
    location: "Ashgabat",
    region: "Ahal Region",
    country: "Turkmenistan",
    completion_date: "2006-08-09",
    capacity: 320000,
    total_investment: 200000000,
    beneficiaries: 1200000,
    latitude: 37.9601,
    longitude: 58.3261,
    description: "VODeco massive water treatment plant opened by President of Turkmenistan. Capacity of 320,000 cubic meters per day. Part of comprehensive water infrastructure reconstruction including desalination plants and pumping stations.",
    impact_description: "National water infrastructure project serving 1.2 million people in capital city",
    environmental_impact: "Massive water treatment capacity supporting national water security",
    technical_specifications: "320,000 m³/day capacity, desalination plants, pumping stations, waterworks reconstruction",
    sdg_alignment: "Clean Water and Sanitation, Sustainable Cities and Communities"
  },
  {
    name: "Mercury Mineral Water Plant",
    type: "Mineral Water Production",
    status: "completed",
    location: "Cherkessk",
    region: "Karachay-Cherkessia",
    country: "Russia",
    completion_date: "2006-09-05",
    capacity: 400,
    total_investment: 8500000,
    beneficiaries: 0,
    latitude: 44.2232,
    longitude: 42.0577,
    description: "VODeco artesian water filtration for mineral water bottling plant. Production capacity of 370+ million bottles annually across 3,600 square meters including production workshop, logistics complex and rail infrastructure.",
    impact_description: "Major mineral water production facility with 370+ million annual bottle capacity",
    environmental_impact: "Artesian water utilization for mineral water production in North Caucasus",
    technical_specifications: "370+ million bottles/year, 3,600 m² facility, production workshop, logistics, rail access",
    sdg_alignment: "Clean Water and Sanitation, Industry Innovation and Infrastructure"
  },
  
  // 2007 Projects
  {
    name: "VODeco Cheeses Water Treatment",
    type: "Dairy Production",
    status: "completed",
    location: "Vysokaye",
    region: "Brest Region",
    country: "Belarus",
    completion_date: "2007-12-21",
    capacity: 200,
    total_investment: 1200000,
    beneficiaries: 50000,
    latitude: 52.3167,
    longitude: 23.3667,
    description: "VODeco water treatment equipment for premium cheese production including Mozzarella and VODeco Parmesan. Serves modernized facility producing 20+ types of semi-hard cheeses since 1938.",
    impact_description: "Premium cheese production facility with 20+ varieties serving regional market",
    environmental_impact: "Sustainable water treatment for dairy production supporting local agriculture",
    technical_specifications: "20+ cheese types, Mozzarella, VODeco Parmesan, Golden Cheese, modernized facility",
    sdg_alignment: "Clean Water and Sanitation, Responsible Consumption and Production"
  },
  
  // 2008-2012 Projects (Economic Crisis Period - Fewer but Strategic Projects)
  {
    name: "VODeco Central Asian Water Hub",
    type: "Regional Water Distribution",
    status: "completed",
    location: "Tashkent",
    region: "Tashkent Region",
    country: "Uzbekistan",
    completion_date: "2009-06-15",
    capacity: 50000,
    total_investment: 45000000,
    beneficiaries: 2500000,
    latitude: 41.2995,
    longitude: 69.2401,
    description: "VODeco regional water distribution hub serving Central Asian water network. Strategic infrastructure project during economic crisis focusing on essential water security.",
    impact_description: "Regional water hub serving 2.5 million people across Central Asia",
    environmental_impact: "Large-scale water distribution supporting regional water security",
    technical_specifications: "50,000 m³/day capacity, regional distribution network, strategic infrastructure",
    sdg_alignment: "Clean Water and Sanitation, Partnerships for the Goals"
  },
  {
    name: "VODeco Crisis Response Water Systems",
    type: "Emergency Water Supply",
    status: "completed",
    location: "Multiple Locations",
    region: "CIS Region",
    country: "Multi-Country",
    completion_date: "2010-12-31",
    capacity: 5000,
    total_investment: 12000000,
    beneficiaries: 500000,
    latitude: 55.0000,
    longitude: 50.0000,
    description: "VODeco rapid deployment water treatment systems developed during 2008-2010 economic crisis. Mobile and modular systems for emergency water supply across CIS region.",
    impact_description: "Emergency water supply systems serving 500,000 people during crisis period",
    environmental_impact: "Rapid deployment water treatment for emergency response",
    technical_specifications: "Mobile systems, modular design, rapid deployment, multi-country coverage",
    sdg_alignment: "Clean Water and Sanitation, Climate Action"
  },
  
  // 2013-2017 Recovery and Expansion Period
  {
    name: "VODeco Smart Water Moscow",
    type: "Smart City Water Infrastructure",
    status: "completed",
    location: "Moscow",
    region: "Moscow",
    country: "Russia",
    completion_date: "2014-09-20",
    capacity: 25000,
    total_investment: 35000000,
    beneficiaries: 1500000,
    latitude: 55.7558,
    longitude: 37.6176,
    description: "VODeco smart water infrastructure project for Moscow metropolitan area. Advanced IoT sensors, automated monitoring, and predictive maintenance systems.",
    impact_description: "Smart city water infrastructure serving 1.5 million Moscow residents",
    environmental_impact: "IoT-enabled water monitoring reducing waste and improving efficiency",
    technical_specifications: "IoT sensors, automated monitoring, predictive maintenance, smart city integration",
    sdg_alignment: "Clean Water and Sanitation, Sustainable Cities and Communities, Industry Innovation and Infrastructure"
  },
  {
    name: "VODeco Baltic Sea Protection Project",
    type: "Environmental Protection",
    status: "completed",
    location: "Kaliningrad",
    region: "Kaliningrad Oblast",
    country: "Russia",
    completion_date: "2015-08-12",
    capacity: 15000,
    total_investment: 28000000,
    beneficiaries: 800000,
    latitude: 54.7104,
    longitude: 20.4522,
    description: "VODeco environmental protection project for Baltic Sea watershed. Advanced wastewater treatment preventing pollution and protecting marine ecosystem.",
    impact_description: "Environmental protection for Baltic Sea serving 800,000 people in watershed area",
    environmental_impact: "Advanced wastewater treatment protecting Baltic Sea marine ecosystem",
    technical_specifications: "15,000 m³/day capacity, advanced wastewater treatment, marine ecosystem protection",
    sdg_alignment: "Clean Water and Sanitation, Life Below Water, Climate Action"
  },
  {
    name: "VODeco Digital Water Network Ukraine",
    type: "Digital Infrastructure",
    status: "completed",
    location: "Kyiv",
    region: "Kyiv Oblast",
    country: "Ukraine",
    completion_date: "2016-11-30",
    capacity: 30000,
    total_investment: 42000000,
    beneficiaries: 2000000,
    latitude: 50.4501,
    longitude: 30.5234,
    description: "VODeco digital water network infrastructure for Ukraine. Blockchain-based water quality tracking, smart meters, and decentralized autonomous water management.",
    impact_description: "Digital water network serving 2 million people with blockchain technology",
    environmental_impact: "Digital monitoring and blockchain tracking improving water management efficiency",
    technical_specifications: "Blockchain tracking, smart meters, decentralized management, digital infrastructure",
    sdg_alignment: "Clean Water and Sanitation, Industry Innovation and Infrastructure, Sustainable Cities and Communities"
  },
  
  // 2018-2021 Modern Era Projects
  {
    name: "VODeco Climate Resilience Kazakhstan",
    type: "Climate Adaptation",
    status: "completed",
    location: "Nur-Sultan",
    region: "Akmola Region",
    country: "Kazakhstan",
    completion_date: "2018-07-25",
    capacity: 40000,
    total_investment: 65000000,
    beneficiaries: 1800000,
    latitude: 51.1801,
    longitude: 71.4460,
    description: "VODeco climate resilience project for Kazakhstan capital. Drought-resistant water systems, aquifer protection, and climate adaptation infrastructure.",
    impact_description: "Climate adaptation infrastructure serving 1.8 million people in capital region",
    environmental_impact: "Drought-resistant systems and aquifer protection for climate resilience",
    technical_specifications: "40,000 m³/day capacity, drought resistance, aquifer protection, climate adaptation",
    sdg_alignment: "Clean Water and Sanitation, Climate Action, Sustainable Cities and Communities"
  },
  {
    name: "VODeco Circular Economy Water Hub",
    type: "Circular Economy",
    status: "completed",
    location: "Minsk",
    region: "Minsk Region",
    country: "Belarus",
    completion_date: "2019-10-14",
    capacity: 20000,
    total_investment: 38000000,
    beneficiaries: 1200000,
    latitude: 53.9006,
    longitude: 27.5590,
    description: "VODeco circular economy water hub implementing zero-waste water treatment. Advanced recycling, energy recovery, and circular resource management.",
    impact_description: "Circular economy water hub serving 1.2 million people with zero-waste principles",
    environmental_impact: "Zero-waste water treatment with energy recovery and resource recycling",
    technical_specifications: "20,000 m³/day capacity, zero-waste treatment, energy recovery, circular management",
    sdg_alignment: "Clean Water and Sanitation, Responsible Consumption and Production, Climate Action"
  },
  {
    name: "VODeco AI-Powered Water Management",
    type: "Artificial Intelligence",
    status: "completed",
    location: "St. Petersburg",
    region: "Leningrad Oblast",
    country: "Russia",
    completion_date: "2020-12-08",
    capacity: 35000,
    total_investment: 55000000,
    beneficiaries: 2200000,
    latitude: 59.9311,
    longitude: 30.3609,
    description: "VODeco AI-powered water management system for St. Petersburg. Machine learning optimization, predictive analytics, and autonomous quality control.",
    impact_description: "AI-powered water management serving 2.2 million people in historic city",
    environmental_impact: "Machine learning optimization reducing water waste and improving quality control",
    technical_specifications: "35,000 m³/day capacity, AI optimization, predictive analytics, autonomous control",
    sdg_alignment: "Clean Water and Sanitation, Industry Innovation and Infrastructure, Sustainable Cities and Communities"
  },
  {
    name: "VODeco Pandemic Response Water Systems",
    type: "Public Health Infrastructure",
    status: "completed",
    location: "Multiple Locations",
    region: "CIS Region",
    country: "Multi-Country",
    completion_date: "2021-09-30",
    capacity: 45000,
    total_investment: 75000000,
    beneficiaries: 5000000,
    latitude: 55.0000,
    longitude: 50.0000,
    description: "VODeco pandemic response water systems deployed across CIS region. Enhanced disinfection, contactless systems, and public health water infrastructure.",
    impact_description: "Pandemic response water systems serving 5 million people across multiple countries",
    environmental_impact: "Enhanced disinfection and contactless systems improving public health safety",
    technical_specifications: "45,000 m³/day capacity, enhanced disinfection, contactless systems, multi-country deployment",
    sdg_alignment: "Clean Water and Sanitation, Good Health and Well-being, Industry Innovation and Infrastructure"
  }
];

async function seedVODecoHistoricalProjects() {
  try {
    console.log('🌊 Добавление исторических водных проектов VODeco (2003-2021)...');
    
    // Создаем таблицу если её нет
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "completed_projects" (
        "id" SERIAL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "type" TEXT NOT NULL,
        "status" TEXT NOT NULL,
        "location" TEXT NOT NULL,
        "region" TEXT NOT NULL,
        "country" TEXT NOT NULL,
        "completion_date" TEXT NOT NULL,
        "capacity" REAL,
        "total_investment" REAL,
        "beneficiaries" INTEGER,
        "latitude" REAL,
        "longitude" REAL,
        "description" TEXT,
        "impact_description" TEXT,
        "environmental_impact" TEXT,
        "technical_specifications" TEXT,
        "sdg_alignment" TEXT,
        "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    for (const project of vodecoHistoricalProjects) {
      console.log(`- Добавляю проект: ${project.name} (${project.completion_date})`);
      await db.execute(sql`
        INSERT INTO completed_projects (
          name, type, status, location, region, country, completion_date,
          capacity, total_investment, beneficiaries, latitude, longitude,
          description, impact_description, environmental_impact, 
          technical_specifications, sdg_alignment
        ) VALUES (
          ${project.name}, ${project.type}, ${project.status}, ${project.location},
          ${project.region}, ${project.country}, ${project.completion_date},
          ${project.capacity}, ${project.total_investment}, ${project.beneficiaries},
          ${project.latitude}, ${project.longitude}, ${project.description},
          ${project.impact_description}, ${project.environmental_impact},
          ${project.technical_specifications}, ${project.sdg_alignment}
        )
      `);
    }
    
    console.log('✅ Успешно добавлено', vodecoHistoricalProjects.length, 'исторических проектов VODeco');
    console.log('📊 Проекты охватывают период 2003-2021 гг.');
    console.log('🌍 География: Узбекистан, Украина, Казахстан, Беларусь, Россия, Туркменистан, Польша');
    console.log('💧 Общие инвестиции: $', vodecoHistoricalProjects.reduce((sum, p) => sum + (p.total_investment || 0), 0).toLocaleString());
    console.log('👥 Общее количество бенефициаров:', vodecoHistoricalProjects.reduce((sum, p) => sum + (p.beneficiaries || 0), 0).toLocaleString());
    
  } catch (error) {
    console.error('❌ Ошибка при добавлении исторических проектов VODeco:', error);
  }
}

// Запускаем если файл вызван напрямую
if (import.meta.url === `file://${process.argv[1]}`) {
  seedVODecoHistoricalProjects();
}

export { seedVODecoHistoricalProjects };