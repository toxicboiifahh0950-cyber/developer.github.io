import tejasImage from "@/assets/tejas.jpg";
import vikrantImage from "@/assets/vikrant.jpg";
import arjunImage from "@/assets/arjun.jpg";
import kalvariImage from "@/assets/kalvari.jpg";
import airDefenseImage from "@/assets/air-defense.jpg";
import brahmosImage from "@/assets/brahmos.jpg";
import rustomImage from "@/assets/rustom-uav.jpg";

export type Branch = "Army" | "Air Force" | "Navy";
export type Equipment = {
  id: string;
  name: string;
  shortName: string;
  branch: Branch;
  category: string;
  group: "Aircraft" | "Land systems" | "Naval" | "Guided missiles" | "Uncrewed";
  image: string;
  designation: string;
  speed: string;
  range: string;
  payload: string;
  manufacturer: string;
  serviceEntry: string;
  status: string;
  description: string;
  history: string;
  specs: { label: string; value: string }[];
};

export const equipment: Equipment[] = [
  {
    id: "tejas-mk1a",
    name: "Tejas Mk1A",
    shortName: "Tejas",
    branch: "Air Force",
    category: "Fighter aircraft",
    group: "Aircraft",
    image: tejasImage,
    designation: "LCA · MULTIROLE FIGHTER",
    speed: "Mach 1.8",
    range: "3,000 km",
    payload: "3,500 kg",
    manufacturer: "HAL",
    serviceEntry: "2024 · Mk1A deliveries",
    status: "In production",
    description: "A lightweight, single-engine multirole aircraft designed and built in India. The Mk1A adds updated avionics and maintainability improvements to the Tejas platform.",
    history: "The Light Combat Aircraft programme began in the 1980s to develop an indigenous replacement for older fighter aircraft. The Tejas entered squadron service in 2016; the Mk1A is the next production variant.",
    specs: [{ label: "Crew", value: "1" }, { label: "Length", value: "13.0 m" }, { label: "Wingspan", value: "8.2 m" }, { label: "Engine", value: "Single turbofan" }],
  },
  {
    id: "ins-vikrant",
    name: "INS Vikrant",
    shortName: "Vikrant",
    branch: "Navy",
    category: "Aircraft carrier",
    group: "Naval",
    image: vikrantImage,
    designation: "IAC-1 · AIRCRAFT CARRIER",
    speed: "28 knots",
    range: "7,500 nautical miles",
    payload: "30+ aircraft",
    manufacturer: "Cochin Shipyard Limited",
    serviceEntry: "2022",
    status: "In service",
    description: "India’s first indigenously designed and built aircraft carrier. Its flight deck supports fixed-wing aircraft and helicopters in a ski-jump configuration.",
    history: "Named after India’s first aircraft carrier, INS Vikrant was designed and built at Cochin Shipyard. It was commissioned into the Indian Navy in September 2022.",
    specs: [{ label: "Displacement", value: "Approx. 45,000 tonnes" }, { label: "Length", value: "262 m" }, { label: "Propulsion", value: "Four gas turbines" }, { label: "Flight deck", value: "262 × 62 m" }],
  },
  {
    id: "arjun-mk1a",
    name: "Arjun Mk1A",
    shortName: "Arjun",
    branch: "Army",
    category: "Main battle tank",
    group: "Land systems",
    image: arjunImage,
    designation: "MBT · ARMOURED VEHICLE",
    speed: "70 km/h",
    range: "Approx. 450 km",
    payload: "120 mm main gun",
    manufacturer: "DRDO / Heavy Vehicles Factory",
    serviceEntry: "2004 · Arjun Mk1",
    status: "In service",
    description: "A third-generation main battle tank developed in India, with a 120 mm rifled main gun, composite armour and modern fire-control systems.",
    history: "The Arjun programme was initiated by DRDO in 1972. The first production tanks entered Indian Army service in 2004, followed by the upgraded Mk1A configuration.",
    specs: [{ label: "Crew", value: "4" }, { label: "Combat weight", value: "Approx. 68 tonnes" }, { label: "Engine", value: "1,400 hp diesel" }, { label: "Main armament", value: "120 mm rifled gun" }],
  },
  {
    id: "kalvari-class",
    name: "Kalvari-class Submarine",
    shortName: "Kalvari-class",
    branch: "Navy",
    category: "Attack submarine",
    group: "Naval",
    image: kalvariImage,
    designation: "SCORPÈNE · DIESEL-ELECTRIC",
    speed: "20+ knots submerged",
    range: "6,500 nautical miles",
    payload: "Torpedoes & missiles",
    manufacturer: "Mazagon Dock Shipbuilders / Naval Group",
    serviceEntry: "2017",
    status: "In service",
    description: "A class of diesel-electric attack submarines built in India under technology transfer, equipped for anti-surface and anti-submarine roles.",
    history: "Built by Mazagon Dock Shipbuilders in Mumbai with Naval Group support, the first boat, INS Kalvari, was commissioned in December 2017.",
    specs: [{ label: "Crew", value: "Approx.  계  31".replace(" 계  ", "") }, { label: "Length", value: "67.5 m" }, { label: "Displacement", value: "Approx. 1,775 tonnes submerged" }, { label: "Propulsion", value: "Diesel-electric" }],
  },
  {
    id: "s-400",
    name: "S-400 Triumf",
    shortName: "S-400",
    branch: "Air Force",
    category: "Air defence system",
    group: "Land systems",
    image: airDefenseImage,
    designation: "LONG-RANGE · AIR DEFENCE",
    speed: "—",
    range: "Up to 400 km*",
    payload: "Multi-layer interceptors",
    manufacturer: "Almaz-Antey",
    serviceEntry: "2021 · India deliveries",
    status: "In service",
    description: "A mobile, long-range surface-to-air missile system operated by the Indian Air Force. Published engagement range varies by interceptor type.",
    history: "India signed an agreement for five regimental systems in 2018. Deliveries began in 2021. Publicly reported performance varies by missile and target type.",
    specs: [{ label: "System type", value: "Mobile surface-to-air" }, { label: "Radar", value: "Multi-band radar suite" }, { label: "Interceptors", value: "Multiple missile types" }, { label: "*Range", value: "Maximum published figure" }],
  },
  {
    id: "brahmos",
    name: "BrahMos",
    shortName: "BrahMos",
    branch: "Army",
    category: "Guided missile",
    group: "Guided missiles",
    image: brahmosImage,
    designation: "CRUISE MISSILE · JOINT PROGRAMME",
    speed: "Up to Mach 2.8",
    range: "Up to 450 km*",
    payload: "Conventional",
    manufacturer: "BrahMos Aerospace",
    serviceEntry: "2005 · First induction",
    status: "In service",
    description: "A supersonic cruise missile developed jointly by India and Russia. Land, sea and air-launched variants are publicly documented.",
    history: "The joint venture BrahMos Aerospace was established in 1998. The missile takes its name from the Brahmaputra and Moskva rivers. Range figures depend on variant and publicly reported export configurations.",
    specs: [{ label: "Type", value: "Supersonic cruise missile" }, { label: "Propulsion", value: "Ramjet with booster" }, { label: "Launch platforms", value: "Land, sea & air" }, { label: "*Range", value: "Variant dependent" }],
  },
  {
    id: "rustom-ii",
    name: "TAPAS BH-201",
    shortName: "TAPAS",
    branch: "Air Force",
    category: "Uncrewed aircraft",
    group: "Uncrewed",
    image: rustomImage,
    designation: "UAV · MEDIUM-ALTITUDE",
    speed: "Not publicly specified",
    range: "Long-endurance",
    payload: "Surveillance sensors",
    manufacturer: "DRDO / ADE",
    serviceEntry: "Under development",
    status: "Development & trials",
    description: "An indigenous medium-altitude long-endurance remotely piloted aircraft project developed for intelligence, surveillance and reconnaissance roles.",
    history: "Developed by DRDO’s Aeronautical Development Establishment, TAPAS BH-201 (formerly Rustom-II) has been in flight testing. Public programme updates describe ongoing development and evaluation.",
    specs: [{ label: "Class", value: "MALE remotely piloted aircraft" }, { label: "Role", value: "Intelligence & surveillance" }, { label: "Developer", value: "DRDO / ADE" }, { label: "Programme", value: "Development & evaluation" }],
  },
];

export const categories = ["All", "Army", "Air Force", "Navy", "Guided Missiles", "Drones"] as const;

export function toggleCompareSelection(selected: string[], id: string): string[] {
  if (selected.includes(id)) return selected.filter((item) => item !== id);
  if (selected.length >= 3) return selected;
  return [...selected, id];
}