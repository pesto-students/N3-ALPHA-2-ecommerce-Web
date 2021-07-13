const baseURLProduction = 'https://hygenie.netlify.app';
const baseURLDevelopment = 'http://localhost:3000';
export const baseURL =
    process.env.NODE_ENV === 'development'
        ? baseURLDevelopment
        : baseURLProduction;
