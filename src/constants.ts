/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AirlineData {
  id: string;
  name: string;
  terminal: 'MMA1' | 'MMA2';
  description?: string;
  routes?: string[];
}

export const AIRLINES: AirlineData[] = [
  {
    id: 'air-peace',
    name: 'Air Peace',
    terminal: 'MMA2',
    description: 'General domestic flights use MMA2. Note: International and some regional flights use the International terminal buildings.',
    routes: ['Abuja', 'Port Harcourt', 'Enugu', 'Owerri', 'Kano', 'Benin', 'Asaba', 'Warri', 'Uyo', 'Calabar', 'Akure', 'Makurdi']
  },
  {
    id: 'ibom-air',
    name: 'Ibom Air',
    terminal: 'MMA2',
    description: 'Premium service airline operating exclusively from MMA2 in Lagos.',
    routes: ['Uyo', 'Abuja', 'Calabar', 'Port Harcourt', 'Enugu']
  },
  {
    id: 'arik-air',
    name: 'Arik Air',
    terminal: 'MMA1',
    description: 'Operates from GAT (MMA1). Uses Zulu Bay for most operations.',
    routes: ['Abuja', 'Port Harcourt', 'Benin', 'Jos', 'Kaduna', 'Warri', 'Owerri']
  },
  {
    id: 'green-africa',
    name: 'Green Africa',
    terminal: 'MMA1',
    description: 'Value airline operating from GAT (MMA1) Alpha Bay.',
    routes: ['Abuja', 'Ibadan', 'Owerri', 'Akure', 'Ilorin', 'Enugu', 'Port Harcourt', 'Benin']
  },
  {
    id: 'united-nigeria',
    name: 'United Nigeria Airlines',
    terminal: 'MMA2',
    description: 'Operates from the private MMA2 terminal.',
    routes: ['Abuja', 'Enugu', 'Owerri', 'Port Harcourt', 'Asaba', 'Yenagoa', 'Uyo']
  },
  {
    id: 'valuejet',
    name: 'ValueJet',
    terminal: 'MMA2',
    description: 'Operates from MMA2.',
    routes: ['Abuja', 'Port Harcourt', 'Benin', 'Asaba', 'Jos']
  },
  {
    id: 'max-air',
    name: 'Max Air',
    terminal: 'MMA2',
    description: 'Operates from MMA2.',
    routes: ['Abuja', 'Kano', 'Maiduguri', 'Sokoto', 'Yola', 'Bauchi', 'Katsina']
  },
  {
    id: 'overland',
    name: 'Overland Airways',
    terminal: 'MMA1',
    description: 'Operates from GAT (MMA1). Known for smaller regional routes.',
    routes: ['Ibadan', 'Ilorin', 'Akure', 'Abuja', 'Jalingo', 'Dutse']
  },
  {
    id: 'rano-air',
    name: 'Rano Air',
    terminal: 'MMA2',
    description: 'Newer operator running from MMA2.',
    routes: ['Abuja', 'Kano', 'Kaduna', 'Sokoto', 'Maiduguri']
  },
  {
    id: 'aero-contractors',
    name: 'Aero Contractors',
    terminal: 'MMA1',
    description: 'Operates from the General Aviation Terminal (MMA1).',
    routes: ['Abuja', 'Port Harcourt', 'Benin', 'Warri', 'Kano', 'Asaba']
  },
  {
    id: 'danao-air',
    name: 'Dana Air',
    terminal: 'MMA2',
    description: 'Operates from MMA2.',
    routes: ['Abuja', 'Port Harcourt', 'Enugu', 'Owerri']
  }
];

export const STATES = [
  'Abuja (FCT)', 'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River',
  'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi',
  'Kogi', 'Kwara', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
  'Yobe', 'Zamfara'
];

export const TERMINALS = {
  MMA1: {
    name: 'MMA1 (GAT)',
    fullName: 'General Aviation Terminal',
    operator: 'FAAN',
    description: 'The General Aviation Terminal is also known as GAT. It consists of the Alpha Bay and Zulu Bay.',
    landmark: 'Located along Agege Motor Road, near Ikeja.'
  },
  MMA2: {
    name: 'MMA2',
    fullName: 'Murtala Muhammed Airport Terminal 2',
    operator: 'Bi-Courtney Aviation Services',
    description: 'MMA2 is the ultra-modern domestic terminal in Lagos.',
    landmark: 'Located close to the International Airport, Ikeja.'
  }
};
