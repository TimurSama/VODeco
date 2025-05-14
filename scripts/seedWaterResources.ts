import { db } from "../server/db";
import { waterResources } from "../shared/schema";

// Данные водных ресурсов из документа
const waterResourcesData = [
  {
    name: "Pumping Station No. 2",
    region: "Jizzakh",
    country: "Uzbekistan",
    status: "Needs Attention",
    qualityIndex: 65,
    flowRate: 12.5,
    latitude: 40.115, // Координаты в регионе Jizzakh
    longitude: 67.842,
    description: "Managed by the Ministry of Water Resources and is scheduled for modernization under the Water Resources Development Concept of the Republic of Uzbekistan for 2020–2030. The modernization aims to improve water supply efficiency and advance digital transformation in alignment with the United Nations Global Compact and the UN-Water Initiative.",
    imageUrl: null,
    totalFunding: 7760600,
    availableForDAO: 2328180,
    fundingProgress: 0,
    irr: 17,
    participantsCount: 0,
    projectType: "Pumping Station",
    investmentStatus: "open"
  },
  {
    name: "Korovulbozor Pumping Station",
    region: "Bukhara",
    country: "Uzbekistan",
    status: "Needs Attention",
    qualityIndex: 58,
    flowRate: 10.2,
    latitude: 39.495, // Координаты в регионе Bukhara
    longitude: 64.776,
    description: "Managed by the Ministry of Water Resources and is scheduled for modernization under the Water Resources Development Concept of the Republic of Uzbekistan for 2020–2030. The modernization aims to improve water supply efficiency and advance digital transformation in alignment with the United Nations Global Compact and the UN-Water Initiative.",
    imageUrl: null,
    totalFunding: 6189700,
    availableForDAO: 1856910,
    fundingProgress: 0,
    irr: 15,
    participantsCount: 0,
    projectType: "Pumping Station",
    investmentStatus: "open"
  },
  {
    name: "Kuyumazar Auxiliary Pumping Station",
    region: "Bukhara",
    country: "Uzbekistan",
    status: "Critical",
    qualityIndex: 45,
    flowRate: 8.7,
    latitude: 39.627, // Координаты в регионе Bukhara
    longitude: 64.338,
    description: "Managed by the Ministry of Water Resources and is scheduled for modernization under the Water Resources Development Concept of the Republic of Uzbekistan for 2020–2030. The modernization aims to improve water supply efficiency and advance digital transformation in alignment with the United Nations Global Compact and the UN-Water Initiative.",
    imageUrl: null,
    totalFunding: 11965400,
    availableForDAO: 3589620,
    fundingProgress: 0,
    irr: 22,
    participantsCount: 0,
    projectType: "Auxiliary Pumping Station",
    investmentStatus: "open"
  },
  {
    name: "Kuyumazar Pumping Station",
    region: "Bukhara",
    country: "Uzbekistan",
    status: "Needs Attention",
    qualityIndex: 61,
    flowRate: 11.4,
    latitude: 39.775, // Координаты в регионе Bukhara
    longitude: 64.421,
    description: "Managed by the Ministry of Water Resources and is scheduled for modernization under the Water Resources Development Concept of the Republic of Uzbekistan for 2020–2030. The modernization aims to improve water supply efficiency and advance digital transformation in alignment with the United Nations Global Compact and the UN-Water Initiative.",
    imageUrl: null,
    totalFunding: 7760600,
    availableForDAO: 2328180,
    fundingProgress: 0,
    irr: 17,
    participantsCount: 0,
    projectType: "Pumping Station",
    investmentStatus: "open"
  },
  {
    name: "Amu-Bukhara-1 Pumping Station",
    region: "Bukhara",
    country: "Uzbekistan",
    status: "Critical",
    qualityIndex: 42,
    flowRate: 15.3,
    latitude: 39.528, // Координаты в регионе Bukhara
    longitude: 64.248,
    description: "Managed by the Ministry of Water Resources and is scheduled for modernization under the Water Resources Development Concept of the Republic of Uzbekistan for 2020–2030. The modernization aims to improve water supply efficiency and advance digital transformation in alignment with the United Nations Global Compact and the UN-Water Initiative.",
    imageUrl: null,
    totalFunding: 9490100,
    availableForDAO: 2837030,
    fundingProgress: 0,
    irr: 20,
    participantsCount: 0,
    projectType: "Pumping Station",
    investmentStatus: "open"
  },
  // Добавим еще несколько ресурсов в разных частях мира для демонстрации глобального охвата
  {
    name: "Lake Victoria Treatment Plant",
    region: "Kampala",
    country: "Uganda",
    status: "Stable",
    qualityIndex: 78,
    flowRate: 25.6,
    latitude: 0.363, // Координаты в Уганде
    longitude: 32.610,
    description: "Major water treatment facility serving the greater Kampala area. The plant provides clean drinking water to over 2 million residents daily and is undergoing expansion to meet growing demand.",
    imageUrl: null,
    totalFunding: 4500000,
    availableForDAO: 1800000,
    fundingProgress: 600000,
    irr: 12,
    participantsCount: 47,
    projectType: "Treatment Plant",
    investmentStatus: "open"
  },
  {
    name: "Mekong Delta Irrigation Network",
    region: "Can Tho",
    country: "Vietnam",
    status: "Needs Attention",
    qualityIndex: 62,
    flowRate: 42.8,
    latitude: 10.034, // Координаты в дельте Меконга
    longitude: 105.788,
    description: "Critical irrigation infrastructure in the Mekong Delta facing challenges from saltwater intrusion and climate change impacts. Modernization will benefit thousands of farming households.",
    imageUrl: null,
    totalFunding: 13250000,
    availableForDAO: 3975000,
    fundingProgress: 850000,
    irr: 18,
    participantsCount: 72,
    projectType: "Irrigation Network",
    investmentStatus: "open"
  },
  {
    name: "Yangtze River Monitoring Station",
    region: "Hubei",
    country: "China",
    status: "Stable",
    qualityIndex: 71,
    flowRate: 86.3,
    latitude: 30.593, // Координаты на Янцзы
    longitude: 114.305,
    description: "Advanced monitoring station on the Yangtze River measuring water quality, flow rates, and ecological parameters. Part of China's comprehensive river management system.",
    imageUrl: null,
    totalFunding: 8750000,
    availableForDAO: 2625000,
    fundingProgress: 1950000,
    irr: 14,
    participantsCount: 132,
    projectType: "Monitoring Station",
    investmentStatus: "open"
  },
  {
    name: "Amazon Basin Research Center",
    region: "Manaus",
    country: "Brazil",
    status: "Critical",
    qualityIndex: 52,
    flowRate: 103.5,
    latitude: -3.120, // Координаты в бассейне Амазонки
    longitude: -60.020,
    description: "Research and conservation center focused on protecting the Amazon's vital freshwater ecosystems. Collects data on biodiversity, water quality, and deforestation impacts.",
    imageUrl: null,
    totalFunding: 6325000,
    availableForDAO: 2530000,
    fundingProgress: 175000,
    irr: 11,
    participantsCount: 23,
    projectType: "Research Center",
    investmentStatus: "open"
  },
  {
    name: "Nile Basin Initiative Project",
    region: "Aswan",
    country: "Egypt",
    status: "Critical",
    qualityIndex: 48,
    flowRate: 74.2,
    latitude: 24.088, // Координаты на Ниле
    longitude: 32.899,
    description: "Collaborative transboundary water management project addressing challenges in the Nile Basin. Aims to improve water security, reduce conflicts, and promote sustainable development.",
    imageUrl: null,
    totalFunding: 15800000,
    availableForDAO: 4740000,
    fundingProgress: 1250000,
    irr: 19,
    participantsCount: 86,
    projectType: "Management Initiative",
    investmentStatus: "open"
  }
];

async function seedWaterResources() {
  console.log("Seeding water resources...");
  
  try {
    // Проверим, есть ли уже данные в базе
    const existingResources = await db.select().from(waterResources);
    
    if (existingResources.length > 0) {
      console.log(`Found ${existingResources.length} existing resources. Skipping seed.`);
      return;
    }
    
    // Вставляем данные
    const result = await db.insert(waterResources).values(waterResourcesData);
    
    console.log(`Successfully added ${waterResourcesData.length} water resources to the database.`);
  } catch (error) {
    console.error("Error seeding water resources:", error);
  }
}

// Запускаем функцию
seedWaterResources()
  .then(() => {
    console.log("Seeding completed");
    process.exit(0);
  })
  .catch(err => {
    console.error("Seeding failed:", err);
    process.exit(1);
  });