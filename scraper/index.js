const fs = require('fs');
const path = require('path');
const { parseMenu } = require('./menuClassifier');

const inputFilePath = path.join(__dirname, 'raw_menu.txt');
const outputDir = path.join(__dirname, 'output');

const ensureDirectoryExists = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

const run = () => {
    try {
        if (!fs.existsSync(inputFilePath)) {
            console.error(`Input file not found at: ${inputFilePath}`);
            process.exit(1);
        }

        const content = fs.readFileSync(inputFilePath, 'utf-8');
        const lines = content.split('\n');

        let caterer_name = 'Unknown Tamil Nadu Caterer';
        let location = 'Tamil Nadu';
        let event_type = 'Wedding';
        let menu_type = 'Buffet';
        let page_number = '1';
        let source_url = '';

        const itemLines = [];
        let parsingItems = false;

        lines.forEach(line => {
            const cleanLine = line.trim();
            if (!cleanLine) return;

            if (cleanLine.startsWith('---') && cleanLine.toLowerCase().includes('menu')) {
                parsingItems = true;
                return;
            }

            if (!parsingItems) {
                if (cleanLine.toLowerCase().startsWith('location:')) {
                    location = cleanLine.substring(9).trim();
                } else if (cleanLine.toLowerCase().startsWith('event:')) {
                    event_type = cleanLine.substring(6).trim();
                } else if (cleanLine.toLowerCase().startsWith('menu type:')) {
                    menu_type = cleanLine.substring(10).trim();
                } else if (cleanLine.toLowerCase().startsWith('page:')) {
                    page_number = cleanLine.substring(5).trim();
                } else if (cleanLine.toLowerCase().startsWith('source:')) {
                    source_url = cleanLine.substring(7).trim();
                } else if (!cleanLine.includes(':')) {
                    caterer_name = cleanLine;
                }
            } else {
                itemLines.push(cleanLine);
            }
        });

        // Join items back for classifier input
        const rawText = itemLines.join(', ');
        const parsed = parseMenu(rawText);

        const structuredMenu = {
            caterer_name,
            location,
            event_type,
            menu_type,
            page_number,
            total_items_per_leaf: parsed.total_items_per_leaf,
            breakfast: parsed.breakfast,
            lunch: parsed.lunch,
            snacks: parsed.snacks,
            dinner: parsed.dinner,
            live_counters: parsed.live_counters,
            sweets: parsed.sweets,
            ice_cream: parsed.ice_cream,
            veg_or_nonveg: parsed.veg_or_nonveg,
            source_url
        };

        ensureDirectoryExists(outputDir);

        // 1. JSON Export
        fs.writeFileSync(
            path.join(outputDir, 'menu.json'),
            JSON.stringify(structuredMenu, null, 2),
            'utf-8'
        );

        // 2. CSV Export
        const headers = [
            'Caterer Name', 'Location', 'Event Type', 'Menu Type', 'Page Number', 
            'Total Items', 'Veg/Non-Veg', 'Source URL', 
            'Breakfast Items', 'Lunch Starters', 'Lunch Rice Items', 'Lunch Gravies', 'Lunch Side Dishes', 'Lunch Desserts', 'Lunch Beverages', 
            'Dinner Starters', 'Dinner Main Course', 'Dinner Rice Items', 'Dinner Desserts', 'Dinner Beverages', 
            'Snacks', 'Live Counters', 'Sweets', 'Ice Cream'
        ];

        const escapeCsv = (str) => {
            const val = String(str || '');
            if (val.includes(',') || val.includes('"') || val.includes('\n')) {
                return `"${val.replace(/"/g, '""')}"`;
            }
            return val;
        };

        const joinItems = (arr) => escapeCsv((arr || []).join(' | '));

        const row = [
            escapeCsv(structuredMenu.caterer_name),
            escapeCsv(structuredMenu.location),
            escapeCsv(structuredMenu.event_type),
            escapeCsv(structuredMenu.menu_type),
            escapeCsv(structuredMenu.page_number),
            structuredMenu.total_items_per_leaf || 0,
            escapeCsv(structuredMenu.veg_or_nonveg),
            escapeCsv(structuredMenu.source_url),
            joinItems(structuredMenu.breakfast),
            joinItems(structuredMenu.lunch?.starters),
            joinItems(structuredMenu.lunch?.rice_items),
            joinItems(structuredMenu.lunch?.gravies),
            joinItems(structuredMenu.lunch?.side_dishes),
            joinItems(structuredMenu.lunch?.desserts),
            joinItems(structuredMenu.lunch?.beverages),
            joinItems(structuredMenu.dinner?.starters),
            joinItems(structuredMenu.dinner?.main_course),
            joinItems(structuredMenu.dinner?.rice_items),
            joinItems(structuredMenu.dinner?.desserts),
            joinItems(structuredMenu.dinner?.beverages),
            joinItems(structuredMenu.snacks),
            joinItems(structuredMenu.live_counters),
            joinItems(structuredMenu.sweets),
            joinItems(structuredMenu.ice_cream)
        ];

        const csvContent = [headers.join(','), row.join(',')].join('\n');
        fs.writeFileSync(path.join(outputDir, 'menu.csv'), csvContent, 'utf-8');

        // 3. SQL Export
        const esc = (str) => String(str || '').replace(/'/g, "''");
        const sqlContent = `
INSERT INTO catering_menus (
    caterer_name, location, event_type, menu_type, page_number, 
    total_items_per_leaf, veg_or_nonveg, source_url, 
    breakfast_items, lunch_starters, lunch_rice, lunch_gravies, lunch_sides, lunch_desserts, lunch_beverages, 
    dinner_starters, dinner_main, dinner_rice, dinner_desserts, dinner_beverages, 
    snacks, live_counters, sweets, ice_cream
) VALUES (
    '${esc(structuredMenu.caterer_name)}', '${esc(structuredMenu.location)}', '${esc(structuredMenu.event_type)}', '${esc(structuredMenu.menu_type)}', '${esc(structuredMenu.page_number)}',
    ${structuredMenu.total_items_per_leaf || 0}, '${esc(structuredMenu.veg_or_nonveg)}', '${esc(structuredMenu.source_url)}',
    '${esc(JSON.stringify(structuredMenu.breakfast))}', '${esc(JSON.stringify(structuredMenu.lunch?.starters))}', '${esc(JSON.stringify(structuredMenu.lunch?.rice_items))}', '${esc(JSON.stringify(structuredMenu.lunch?.gravies))}', '${esc(JSON.stringify(structuredMenu.lunch?.side_dishes))}', '${esc(JSON.stringify(structuredMenu.lunch?.desserts))}', '${esc(JSON.stringify(structuredMenu.lunch?.beverages))}',
    '${esc(JSON.stringify(structuredMenu.dinner?.starters))}', '${esc(JSON.stringify(structuredMenu.dinner?.main_course))}', '${esc(JSON.stringify(structuredMenu.dinner?.rice_items))}', '${esc(JSON.stringify(structuredMenu.dinner?.desserts))}', '${esc(JSON.stringify(structuredMenu.dinner?.beverages))}',
    '${esc(JSON.stringify(structuredMenu.snacks))}', '${esc(JSON.stringify(structuredMenu.live_counters))}', '${esc(JSON.stringify(structuredMenu.sweets))}', '${esc(JSON.stringify(structuredMenu.ice_cream))}'
);`.trim();
        fs.writeFileSync(path.join(outputDir, 'menu.sql'), sqlContent, 'utf-8');

        console.log('Extraction successfully completed! Output files generated in scraper/output/ folder.');
    } catch (err) {
        console.error('Error executing scraper extractor:', err);
    }
};

run();
