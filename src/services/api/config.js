const DEVELOPMENT = true; // set false for production
const baseURLProduction = 'https://hygenie.netlify.app';
const baseURLDevelopment = 'http://localhost:3000';
export const baseURL = DEVELOPMENT ? baseURLDevelopment : baseURLProduction;
