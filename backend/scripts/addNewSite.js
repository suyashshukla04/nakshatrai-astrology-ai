// scripts/addNewSite.js
const siteConfig = require("../config/siteConfig").js');
const scheduler = require('../scheduler');

// Add new automotive site
const newSite = siteConfig.generateNewSiteConfig(
    'automotive technology',
    'autotech-insights.com', 
    'AutoAI-1'
);

// Customize the dynamic seeds for automotive
newSite.dynamicSeeds = {
    brands: ['Tesla', 'BMW', 'Mercedes', 'Toyota', 'Ford', 'Audi', 'Volkswagen'],
    features: ['autonomous driving', 'electric powertrain', 'infotainment', 'safety systems', 'connectivity'],
    priceRanges: ['economy', 'luxury', 'premium', 'supercar'],
    userTypes: ['families', 'enthusiasts', 'commuters', 'professionals'],
    techFocus: ['EV technology', 'autonomous systems', 'connected cars', 'sustainable materials'],
    industryFocus: ['sustainability', 'safety', 'performance', 'connectivity'],
    geographicFocus: ['India', 'Europe', 'US', 'China', 'global']
};

// Add to system
scheduler.addNewSite(newSite);
console.log('New automotive site added and scheduled!');
