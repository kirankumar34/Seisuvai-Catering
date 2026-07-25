const classifyItem = (name) => {
    const item = name.toLowerCase().trim();
    if (!item) return null;

    let isNonVeg = false;
    if (
        item.includes('chicken') || 
        item.includes('mutton') || 
        item.includes('prawn') || 
        item.includes('fish') || 
        item.includes('egg') || 
        item.includes('kola urundai') ||
        item.includes('crab') ||
        item.includes('beef') ||
        item.includes('pork') ||
        item.includes('meat') ||
        item.includes('nethili') ||
        item.includes('sura') ||
        item.includes('vanjaram')
    ) {
        isNonVeg = true;
    }

    return { name: name.trim(), isNonVeg };
};

const parseMenu = (rawText) => {
    // Split by newlines, semicolons, or commas
    const rawItems = rawText
        .split(/[\n,;]+/)
        .map(i => i.trim())
        .filter(Boolean);

    const items = rawItems.map(classifyItem).filter(Boolean);

    const breakfast = [];
    const lunch = {
        starters: [],
        rice_items: [],
        gravies: [],
        side_dishes: [],
        desserts: [],
        beverages: []
    };
    const snacks = [];
    const dinner = {
        starters: [],
        main_course: [],
        rice_items: [],
        desserts: [],
        beverages: []
    };
    const live_counters = [];
    const sweets = [];
    const ice_cream = [];

    // Helper arrays for routing classified items
    const bfKeywords = ['idli', 'dosa', 'pongal', 'poori', 'vada', 'idiyappam', 'upma', 'appam', 'roast', 'uthappam', 'kichadi', 'puri'];
    const starterKeywords = ['65', 'kola urundai', 'fry', 'tikka', 'cutlet', 'manchurian', 'spring roll', 'samosa', 'finger', 'lollipop', 'nuggets', 'pepper salt', 'bajji', 'bonda'];
    const riceKeywords = ['biryani', 'biriyani', 'rice', 'sadham', 'sadam', 'pulao', 'pilaf', 'bagara', 'jeera'];
    const gravyKeywords = ['sambar', 'rasam', 'kuzhambu', 'kulambu', 'kurma', 'salna', 'gravy', 'dal', 'makhani', 'masala', 'kootu'];
    const sideKeywords = ['poriyal', 'avial', 'varuval', 'vadhakkal', 'thokku', 'pachadi', 'raitha', 'pickle', 'appalam', 'vadam', 'chips', 'fry', 'dry'];
    const sweetKeywords = ['kesari', 'jamun', 'halwa', 'sweet', 'katli', 'mysore pak', 'laddu', 'ladoo', 'payasam', 'kheer', 'double ka meetha'];
    const dessertKeywords = ['fruit salad', 'custard', 'souffle', 'pudding', 'brownie', 'falooda', 'jigarthanda'];
    const beverageKeywords = ['coffee', 'tea', 'milk', 'juice', 'shake', 'mojito', 'soup', 'beverage', 'water', 'soda'];
    const liveKeywords = ['live', 'counter', 'stall', 'station', 'make to order', 'dosa counter', 'appam counter', 'shawarma'];
    const iceCreamKeywords = ['ice cream', 'icecream', 'kulfi', 'cassatta'];
    const snackKeywords = ['samosa', 'bajji', 'bonda', 'puff', 'pakoda', 'sundal', 'tea snack'];

    let hasVeg = false;
    let hasNonVeg = false;

    items.forEach(item => {
        if (item.isNonVeg) {
            hasNonVeg = true;
        } else {
            hasVeg = true;
        }

        const nameLower = item.name.toLowerCase();

        // 1. Live Counters
        if (liveKeywords.some(kw => nameLower.includes(kw))) {
            live_counters.push(item.name);
            return;
        }

        // 2. Ice Cream
        if (iceCreamKeywords.some(kw => nameLower.includes(kw))) {
            ice_cream.push(item.name);
            return;
        }

        // 3. Sweets & Desserts
        if (sweetKeywords.some(kw => nameLower.includes(kw))) {
            sweets.push(item.name);
            return;
        }
        if (dessertKeywords.some(kw => nameLower.includes(kw))) {
            lunch.desserts.push(item.name);
            dinner.desserts.push(item.name);
            return;
        }

        // 4. Beverages
        if (beverageKeywords.some(kw => nameLower.includes(kw))) {
            lunch.beverages.push(item.name);
            dinner.beverages.push(item.name);
            return;
        }

        // 5. Starters
        if (starterKeywords.some(kw => nameLower.includes(kw))) {
            lunch.starters.push(item.name);
            dinner.starters.push(item.name);
            return;
        }

        // 6. Breakfast Items
        if (bfKeywords.some(kw => nameLower.includes(kw))) {
            breakfast.push(item.name);
            dinner.main_course.push(item.name);
            return;
        }

        // 7. Rice Items
        if (riceKeywords.some(kw => nameLower.includes(kw))) {
            lunch.rice_items.push(item.name);
            dinner.rice_items.push(item.name);
            return;
        }

        // 8. Gravy Items
        if (gravyKeywords.some(kw => nameLower.includes(kw))) {
            lunch.gravies.push(item.name);
            return;
        }

        // 9. Side Dishes
        if (sideKeywords.some(kw => nameLower.includes(kw))) {
            lunch.side_dishes.push(item.name);
            return;
        }

        // 10. Snacks
        if (snackKeywords.some(kw => nameLower.includes(kw))) {
            snacks.push(item.name);
            return;
        }

        // Fallback assignments
        if (item.isNonVeg) {
            lunch.rice_items.push(item.name);
            dinner.main_course.push(item.name);
        } else {
            lunch.side_dishes.push(item.name);
            dinner.main_course.push(item.name);
        }
    });

    let veg_or_nonveg = 'Veg';
    if (hasVeg && hasNonVeg) {
        veg_or_nonveg = 'Mixed';
    } else if (hasNonVeg) {
        veg_or_nonveg = 'Non-Veg';
    }

    return {
        veg_or_nonveg,
        breakfast,
        lunch,
        snacks,
        dinner,
        live_counters,
        sweets,
        ice_cream,
        total_items_per_leaf: items.length
    };
};

module.exports = { parseMenu };
