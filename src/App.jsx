import ReactDOM from 'react-dom';
import React from 'react';
// import Predict from './components/predict.jsx';
import DropzoneComponent from 'react-dropzone-component/lib/react-dropzone'
import { apiPrefix } from '../etc/config.json';

import actions from './actions/actions';
import store from './stores/store';

import './App.css';


// React.createElement(Predict, {
//       wordsSettings: {
//         slackSearch: false
//       }
//     })


function additional_show(){
	var buttons = document.getElementsByClassName("Additional");
		for(var i = 0; i < buttons.length; ++i)
		    buttons[i].setAttribute("class", "Additional_active");
};

function  additional_close(){
	var buttons = document.getElementsByClassName("Additional_active");
		for(var i = 0; i < buttons.length; ++i)
		    buttons[i].setAttribute("class", "Additional");
};


var words = ["ваз (lada)", "audi", "bentley", "bmw", "chery", "chevrolet", "citroen", "daewoo", "ferrari", "ford", "honda", "hyundai", "infiniti", "kia", "lamborghini", "land rover", "lexus", "mazda", "mercedes-benz", "mini", "mitsubishi", "nissan", "opel", "peugeot", "renault", "rolls-royce", "skoda", "ssangyong", "subaru", "suzuki", "tesla", "toyota", "volkswagen", "volvo", "газ", "уаз", "ac", "acura", "adler", "alfa romeo", "alpina", "alpine", "am general", "amc", "ariel", "aro", "asia", "aston martin", "austin", "autobianchi", "baltijas dzips", "beijing", "bertone", "bitter", "borgward", "brabus", "brilliance", "bristol", "bufori", "bugatti", "buick", "byd", "byvin", "cadillac", "callaway", "carbodies", "caterham", "changan", "changfeng", "chrysler", "cizeta", "coggiola", "dacia", "dadi", "daf", "daihatsu", "daimler", "datsun", "de tomaso", "delorean", "derways", "desoto", "dodge", "dongfeng", "doninvest", "donkervoort", "ds", "e-car", "eagle", "eagle cars", "ecomotors", "faw", "fiat", "fisker", "foton", "fso", "fuqi", "geely", "geo", "gmc", "gonow", "gordon", "great wall", "hafei", "haima", "haval", "hawtai", "hindustan", "holden", "huanghai", "hudson", "hummer", "innocenti", "invicta", "iran khodro", "isdera", "isuzu", "iveco", "jac", "jaguar", "jeep", "jensen", "jmc", "koenigsegg", "ktm", "lancia", "landwind", "liebao motor", "lifan", "lincoln", "lotus", "lti", "luxgen", "mahindra", "marcos", "marlin", "marussia", "maruti", "maserati", "maybach", "mclaren", "mega", "mercury", "metrocab", "mg", "microcar", "minelli", "mitsuoka", "morgan", "morris", "noble", "oldsmobile", "osca", "packard", "pagani", "panoz", "perodua", "pgo", "piaggio", "plymouth", "pontiac", "porsche", "premier", "proton", "puch", "puma", "qoros", "qvale", "ravon", "reliant", "renaissance", "renault samsung", "rezvani", "rimac", "ronart", "rover", "saab", "saleen", "santana", "saturn", "scion", "seat", "shuanghuan", "smart", "soueast", "spectre", "spyker", "talbot", "tata", "tatra", "tazzari", "tianma", "tianye", "tofas", "trabant", "tramontana", "triumph", "tvr", "ultima", "vauxhall", "vector", "venturi", "vortex", "w motors", "wartburg", "westfield", "wiesmann", "willys", "xin kai", "zastava", "zenos", "zenvo", "zotye", "zx", "автокам", "астро", "бронто", "заз", "зил", "зис", "иж", "камаз", "канонир", "комбат", "луаз", "москвич", "сеаз", "смз", "тагаз", "эксклюзив", "ё-мобиль"];
var models = [["2101", "2104", "2105", "2106", "2107", "2108", "2109", "21099", "2110", "2111", "2112", "2113", "2114", "2115", "2121 (4x4)", "2131 (4x4)", "Granta", "Kalina", "Largus", "Priora", "1111 Ока", "2101", "2102", "2103", "2104", "2105", "2106", "2107", "2108", "2109", "21099", "2110", "2111", "2112", "2113", "2114", "2115", "2120 Надежда", "2121 (4x4)", "2123", "2129", "2131 (4x4)", "2328", "2329", "EL Lada", "Granta", "Kalina", "Largus", "Priora", "Revolution", "Vesta", "XRAY"], ["100", "80", "90", "A1", "A3", "A4", "A4 allroad", "A5", "A6", "A6 allroad", "A7", "A8", "Q3", "Q5", "Q7", "R8", "S5", "S6", "S8", "TT", "100", "200", "50", "60", "80", "90", "920", "A1", "A2", "A3", "A4", "A4 allroad", "A5", "A6", "A6 allroad", "A7", "A8", "Cabriolet", "Coupe", "F103", "Front", "NSU RO 80", "Q2", "Q3", "Q5", "Q7", "quattro", "R8", "RS Q3", "RS2", "RS3", "RS4", "RS5", "RS6", "RS7", "S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "SQ5", "SQ7", "TT", "TT RS", "TTS", "Typ R", "V8"], ["3.5 Litre", "Arnage", "Azure", "Bentayga", "Brooklands", "Continental", "Continental Flying Spur", "Continental GT", "Eight", "Flying Spur", "Mark VI", "Mulsanne", "R Type", "S", "T-Series", "Turbo R"], ["1er", "3er", "4er", "5er", "6er", "7er", "8er", "M3", "M4", "M5", "M6", "X1", "X3", "X4", "X5", "X5 M", "X6", "X6 M", "Z3", "Z4", "02 (E10)", "1er", "1M", "2000 C/CS", "2er", "2er Active Tourer", "2er Grand Tourer", "3/15", "315", "3200", "321", "326", "327", "340", "3er", "4er", "501", "502", "503", "507", "5er", "600", "6er", "700", "7er", "8er", "E3", "E9", "i3", "i8", "M2", "M3", "M4", "M5", "M6", "New Class", "X1", "X3", "X4", "X5", "X5 M", "X6", "X6 M", "Z1", "Z3", "Z3 M", "Z4", "Z4 M", "Z8"], ["A21", "Amulet (A15)", "Arrizo 7", "Beat", "Bonus (A13)", "Bonus 3 (E3/A19)", "CrossEastar (B14)", "E5", "Elara", "Fora (A21)", "IndiS (S18D)", "Kimo (A1)", "M11 (A3)", "Oriental Son (B11)", "QQ6 (S21)", "Sweet (QQ)", "Tiggo (T11)", "Tiggo 5", "Very (A13)"], ["Aveo", "Blazer", "Camaro", "Captiva", "Cobalt", "Cruze", "Epica", "Evanda", "Express", "Lacetti", "Lanos", "Niva", "Orlando", "Rezzo", "Spark", "Suburban", "Tahoe", "Tracker", "TrailBlazer", "Viva", "Alero", "Apache", "Astra", "Astro", "Avalanche", "Aveo", "Bel Air", "Beretta", "Blazer", "Blazer K5", "Bolt", "C-10", "C/K", "Camaro", "Caprice", "Captiva", "Cavalier", "Celebrity", "Celta", "Chevelle", "Chevette", "Citation", "Classic", "Cobalt", "Colorado", "Corsa", "Corsica", "Corvette", "Cruze", "Cruze (HR)", "Deluxe", "El Camino", "Epica", "Equinox", "Evanda", "Express", "Fleetmaster", "Geo Storm", "HHR", "Impala", "Ipanema", "K-30", "Kalos", "Lacetti", "Lanos", "Lumina", "Lumina APV", "LUV D-MAX", "Malibu", "Master", "Meriva", "Metro", "Monte Carlo", "Monza", "MW", "Niva", "Nubira", "Omega", "Orlando", "Prisma", "Prizm", "Rezzo", "S-10 Pickup", "Sail", "Silverado", "Sonic", "Spark", "Special DeLuxe", "SS", "SSR", "Starcraft", "Suburban", "Tahoe", "Tavera", "Tracker", "TrailBlazer", "Trans Sport", "Traverse", "Trax", "Uplander", "Van", "Vectra", "Venture", "Viva", "Volt", "Zafira"], ["Berlingo", "C-Crosser", "C-Elysee", "C1", "C2", "C3", "C3 Picasso", "C4", "C4 Aircross", "C4 Picasso", "C5", "C8", "DS3", "DS4", "DS5", "Jumpy", "Saxo", "Xantia", "Xsara", "Xsara Picasso", "2 CV", "AMI", "Ax", "Berlingo", "BX", "C-Crosser", "C-Elysee", "C-ZERO", "C1", "C2", "C3", "C3 Picasso", "C3 Pluriel", "C4", "C4 Aircross", "C4 Cactus", "C4 Picasso", "C5", "C6", "C8", "CX", "DS", "DS3", "DS4", "DS5", "Dyane", "Evasion", "GS", "Jumpy", "LN", "Méhari", "Nemo", "Saxo", "SM", "Traction Avant", "Visa", "Xantia", "XM", "Xsara", "Xsara Picasso", "ZX"], ["Damas", "Espero", "Evanda", "Gentra", "Kalos", "Korando", "Lacetti", "Lanos (Sens)", "Leganza", "Magnus", "Matiz", "Nexia", "Nubira", "Prince", "Racer", "Rezzo", "Tacuma", "Tico", "Winstorm", "Arcadia", "Chairman", "Damas", "Espero", "Evanda", "G2X", "Gentra", "Kalos", "Korando", "Lacetti", "Lanos (Sens)", "LE Mans", "Leganza", "Magnus", "Matiz", "Musso", "Nexia", "Nubira", "Polonez", "Prince", "Racer", "Rezzo", "Sens", "Tacuma", "Tico", "Tosca", "Winstorm"], ["328", "360", "458", "488", "575M", "599", "612", "California", "F12berlinetta", "F430", "FF", "Testarossa", "208/308", "328", "348", "360", "400", "412", "456", "458", "488", "512 BB", "512 M", "512 TR", "550", "575M", "599", "612", "California", "Enzo", "F12berlinetta", "F355", "F40", "F430", "F50", "FF", "FXX K", "GTC4Lusso", "LaFerrari", "Mondial", "Testarossa"], ["C-MAX", "EcoSport", "Escape", "Escort", "Explorer", "F-150", "Fiesta", "Focus", "Focus (North America)", "Fusion", "Galaxy", "Kuga", "Maverick", "Mondeo", "Mustang", "Ranger", "S-MAX", "Scorpio", "Sierra", "Tourneo Connect", "Aerostar", "Aspire", "B-MAX", "Bronco", "Bronco-II", "C-MAX", "Capri", "Consul", "Contour", "Cougar", "Crown Victoria", "Custom", "Econoline", "EcoSport", "Edge", "Escape", "Escort", "Escort (North America)", "Everest", "Excursion", "Expedition", "Explorer", "Explorer Sport Trac", "F-150", "Fairlane", "Fairmont", "Festiva", "Fiesta", "Fiesta ST", "Five Hundred", "Flex", "Focus", "Focus (North America)", "Focus RS", "Focus ST", "Freestar", "Freestyle", "Fusion", "Fusion (North America)", "Galaxie", "Galaxy", "GPA", "Granada", "Granada (North America)", "GT", "GT40", "Ixion", "KA", "Kuga", "Laser", "LTD Crown Victoria", "Maverick", "Model A", "Model T", "Mondeo", "Mondeo ST", "Mustang", "Orion", "Probe", "Puma", "Ranchero", "Ranger", "Ranger (North America)", "S-MAX", "Scorpio", "Sierra", "Spectron", "Taunus", "Taurus", "Taurus X", "Telstar", "Tempo", "Thunderbird", "Torino", "Tourneo Connect", "Tourneo Courier", "Tourneo Custom", "Windstar", "Zephyr"], ["Accord", "CR-V", "Civic", "Civic Ferio", "Civic Type R", "Crosstour", "Element", "Fit", "HR-V", "Insight", "Integra", "Jazz", "Legend", "Mobilio", "Odyssey", "Partner", "Pilot", "Prelude", "Stepwgn", "Stream", "Accord", "Acty", "Airwave", "Ascot", "Ascot Innova", "Avancier", "Beat", "Capa", "City", "Civic", "Civic Ferio", "Civic Type R", "Concerto", "CR-V", "CR-X", "CR-Z", "Crossroad", "Crosstour", "Domani", "Edix", "Element", "Elysion", "FCX Clarity", "Fit", "Fit Aria", "FR-V", "Freed", "Horizon", "HR-V", "Insight", "Inspire", "Integra", "Integra SJ", "Jazz", "Legend", "Life", "Logo", "MDX", "Mobilio", "NSX", "Odyssey", "Odyssey (North America)", "Orthia", "Partner", "Passport", "Pilot", "Prelude", "Quint", "Rafaga", "Ridgeline", "S-MX", "S2000", "S660", "Saber", "Shuttle", "Stepwgn", "Stream", "Street", "That'S", "Today", "Torneo", "Vamos", "Vezel", "Vigor", "Z", "Zest"], ["Accent", "Coupe", "Elantra", "Equus", "Genesis", "Getz", "Grandeur", "Matrix", "Santa Fe", "Solaris", "Sonata", "Starex (H-1)", "Terracan", "Tiburon", "Tucson", "i20", "i30", "i40", "ix35", "ix55", "Accent", "Aslan", "Atos", "Avante", "Azera", "Centennial", "Coupe", "Creta", "Dynasty", "Elantra", "Equus", "Excel", "Galloper", "Genesis", "Genesis Coupe", "Getz", "Grace", "Grandeur", "i10", "i20", "i30", "i40", "ix20", "ix35", "ix55", "JM", "Lantra", "Lavita", "Marcia", "Matrix", "Maxcruz", "Pony", "Santa Fe", "Santamo", "Scoupe", "Solaris", "Sonata", "Starex (H-1)", "Stellar", "TB", "Terracan", "Tiburon", "Trajet", "Tucson", "Tuscani", "Veloster", "Veracruz", "Verna", "XG"], ["EX", "FX", "G", "I", "J", "JX", "M", "Q", "Q30", "Q40", "Q50", "Q60", "Q70", "QX", "QX30", "QX4", "QX50", "QX60", "QX70", "QX80"], ["Avella", "Carens", "Carnival", "Cee'd", "Cerato", "Clarus", "Magentis", "Mohave (Borrego)", "Opirus", "Optima", "Picanto", "Quoris", "Rio", "Sephia", "Shuma", "Sorento", "Soul", "Spectra", "Sportage", "Venga", "Avella", "Cadenza", "Capital", "Carens", "Carnival", "Cee'd", "Cee'd GT", "Cerato", "Clarus", "Concord", "Elan", "Enterprise", "Joice", "K", "Magentis", "Mohave (Borrego)", "Niro", "Opirus", "Optima", "Picanto", "Potentia", "Pride", "Quoris", "Ray", "Retona", "Rio", "Sedona", "Sephia", "Shuma", "Sorento", "Soul", "Spectra", "Sportage", "Venga", "Visto", "X-Trek"], ["Aventador", "Centanario", "Countach", "Diablo", "Espada", "Gallardo", "Huracán", "Jalpa", "Jarama", "LM001", "LM002", "Murcielago", "Reventon", "Sesto Elemento", "Urraco", "Veneno"], ["Defender", "Discovery", "Discovery Sport", "Freelander", "Range Rover", "Range Rover Evoque", "Range Rover Sport", "Series I", "Series II", "Series III"], ["CT", "ES", "GS", "GS F", "GX", "HS", "IS", "IS F", "LC", "LFA", "LS", "LX", "NX", "RC", "RC F", "RX", "SC"], ["2", "3", "3 MPS", "323", "5", "6", "626", "Axela", "BT-50", "Bongo", "CX-5", "CX-7", "CX-9", "Capella", "Demio", "Familia", "MPV", "Premacy", "RX-8", "Tribute", "1000", "121", "1300", "2", "3", "3 MPS", "323", "5", "6", "6 MPS", "616", "626", "818", "929", "Atenza", "Autozam Clef", "Axela", "AZ-1", "AZ-Offroad", "AZ-Wagon", "B-series", "Biante", "Bongo", "Bongo Brawny Van", "Bongo Friendee", "BT-50", "Capella", "Carol", "Cosmo", "Cronos", "CX-3", "CX-5", "CX-7", "CX-9", "Demio", "Efini MPV", "Efini MS-6", "Efini MS-8", "Efini MS-9", "Eunos 100", "Eunos 300", "Eunos 500", "Eunos 800", "Eunos cargo wagon", "Eunos Cosmo", "Familia", "Lantis", "Laputa", "Levante", "Luce", "Millenia", "MPV", "MX-3", "MX-5", "MX-6", "Navajo", "Persona", "Premacy", "Proceed Levante", "Proceed Marvie", "Protege", "Revue", "Roadster", "RX-7", "RX-8", "Savanna", "Scrum", "Sentia", "Spiano", "Tribute", "Verisa", "Xedos 6", "Xedos 9", "МХ-3"], ["190 (W201)", "A-klasse", "B-klasse", "C-klasse", "CL-klasse", "CLA-klasse", "CLK-klasse", "CLS-klasse", "E-klasse", "G-klasse", "G-klasse AMG", "GL-klasse", "GLA-klasse", "GLK-klasse", "M-klasse", "S-klasse", "S-klasse AMG", "Viano", "Vito", "W124", "190 (W201)", "190 SL", "A-klasse", "A-klasse AMG", "AMG GLC", "AMG GLE", "AMG GLE Coupe", "AMG GT", "B-klasse", "C-klasse", "C-klasse AMG", "Citan", "CL-klasse", "CL-klasse AMG", "CLA-klasse", "CLA-klasse AMG", "CLC-klasse", "CLK-klasse", "CLK-klasse AMG", "CLS-klasse", "CLS-klasse AMG", "E-klasse", "E-klasse AMG", "G-klasse", "G-klasse AMG", "G-klasse AMG 6x6", "GL-klasse", "GL-klasse AMG", "GLA-klasse", "GLA-klasse AMG", "GLC", "GLC Coupe", "GLE", "GLE Coupe", "GLK-klasse", "GLS-klasse", "GLS-klasse AMG", "M-klasse", "M-klasse AMG", "Maybach S-klasse", "R-klasse", "R-klasse AMG", "S-klasse", "S-klasse AMG", "SL-klasse", "SL-klasse AMG", "SLC-klasse", "SLC-klasse AMG", "SLK-klasse", "SLK-klasse AMG", "SLR McLaren", "SLS AMG", "V-klasse", "Vaneo", "Viano", "Vito", "W100", "W108", "W110", "W111", "W114", "W115", "W120", "W121", "W123", "W124", "W128", "W136", "W186", "W189"], ["Cabrio", "Clubman", "Countryman", "Coupe", "Hatch", "Paceman", "Roadster"], ["ASX", "Airtrek", "Carisma", "Colt", "Delica", "Eclipse", "Galant", "Grandis", "L200", "Lancer", "Montero", "Montero Sport", "Outlander", "Pajero", "Pajero Mini", "Pajero Pinin", "Pajero Sport", "RVR", "Space Star", "Space Wagon", "3000 GT", "Airtrek", "Aspire", "ASX", "Attrage", "Carisma", "Celeste", "Challenger", "Chariot", "Colt", "Cordia", "Debonair", "Delica", "Diamante", "Dignity", "Dingo", "Dion", "Eclipse", "eK", "Emeraude", "Endeavor", "Eterna", "FTO", "Galant", "Grandis", "GTO", "i", "i-MiEV", "Jeep J", "L200", "Lancer", "Lancer Cargo", "Lancer Evolution", "Lancer Ralliart", "Legnum", "Libero", "Magna", "Minica", "Minicab", "Mirage", "Montero", "Montero Sport", "Outlander", "Pajero", "Pajero iO", "Pajero Junior", "Pajero Mini", "Pajero Pinin", "Pajero Sport", "Pistachio", "Proudia", "Raider", "RVR", "Sapporo", "Sigma", "Space Gear", "Space Runner", "Space Star", "Space Wagon", "Starion", "Strada", "Toppo", "Town Box", "Tredia"], ["Almera", "Almera Classic", "Juke", "March", "Maxima", "Micra", "Murano", "Navara (Frontier)", "Note", "Pathfinder", "Patrol", "Primera", "Qashqai", "Sentra", "Serena", "Sunny", "Teana", "Terrano", "Tiida", "X-Trail", "100NX", "180SX", "200SX", "240SX", "280ZX", "300ZX", "350Z", "370Z", "AD", "Ad Max Wagon", "Almera", "Almera Classic", "Almera Tino", "Altima", "Armada", "Avenir", "Bassara", "BE-1", "Bluebird", "Bluebird Sylphy", "Caravan", "Cedric", "Cefiro", "Cherry", "Cima", "Clipper", "Crew", "Cube", "Datsun", "Dualis", "Elgrand", "Expert", "Fairlady Z", "Figaro", "Fuga", "Gloria", "GT-R", "Homy Elgrand", "Juke", "Juke Nismo", "Lafesta", "Langley", "Largo", "Laurel", "Leaf", "Leopard", "Liberty", "Lucino", "March", "Maxima", "Micra", "Mistral", "Moco", "Murano", "Navara (Frontier)", "Note", "NP 300", "NV200", "NV350 Caravan", "NX Coupe", "Otti (Dayz)", "Pao", "Pathfinder", "Patrol", "Pino", "Pixo", "Prairie", "Presage", "Presea", "President", "Primastar", "Primera", "Pulsar", "Qashqai", "Qashqai+2", "Quest", "R'nessa", "Rasheen", "Rogue", "Roox", "Safari", "Sentra", "Serena", "Silvia", "Skyline", "Skyline Crossover", "Stagea", "Stanza", "Sunny", "Teana", "Terrano", "Terrano Regulus", "Tiida", "Tino", "Titan", "Urvan", "Vanette", "Versa", "Vw santana", "Wingroad", "X-Terra", "X-Trail"], ["Agila", "Antara", "Ascona", "Astra", "Astra OPC", "Combo", "Corsa", "Frontera", "Insignia", "Kadett", "Meriva", "Mokka", "Monterey", "Omega", "Rekord", "Tigra", "Vectra", "Vita", "Vivaro", "Zafira", "Adam", "Admiral", "Agila", "Ampera", "Antara", "Ascona", "Astra", "Astra OPC", "Calibra", "Campo", "Cascada", "Combo", "Commodore", "Corsa", "Corsa OPC", "Diplomat", "Frontera", "GT", "Insignia", "Insignia OPC", "Kadett", "Kapitan", "Karl", "Manta", "Meriva", "Meriva OPC", "Mokka", "Monterey", "Monza", "Olympia", "Omega", "P4", "Rekord", "Senator", "Signum", "Sintra", "Speedster", "Super Six", "Tigra", "Vectra", "Vectra OPC", "Vita", "Vivaro", "Zafira", "Zafira OPC"], ["107", "2008", "206", "207", "208", "3008", "301", "307", "308", "4007", "4008", "405", "406", "407", "408", "508", "605", "607", "Expert", "Partner", "1007", "104", "106", "107", "108", "2008", "201", "202", "203", "204", "205", "205 GTi", "206", "207", "208", "208 GTi", "3008", "301", "304", "305", "306", "307", "308", "308 GTi", "309", "4007", "4008", "402", "403", "404", "405", "406", "407", "408", "5008", "504", "505", "508", "604", "605", "607", "806", "807", "Bipper", "Expert", "iOn", "Partner", "RCZ", "Traveller"], ["19", "Clio", "Clio RS", "Duster", "Espace", "Fluence", "Kangoo", "Koleos", "Laguna", "Latitude", "Logan", "Megane", "Megane RS", "Modus", "Safrane", "Sandero", "Scenic", "Symbol", "Trafic", "Twingo", "10", "11", "12", "14", "15", "16", "17", "18", "19", "20", "21", "25", "30", "4", "4CV", "5", "6", "8", "9", "Avantime", "Captur", "Caravelle", "Clio", "Clio RS", "Clio V6", "Dauphine", "Dokker", "Duster", "Espace", "Estafette", "Floride", "Fluence", "Fregate", "Fuego", "Kadjar", "Kangoo", "Koleos", "KWID", "Laguna", "Latitude", "Lodgy", "Logan", "Megane", "Megane RS", "Modus", "Rodeo", "Safrane", "Sandero", "Sandero RS", "Scenic", "Sport Spider", "Symbol", "Talisman", "Trafic", "Twingo", "Twizy", "Vel Satis", "Vivastella", "Wind", "ZOE"], ["Camargue", "Corniche", "Dawn", "Ghost", "Park Ward", "Phantom", "Silver Cloud", "Silver Dawn", "Silver Ghost", "Silver Seraph", "Silver Shadow", "Silver Spur", "Silver Wraith", "Wraith"], ["100 Series", "Citigo", "Fabia", "Fabia RS", "Favorit", "Felicia", "Octavia", "Octavia RS", "Rapid", "Roomster", "Superb", "Yeti"], ["Actyon", "Actyon Sports", "Chairman", "Kallista", "Korando", "Korando Family", "Korando Sports", "Kyron", "Musso", "Nomad", "Rexton", "Rodius", "Stavic", "Tivoli"], ["BRZ", "Baja", "Exiga", "Forester", "Impreza", "Impreza WRX", "Impreza WRX STi", "Justy", "Legacy", "Leone", "Outback", "Pleo", "R2", "Sambar", "Stella", "Traviq", "Tribeca", "WRX", "WRX STi", "XV", "Alcyone", "Baja", "Bighorn", "BRZ", "Dex", "Dias Wagon", "Domingo", "Exiga", "Forester", "Impreza", "Impreza WRX", "Impreza WRX STi", "Justy", "Legacy", "Leone", "Levorg", "Libero", "Lucra", "Outback", "Pleo", "R1", "R2", "Sambar", "Sambar dias", "Sambar try", "Stella", "SVX", "Traviq", "Trezia", "Tribeca", "Vivio", "WRX", "WRX STi", "XT", "XV"], ["Aerio", "Alto", "Baleno", "Escudo", "Every", "Grand Vitara", "Ignis", "Jimny", "Kei", "Kizashi", "Liana", "MR Wagon", "SX4", "Samurai", "Solio", "Splash", "Swift", "Vitara", "Wagon R", "XL7", "Aerio", "Alivio", "Alto", "Baleno", "Cappuccino", "Cara", "Celerio", "Cervo", "Cervo Mode", "Ertiga", "Escudo", "Every", "Forenza", "Grand Escudo", "Grand Vitara", "Ignis", "Jimny", "Kei", "Kizashi", "Landy", "Liana", "MR Wagon", "Palette", "Reno", "Samurai", "Sj samurai", "Solio", "Spacia", "Splash", "Swift", "SX4", "Twin", "Verona", "Vitara", "Wagon R", "Wagon R+", "X-90", "XL7"], ["Model S", "Model X", "Roadster"], ["Auris", "Avensis", "Caldina", "Camry", "Camry (Japan)", "Carina", "Celica", "Corolla", "Corona", "Highlander", "Hilux", "Land Cruiser", "Land Cruiser Prado", "Mark II", "Prius", "RAV 4", "Tundra", "Venza", "Vitz", "Yaris", "2000GT", "4Runner", "Allex", "Allion", "Alphard", "Altezza", "Aristo", "Aurion", "Auris", "Avalon", "Avensis", "Avensis Verso", "Aygo", "bB", "Belta", "Blade", "Blizzard", "Brevis", "Caldina", "Cami", "Camry", "Camry (Japan)", "Camry Solara", "Carina", "Carina ED", "Cavalier", "Celica", "Celsior", "Century", "Chaser", "Corolla", "Corolla Rumion", "Corolla Spacio", "Corolla Verso", "Corona", "Corsa", "Cressida", "Cresta", "Crown", "Crown Majesta", "Curren", "Cynos", "Duet", "Echo", "Estima", "FJ Cruiser", "Fortuner", "FunCargo", "Gaia", "Granvia", "GT86", "Harrier", "HiAce", "Highlander", "Hilux", "Hilux Surf", "Innova", "Ipsum", "iQ", "ISis", "Ist", "Kluger", "Land Cruiser", "Land Cruiser Prado", "LiteAce", "Mark II", "Mark X", "Mark X ZiO", "MasterAce Surf", "Matrix", "Mega Cruiser", "Mirai", "MR2", "Nadia", "Noah", "Opa", "Origin", "Paseo", "Passo", "Passo Sette", "Picnic", "Pixis Epoch", "Pixis Mega", "Pixis Space", "Platz", "Porte", "Premio", "Previa", "Prius", "Prius c", "Prius v (+)", "ProAce", "Probox", "Progres", "Pronard", "Ractis", "Raum", "RAV 4", "Regius", "RegiusAce", "Rush", "Sai", "Scepter", "Sequoia", "Sera", "Sienna", "Sienta", "Soarer", "Soluna", "Sparky", "Sprinter", "Sprinter Carib", "Sprinter Marino", "Sprinter Trueno", "Starlet", "Succeed", "Supra", "Tacoma", "Tercel", "Touring Hiace", "TownAce", "Tundra", "Urban Cruiser", "Vanguard", "Vellfire", "Venza", "Verossa", "Verso", "Verso-S", "Vios", "Vista", "Vitz", "Voltz", "Voxy", "WiLL", "WiLL Cypha", "Windom", "Wish", "Yaris", "Yaris Verso"], ["Amarok", "Beetle", "Bora", "Caddy", "Caravelle", "Golf", "Golf GTI", "Golf Plus", "Jetta", "Multivan", "Passat", "Passat CC", "Polo", "Scirocco", "Sharan", "Tiguan", "Touareg", "Touran", "Transporter", "Vento", "181", "Amarok", "Beetle", "Bora", "Caddy", "California", "Caravelle", "Corrado", "Derby", "Eos", "Fox", "Golf", "Golf Country", "Golf GTI", "Golf Plus", "Golf R", "Golf R32", "Golf Sportsvan", "Iltis", "Jetta", "Karmann-Ghia", "Lupo", "Lupo GTI", "Multivan", "Passat", "Passat (North America)", "Passat CC", "Phaeton", "Pointer", "Polo", "Polo GTI", "Polo R WRC", "Routan", "Santana", "Scirocco", "Scirocco R", "Sharan", "Taro", "Tiguan", "Touareg", "Touran", "Transporter", "Type 1", "Type 2", "Type 4", "up!", "Vento", "XL1"], ["240 Series", "440", "460", "740", "850", "940", "960", "C30", "C70", "S40", "S60", "S70", "S80", "V40", "V40 Cross Country", "V50", "V70", "XC60", "XC70", "XC90", "120 Series", "140 Series", "164", "240 Series", "260 Series", "300 Series", "440", "460", "480", "66", "740", "760", "780", "850", "940", "960", "C30", "C70", "Laplander", "S40", "S60", "S60 Cross Country", "S70", "S80", "S90", "V40", "V40 Cross Country", "V50", "V60", "V60 Cross Country", "V70", "V90", "XC60", "XC70", "XC90"], ["12 ЗИМ", "13 «Чайка»", "14 «Чайка»", "21 «Волга»", "22 «Волга»", "2308 «Атаман»", "2330 «Тигр»", "24 «Волга»", "3102 «Волга»", "31029 «Волга»", "3105 «Волга»", "3110 «Волга»", "31105 «Волга»", "3111 «Волга»", "67", "69", "Volga Siber", "М-20 «Победа»", "М-72", "М1", "12 ЗИМ", "13 «Чайка»", "14 «Чайка»", "21 «Волга»", "22 «Волга»", "2308 «Атаман»", "2330 «Тигр»", "24 «Волга»", "3102 «Волга»", "31029 «Волга»", "3103 «Волга»", "3105 «Волга»", "3110 «Волга»", "31105 «Волга»", "3111 «Волга»", "67", "69", "Volga Siber", "М-20 «Победа»", "М-72", "М1"], ["3151", "3153", "3159", "3160", "3162 Simbir", "469", "Hunter", "Patriot", "Pickup"], ["378 GT Zagato", "Ace", "Aceca", "Cobra"], ["CL", "CSX", "EL", "ILX", "Integra", "Legend", "MDX", "NSX", "RDX", "RL", "RLX", "RSX", "SLX", "TL", "TLX", "TSX", "ZDX"], ["Trumpf Junior"], ["105/115", "145", "146", "147", "155", "156", "159", "164", "166", "33", "4C", "75", "90", "Brera", "GT", "GTV", "Giulietta", "MiTo", "Spider", "105/115", "145", "146", "147", "155", "156", "159", "164", "166", "1900", "2600", "33", "4C", "6", "6C", "75", "8C Competizione", "90", "Alfasud", "Alfetta", "Arna", "Brera", "C52 Disco Volante", "Disco Volante", "Giulia", "Giulietta", "GT", "GTA Coupe", "GTV", "MiTo", "Montreal", "RZ", "Spider", "Sprint", "SZ"], ["B10", "B11", "B12", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "C1", "C2", "D10", "D3", "D5", "Roadster", "XD3"], ["A110", "A310", "A610", "GTA"], ["HMMWV (Humvee)"], ["Hornet"], ["Atom"], ["10", "24"], ["Retona", "Rocsta", "Topic"], ["Bulldog", "Cygnet", "DB11", "DB5", "DB7", "DB9", "DBS", "Lagonda", "One-77", "Rapide", "Tickford Capri", "V12 Vanquish", "V12 Vantage", "V12 Zagato", "V8 Vantage", "V8 Zagato", "Virage"], ["Allegro", "Ambassador", "Maestro", "Maxi", "Metro", "Mini", "Montego", "Princess"], ["A 111", "A 112"], ["BD-1322"], ["BJ2020", "BJ212"], ["Freeclimber"], ["Type 3"], ["2000"], ["7.3S", "M V12", "SV12"], ["FRV (BS2)", "H230", "H530", "M1 (BS6)", "M2 (BS4)", "M3 (BC3)", "V5"], ["Blenheim", "Blenheim Speedster", "Fighter"], ["Geneva", "La Joya"], ["Chiron", "EB 110", "EB 112", "EB Veyron 16.4", "Type 44", "Type 50", "Type 57"], ["Century", "Electra", "LeSabre", "Park Avenue", "Regal", "Rendezvous", "Riviera", "Skylark", "Special", "Century", "Electra", "Enclave", "Encore", "Envision", "Estate Wagon", "Excelle", "GL8", "LaCrosse", "LeSabre", "Limited", "Lucerne", "Park Avenue", "Rainer", "Reatta", "Regal", "Rendezvous", "Riviera", "Roadmaster", "Skyhawk", "Skylark", "Special", "Super", "Terraza", "Verano"], ["E6", "F0", "F3", "F5", "F6", "F8", "Flyer", "G3", "G6", "L3", "M6", "S6"], ["BD132J (CoCo)", "BD326J (Moca)"], ["ATS", "ATS-V", "BLS", "Brougham", "CTS", "CTS-V", "DTS", "De Ville", "Eldorado", "Escalade", "Fleetwood", "SRX", "STS", "Series 62", "Seville", "Allante", "ATS", "ATS-V", "BLS", "Brougham", "Catera", "CT6", "CTS", "CTS-V", "De Ville", "DTS", "Eldorado", "ELR", "Escalade", "Fleetwood", "LSE", "Series 62", "Seville", "Sixty Special", "SRX", "STS", "XLR", "XT5", "XTS"], ["C12"], ["FX4"], ["21", "CSR", "Seven"], ["Benni", "CM-8", "CS35", "CS75", "Eado", "Raeton", "Z-Shine"], ["Flying", "SUV (CS6)"], ["200", "300C", "300C SRT8", "300M", "Cirrus", "Concorde", "Crossfire", "Intrepid", "LHS", "Le Baron", "NEW Yorker", "Neon", "PT Cruiser", "Pacifica", "Saratoga", "Sebring", "Stratus", "Town & Country", "Vision", "Voyager", "180", "200", "300", "300C", "300C SRT8", "300M", "Aspen", "Cirrus", "Concorde", "Cordoba", "Crossfire", "Dynasty", "Fifth Avenue", "Imperial", "Imperial Crown", "Intrepid", "Le Baron", "LHS", "Nassau", "Neon", "NEW Yorker", "Pacifica", "Prowler", "PT Cruiser", "Saratoga", "Sebring", "Stratus", "TC by Maserati", "Town & Country", "Viper", "Vision", "Voyager", "Windsor"], ["V16t"], ["T Rex"], ["1300", "1310", "1325", "1410", "Dokker", "Duster", "Lodgy", "Logan", "Nova", "Sandero", "Solenza"], ["City Leading", "Shuttle", "Smoothing"], ["46", "66"], ["Applause", "Atrai", "Be-go", "Boon", "Copen", "Cuore", "Esse", "Feroza", "MAX", "Materia", "Mira", "Move", "Pyzar", "Rocky", "Sirion", "Sonica", "Storia", "Terios", "Xenia", "YRV", "Altis", "Applause", "Atrai", "Be-go", "Boon", "Ceria", "Charade", "Charmant", "Coo", "Copen", "Cuore", "Delta Wagon", "Esse", "Extol", "Feroza", "Gran Move", "Leeza", "Materia", "MAX", "Midget II", "Mira", "Mira Gino", "Move", "Move Latte", "Naked", "Opti", "Pyzar", "Rocky", "Rugger", "Sirion", "Sonica", "Storia", "Taft", "Tanto", "Terios", "Trevis", "Wildcat", "Xenia", "YRV"], ["DS420", "Sovereign (XJ6)", "X300", "X308", "X350", "XJ40", "XJS"], ["280ZX", "720", "Bluebird", "Cherry", "GO", "GO+", "mi-DO", "on-DO", "Stanza", "Sunny", "Urvan", "Violet"], ["Bigua", "Guara", "Mangusta", "Pantera", "Vallelunga"], ["DMC-12"], ["Antelope", "Aurora", "Cowboy", "Land Crown", "Plutus", "Saladin", "Shuttle"], ["Firedome", "Fireflite"], ["Avenger", "Caliber", "Caravan", "Challenger", "Charger", "Dakota", "Dart", "Durango", "Intrepid", "Journey", "Magnum", "Neon", "Nitro", "RAM", "Spirit", "Stealth", "Stratus", "Viper", "WC", "600", "Aries", "Avenger", "Caliber", "Caravan", "Challenger", "Charger", "Dakota", "Dart", "Daytona", "Durango", "Dynasty", "Intrepid", "Journey", "Lancer", "Magnum", "Monaco", "Neon", "Nitro", "Omni", "RAM", "Ramcharger", "Shadow", "Spirit", "Stealth", "Stratus", "Viper", "WC"], ["AX7", "H30 Cross", "MPV", "Oting", "Rich", "S30"], ["Assol", "Kondor", "Orion"], ["D8"], ["3", "4", "5"], ["GD04B"], ["Premier", "Summit", "Talon", "Vision"], ["SS"], ["Estrima Biro"], ["Besturn B50", "Besturn B70", "Besturn X80", "City Golf", "Jinn", "Oley", "V2", "V5", "Vita"], ["500", "Albea", "Brava", "Bravo", "Croma", "Doblo", "Fiorino", "Freemont", "Linea", "Marea", "Palio", "Panda", "Punto", "Qubo", "Scudo", "Sedici", "Stilo", "Tempra", "Tipo", "UNO", "124", "126", "127", "128", "130", "131", "132", "238", "500", "500L", "500X", "508", "600", "900T", "Albea", "Argenta", "Barchetta", "Brava", "Bravo", "Cinquecento", "Coupe", "Croma", "Doblo", "Duna", "Fiorino", "Freemont", "Idea", "Linea", "Marea", "Multipla", "Palio", "Panda", "Punto", "Qubo", "Regata", "Ritmo", "Scudo", "Sedici", "Seicento", "Siena", "Stilo", "Strada", "Tempra", "Tipo", "Ulysse", "UNO", "X 1/9"], ["Karma"], ["Midi", "Tunland"], ["125p", "126p", "127p", "132p", "Polonez"], ["6500 (Land King)"], ["CK (Otaka)", "Emgrand EC7", "Emgrand X7", "FC (Vision)", "GC6", "LC (Panda) Cross", "MK", "MK Cross", "SC7", "Beauty Leopard", "CK (Otaka)", "Emgrand EC7", "Emgrand EC8", "Emgrand X7", "FC (Vision)", "GC2", "GC5", "GC6", "GC7", "GC9", "GX2", "Haoqing", "LC (Panda)", "LC (Panda) Cross", "MK", "MK Cross", "MR", "Otaka", "SC7", "SL"], ["Metro", "Prizm", "Spectrum", "Storm", "Tracker"], ["Acadia", "Aventra", "Berlina", "Calais", "Canyon", "Caprice", "Commodore", "Envoy", "Jimmy", "Safari", "Savana", "Sierra", "Sonoma", "Statesman", "Suburban", "Syclone", "Terrain", "Typhoon", "Vandura", "Yukon"], ["Troy"], ["Roadster"], ["Coolbear", "Deer", "Florid", "Hover", "Hover H3", "Hover H5", "Hover H6", "Hover M2", "Hover M4", "Pegasus", "Peri", "Safe", "Sailor", "Sing RUV", "Socool", "Voleex C30", "Wingle", "Coolbear", "Cowry (V80)", "Deer", "Florid", "Haval M2", "Haval M4", "Hover", "Hover H3", "Hover H5", "Hover H6", "Hover M1 (Peri 4x4)", "Hover M2", "Hover M4", "Pegasus", "Peri", "Safe", "Sailor", "Sing RUV", "Socool", "Voleex C10 (Phenom)", "Voleex C30", "Voleex C50", "Wingle"], ["Brio", "Princip", "Saibao", "Sigma", "Simbo"], ["3", "7", "M3", "S5"], ["H2", "H6", "H8", "H9"], ["Boliger"], ["Ambassador", "Contessa"], ["Apollo", "Astra", "Barina", "Calais", "Caprice", "Commodore", "Cruze", "Frontera", "Jackaroo", "Monaro", "Rodeo", "Statesman", "UTE", "Vectra", "Zafira"], ["Antelope", "Landscape", "Plutus"], ["Deluxe Eight"], ["H1", "H2", "H3"], ["Elba", "Mille", "Mini"], ["S1"], ["Paykan", "Samand", "Soren"], ["Commendatore 112i", "Imperator 108i", "Spyder"], ["Amigo", "Aska", "Axiom", "Bighorn", "D-Max", "Gemini", "KB", "MU", "Piazza", "Rodeo", "TF (Pickup)", "Trooper", "VehiCross", "Wizard", "Amigo", "Ascender", "Aska", "Axiom", "Bighorn", "D-Max", "Filly", "Gemini", "Hombre", "Impulse", "KB", "MU", "MU-7", "MU-X", "Piazza", "Rodeo", "Stylus", "TF (Pickup)", "Trooper", "VehiCross", "Wizard"], ["Massif"], ["J2 (Yueyue)", "J3 (Tongyue,Tojoy)", "J4 (Heyue A30)", "J5 (Heyue)", "J6 (Heyue RS)", "J7 (Binyue)", "M1 (Refine)", "M5", "S1 (Rein)", "S3", "S5 (Eagle)"], ["E-type", "F-Pace", "F-Type", "F-Type SVR", "S-Type", "Sovereign", "X-Type", "XE", "XF", "XFR", "XJ", "XJ220", "XJR", "XJS", "XK", "XKR"], ["Cherokee", "CJ", "Commander", "Compass", "Derda", "Grand Cherokee", "Grand Cherokee SRT8", "Grand Wagoneer", "Liberty (North America)", "Liberty (Patriot)", "Renegade", "Wrangler"], ["S-V8"], ["Baodian"], ["Agera", "CC8S", "CCR", "CCX", "One:1", "Regera"], ["X-Bow"], ["A 112", "Dedra", "Delta", "Kappa", "Lybra", "Musa", "Phedra", "Thema", "Ypsilon", "A 112", "Beta", "Dedra", "Delta", "Flavia", "Fulvia", "Gamma", "Hyena", "Kappa", "Lybra", "Monte Carlo", "Musa", "Phedra", "Prisma", "Thema", "Thesis", "Trevi", "Voyager", "Y10", "Ypsilon", "Zeta"], ["Fashion (CV9)", "Forward", "X5", "X6", "Х9"], ["Leopard"], ["320", "520", "530", "620", "Breez (520)", "Cebrium (720)", "Celliya (530)", "Smily", "Solano", "X50", "X60"], ["Aviator", "Continental", "LS", "Mark LT", "Mark VII", "Mark VIII", "MKC", "MKS", "MKT", "MKX", "MKZ", "Navigator", "Town Car"], ["340R", "Eclat", "Elan", "Elise", "Elite", "Esprit", "Europa", "Europa S", "Evora", "Excel", "Exige"], ["TX"], ["Luxgen5", "Luxgen7 MPV", "Luxgen7 SUV", "U6 Turbo", "U7 Turbo"], ["Armada", "Bolero", "CJ-3", "CL", "Commander", "Marshal", "MM", "NC 640 DP", "Scorpio", "Verito", "Voyager", "Xylo"], ["GTS", "LM 400", "LM 500", "Mantis", "Marcasite"], ["5EXi", "Sportster"], ["B1", "B2"], ["1000", "800", "Alto", "Baleno", "Esteem", "Gypsy", "Omni", "Versa", "Wagon R", "Zen"], ["3200 GT", "4200 GT", "Biturbo", "Ghibli", "GranTurismo", "MC12", "Quattroporte", "228", "3200 GT", "420", "4200 GT", "Barchetta Stradale", "Biturbo", "Bora", "Chubasco", "Ghibli", "Gran Sport", "GranTurismo", "Indy", "Karif", "Khamsin", "Kyalami", "Levante", "MC12", "Merak", "Mexico", "Quattroporte", "Royale", "Shamal"], ["57", "62"], ["540C", "570GT", "570S", "650S", "675LT", "F1", "MP4-12C", "P1"], ["Club", "Monte Carlo", "Track"], ["Capri", "Cougar", "Eight", "Grand Marquis", "Marauder", "Mariner", "Marquis", "Milan", "Montego", "Monterey", "Mountaineer", "Mystique", "Sable", "Topaz", "Tracer", "Villager"], ["Metrocab I", "Metrocab II (TTT)", "Taxi"], ["3", "3 Cross", "350", "5", "550", "6", "F", "GS", "Maestro", "Metro", "MGB", "Midget", "Montego", "RV8", "TF", "Xpower SV", "ZR", "ZS", "ZT"], ["F8C", "M.Go", "M8", "MC", "Virgo"], ["TF 1800"], ["Galue", "Galue 204", "Himiko", "K-2", "Le-Seyde", "Like", "MC-1", "Nouera", "Orochi", "Ray", "Ryoga", "Viewt", "Yuga", "Zero 1"], ["3 Wheeler", "4 Seater", "4/4", "Aero 8", "Aero Coupe", "Aero SuperSports", "AeroMax", "Plus 4", "Plus 8", "Roadster"], ["Marina"], ["M12 GTO", "M600"], ["Achieva", "Alero", "Aurora", "Bravada", "Cutlass", "Cutlass Calais", "Cutlass Ciera", "Cutlass Supreme", "Eighty-Eight", "Intrigue", "Ninety-Eight", "Omega", "Regency", "Silhouette", "Toronado"], ["2500 GT"], ["Clipper", "One-Twenty", "Twelve"], ["Huayra", "Zonda"], ["Esperante", "Roadster"], ["Alza", "Kancil", "Kelisa", "Kembara", "Kenari", "MyVi", "Nautica", "Viva"], ["Cevennes", "Hemera", "Speedster II"], ["Porter"], ["Acclaim", "Barracuda", "Breeze", "Caravelle", "Fury", "Laser", "Neon", "Prowler", "Road Runner", "Sundance", "Turismo", "Valiant", "Voyager"], ["Bonneville", "Fiero", "Firebird", "Grand AM", "Grand Prix", "Montana", "Phoenix", "Solstice", "Sunfire", "Trans Sport", "Vibe", "6000", "Aztek", "Bonneville", "Catalina", "Fiero", "Firebird", "G4", "G5", "G6", "G7", "G8", "Grand AM", "Grand Prix", "GTO", "LeMans", "Montana", "Parisienne", "Phoenix", "Solstice", "Sunbird", "Sunfire", "Tempest", "Torrent", "Trans Sport", "Vibe"], ["356", "718 Boxster", "911", "911 GT2", "911 GT3", "914", "918 Spyder", "924", "928", "944", "959", "968", "Boxster", "Carrera GT", "Cayenne", "Cayman", "Cayman GT4", "Macan", "Panamera"], ["118NE", "Padmini"], ["Exora", "Gen-2", "Inspira", "Iswara", "Juara", "Perdana", "Persona", "Preve", "Putra", "Saga", "Satria", "Waja", "Wira (400 Series)"], ["G-modell", "Pinzgauer"], ["GTB", "GTE"], ["3"], ["Mangusta"], ["Gentra", "Matiz", "Nexia R3", "R2"], ["Scimitar Sabre"], ["Tropica Roadster"], ["SM3", "SM5", "SM7"], ["Beast"], ["Concept_One"], ["Lightning"], ["100", "200", "25", "400", "45", "600", "75", "800", "Coupe", "Metro", "Mini", "P3", "P4", "P5", "P6", "SD1", "Streetwise"], ["9-2X", "9-3", "9-4X", "9-5", "9-7X", "90", "900", "9000", "95", "96", "99"], ["S7"], ["PS-10"], ["Astra", "Aura", "ION", "LS", "LW", "Outlook", "Relay", "SC", "Sky", "SL", "SW", "VUE"], ["FR-S", "iA", "iM", "iQ", "tC", "xA", "xB", "xD"], ["133", "Alhambra", "Altea", "Arosa", "Ateca", "Cordoba", "Exeo", "Fura", "Ibiza", "Ibiza Cupra", "Leon", "Leon Cupra", "Malaga", "Marbella", "Mii", "Ronda", "Toledo"], ["Noble", "Sceo"], ["Forfour", "Fortwo", "Roadster"], ["Lioncel"], ["R42"], ["C12", "C8"], ["1510", "Avenger", "Horizon", "Samba", "Solara", "Tagora"], ["Aria", "Estate", "Indica", "Indigo", "Nano", "Safari", "Sierra", "Sumo", "Xenon"], ["57", "T613", "T700"], ["Zero"], ["Century"], ["Admiral"], ["Dogan", "Kartal", "Murat 124", "Murat 131", "Serce"], ["1.1", "P 601"], ["Tramontana"], ["Stag", "TR6", "TR7", "TR8"], ["280", "350", "390", "400", "420", "450", "Cerbera", "Chimaera", "Griffith", "S-Series", "Sagaris", "Tamora", "Tuscan"], ["GTR"], ["Adam", "Agila", "Astra", "Carlton", "Royale", "Vectra", "Ventora", "Viceroy", "Victor", "Viva", "VXR8"], ["M12", "W8 Twin Turbo"], ["210", "260 LM", "300 Atlantique", "400 GT"], ["Corda", "Estina", "Tingo"], ["Fenyr Supersport", "Lykan Hypersport"], ["1.3", "353"], ["SEi & Sport", "SEiGHT"], ["GT", "Roadster"], ["MB"], ["Pickup X3", "SR-V X3", "SUV X3"], ["10", "Florida", "Skala", "Yugo"], ["E10"], ["ST1"], ["Nomad (RX6400)", "T600", "Z100", "Z300"], ["Admiral", "Grand Tiger", "Landmark"], ["2160", "2163", "3101"], ["Ока-Астро 11301"], ["Рысь", "Фора"], ["1102 «Таврия»", "1103 «Славута»", "110307-40/42", "110308-40", "1105 «Дана»", "965", "966", "968", "Chance", "Forza", "Lanos", "Sens", "Vida"], ["114", "117", "4104"], ["110"], ["2125 «Комби»", "2126 «Ода»", "21261 «Фабула»", "2717", "Москвич-412"], ["1111 Ока"], ["2317"], ["Т98"], ["1302 Волынь", "967", "969"], ["2137", "2138", "2140", "2141", "400", "401", "402", "403", "407", "408", "410", "412", "423", "424", "427", "Князь Владимир", "Святогор", "Юрий Долгорукий", "2136", "2137", "2138", "2140", "2141", "400", "401", "402", "403", "407", "408", "410", "411", "412", "423", "424", "426", "427", "Дуэт", "Иван Калита", "Князь Владимир", "Святогор", "Юрий Долгорукий"], ["1111 Ока"], ["С-3А", "С-3Д"], ["Aquila", "C-30", "C10", "C190", "Road Partner", "Tager", "Vega"], ["Бэтмобиль", "Лимузин", "Мелкосерийная", "Реплика", "Самоделка"], ["Ё-Кроссовер"]];
var num = 0;
var modelId = 0;

var componentConfig = {
	    iconFiletypes: ['.jpg', '.png', '.gif'],
	    showFiletypeIcon: true,
	    postUrl: `${apiPrefix}/upload`
	};

	var djsConfig = {
	    addRemoveLinks: true,
	    acceptedFiles: "image/jpeg,image/png,image/gif"
	};

	function sucRes(props, res){
		let searching = true;
		inputs = [];
		for (let i = 0; i < 6; i++) {
				if (tmpPhotos[i] === "" && searching){
					searching = false;
					tmpPhotos[i] = res.responseText;
				};
				let tmp = [];
				for (let photo of tmpPhotos)
					if (photo !== "")
						tmp.push(photo);
				scope.setState({ photos : tmp });
			};

		console.log(res.responseText);
	};

	var scope = this;

	var eventHandlers = {
	    success: sucRes
	};

let max = 0;




			function getStateFromFlux(userId) {
			    return {
						products: store.getProducts(),
						user: store.getUser(parseInt(userId)),
						userId: userId
					};
			};

			function inLocalStorage() {
				let local = parseInt(localStorage.getItem('userId'));
				if (local === undefined){
					local = -1;
					localStorage.setItem("userId", local);
				}
				else {
			    	local = parseInt(localStorage.getItem('userId'));
			    };
			    return getStateFromFlux(local);
			};





var App = React.createClass({
		contextTypes: {
	        router: React.PropTypes.object.isRequired
	    },

	    getInitialState() {

	    	let local = localStorage.getItem('userId');
			if (local === ""){
				local = -1;
				localStorage.setItem("userId", local);
			}
			else {
		    	local = parseInt(localStorage.getItem('userId'));
		    };

		     // if (local === -1 || local != 0)
			    // 			this.context.router.push(`/all`)
			  console.log(local);
	    	return inLocalStorage();
	    },


	    shouldComponentUpdate(nextProps, nextState) {
	    	let local = localStorage.getItem('userId');
		    	console.log(this.state.userId);
		    	console.log(local);

		    if (local !== this.state.userId ) {
		    	console.log("fuuuuuuuuuuuuuuck");
		    	// this.setState(inLocalStorage());
		    	// this.forceUpdate();
		    };
		    return ( local !== this.state.userId );
	    },

	    handleLogoClick: function(){
	    	this.context.router.push(`/main`);
	    },

	    handleProfile() { 
	    	this.context.router.push(`/profile/1`);
	    },

	    handleLogin() { 
	    	this.context.router.push(`/login`);
	    },

	    handleMail() { 
	    	this.context.router.push(`/all`);
	    },

	    handleAdd() { 
	    	this.context.router.push(`/add`);
	    },

	    handleHost() {
	    	this.context.router.push(`/host`);
	    },

	    handleSerachChange(event) {
	    	this.setState({ search : event.target.value});
	    	(event.target.value.length > 0) ? additional_show() : additional_close();

	    },

		render: function() {

			var { userId  } = this.state;
			let useCase = [];
			if ( userId !== -1)
				return (
					<div className="app">
						
						<div className='header'> </div>
								<Additional name={this.state.search}/>

						<div className="top" id="tile">
								<div className="logo">
									<img src="https://habrastorage.org/files/5d1/11a/0a3/5d111a0a3f9b4d91b5d3eddf845b3744.png" alt="" id="logo_top"  onClick={this.handleLogoClick}/>
								</div>
								<div id="search_icon"></div>
								<input type="text" placeholder="Что вы хотите найти?" className="search_field" onChange={this.handleSerachChange}/>
								
								<div className="top_item" onClick={this.handleProfile}>
									Профиль
								</div>
								<div className="top_item" onClick={this.handleAdd}>
									Помощь
								</div>
								<div className="top_item" onClick={this.handleMail}>
									Сообщения
								</div>
								<div className="top_item" onClick={this.handleHost}>
									<button>Стать хозяином</button>
								</div>
						</div>

						<div className='content'>
		                    {this.props.children}
		                </div>
					</div>)
			else
				return (
					<div className="app">
						
						<div className='header'> </div>
								<Additional name={this.state.search}/>

						<div className="top" id="tile">
								<div className="logo">
									<img src="https://habrastorage.org/files/5d1/11a/0a3/5d111a0a3f9b4d91b5d3eddf845b3744.png" alt="" id="logo_top"  onClick={this.handleLogoClick}/>
								</div>
								<div id="search_icon"></div>
								<input type="text" placeholder="Что вы хотите найти?" className="search_field" onChange={this.handleSerachChange}/>
								
								<div className="top_item" onClick={this.handleLogin}>
									Войти
								</div>
								<div className="top_item" onClick={this.handleAdd}>
									Помощь
								</div>
						</div>

						<div className='content'>
		                    {this.props.children}
		                </div>
					</div>)

		},

		_onChange() {
	        this.setState(inLocalStorage());
	    }
});


var Additional = React.createClass({
	contextTypes: {
        router: React.PropTypes.object.isRequired
    },

	getInitialState() {
    	store.getProducts().filter((x) => {if (x.id > max) max = x.id});
    	console.log(max + 1);
    	return {
    		products: store.getProducts(),
    		id : (max + 1),
    		addMode: false
    	};
    },

	handleName(event) {
    	this.setState({ name : event.target.value });
    },

	handlePrice(event) {
		if ( !isNaN(parseInt(event.target.value[event.target.value.length - 1])) ){
	    	this.setState({ price : parseInt(event.target.value) });
	    }
	    else {
	    	event.target.value = event.target.value.substr(0, event.target.value.length - 1);
	    	if (event.target.value === "")
	    		this.setState({ price : ""});
	    }
    },

	handleImage(event) {
    	this.setState({ image : event.target.value });
    },

	handleDescroption(event) {
    	this.setState({ description : event.target.value });
    },

	handleType(event) {
    	this.setState({ type : event.target.value });
    },

	handleYear(event) {
    	this.setState({ year : event.target.value });
    },

	handleMark(event) {
		// console.log(event.target.value);
    	this.setState({ mark : event.target.value });
    },

	handleModel(event) {
    	this.setState({ model : event.target.value });
    },

	handleColor(event) {
    	this.setState({ color : event.target.value });
    },

    handleSubmit() {

    	if (this.state.addMode) {
	    	let { 	name,
					price,
					image,
					description,
					type,
					year,
					mark,
					model,
					color,
					id   } = this.state;
			(image === undefined) ? image = "http://chertezhi.ru/modules/ukrfiles/cache/shots/Diplomn-kursovoy/Avtomob-otrasl/gd-man.jpg" : 1;
			let New = { id: id,
						name: this.props.name,
						price: price,
						image: image,
						description: description,
						type: type,
						year: year,
						mark: mark,
						model: model,
						color: color 	};

			actions.createProduct(New);
			additional_close();
			this.setState({ addMode: false });
			this.context.router.push(`/all`);
		}
		else
		{
			this.setState({ addMode: true });
		}
    },

    componentDidMount() {
        store.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
		store.removeChangeListener(this._onChange);
    },

    componentWillMount() {
        actions.loadProducts();
        actions.loadUsers();
    },

	handleOffer() {
		this.context.router.push(`/all`);
		additional_close();
	},

	handleMark(event) {
		console.log(event);
	},

	render() {
		let detail = [];
		if (this.state.addMode){
			detail.push(<DropzoneComponent config={componentConfig}
		                       eventHandlers={eventHandlers}
		                       djsConfig={djsConfig} />);
			detail.push(<input type="text" onChange={this.handleName} placeholder="Коментарий"/>);
			detail.push(<input type="text" onChange={this.handleName} placeholder="Цвет"/>);
			detail.push(<br/>);


		};
		return <div className="Additional">
						<div className="checkbox">
							<label htmlFor="type_new">Новые</label>
							<input type="checkbox" id="type_new"/>						
						</div>

						<div className="checkbox">
							<label htmlFor="type_oficial">Официальные</label>
							<input type="checkbox" id="type_oficial"/>						
						</div>

									

						<br/>
						<input1 type="text" onChange={this.handleName} placeholder="Название"/>
						<br1/>
						<input1 type="text" onChange={this.handlePrice} placeholder="Цена"/>
						<br1/>
						<input1 type="text" onChange={this.handleImage} placeholder="Фото"/>
						<br1/>
						<input1 type="text" onChange={this.handleDescroption} placeholder="Описание"/>
						<b1/>
						<input1 type="text" onChange={this.handleType} placeholder="Тип товара"/>
						<br1/>

						<div words={ words } slackSearch={false} placeholder="Марка" onChange={this.handleMark} />
						

						
							<input type="text" onChange={this.handleMark} placeholder="Марка"/>
						
							<input type="text" onChange={this.handleModel} placeholder="Модель"/>
						
							<input type="text" onChange={this.handleYear} placeholder="Год выпуска автомобиля"/>
						
						
						<br1/>
						<br/>
						<input1 type="text" onChange={this.handleColor} placeholder="Цвет"/>
						<br/>
						{detail}
						<br/>
						<button onClick={this.handleSubmit}>Разместить</button>	
						<button onClick={this.handleOffer}>Пердложить</button>	
		</div>
	},

    _onChange() {
        this.setState(getStateFromFlux());
    }
}); 



export default App;

