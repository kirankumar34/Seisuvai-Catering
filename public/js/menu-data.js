const cateringMenus = {
    'Tiffin Menu - Veg: Menu 1': {
        mainTitle: 'Tiffin Menu - Veg',
        subtitle: 'Menu 1: Economy Selection',
        image: 'images/menu-1-south-indian.png',
        category: 'tiffin',
        type: 'veg',
        price: '₹170 – ₹200',
        sections: [
            { title: '🍬 Sweet', items: ['Pineapple Kesari'] },
            { title: '🍽️ Breakfast Items', items: ['Idli', 'Medu Vada', 'Poori', 'Ven Pongal (White Pongal)'] },
            { title: '🍛 Accompaniments', items: ['Sambar', 'Vada Curry', 'Coconut Chutney', 'Spicy Chutney'] },
            { title: '☕ Beverage', items: ['Coffee'] },
            { title: '🎁 Extras', items: ['Drinking Water Bottle', 'Banana Leaf', 'Paper roll', 'Service boys'] }
        ]
    },
    'Tiffin Menu - Veg: Menu 2': {
        mainTitle: 'Tiffin Menu - Veg',
        subtitle: 'Menu 2: Standard Selection',
        image: 'images/menu-2-south-indian.png',
        category: 'tiffin',
        type: 'veg',
        price: '₹190 – ₹220',
        sections: [
            { title: '🍬 Sweet', items: ['Carrot Halwa'] },
            { title: '🍽️ Breakfast Items', items: ['Malli Idli', 'Poori', 'Medu Vada', 'Ven Pongal (White Pongal)'] },
            { title: '🍛 Curries & Accompaniments', items: ['Vada Curry / Urulai Masala', 'Sambar', 'Coconut Chutney', 'Spicy Chutney'] },
            { title: '☕ Beverage', items: ['Coffee'] },
            { title: '🎁 Extras', items: ['Drinking Water Bottle', 'Banana Leaf', 'Paper roll', 'Service boys'] }
        ]
    },
    'Tiffin Menu - Veg: Menu 3': {
        mainTitle: 'Tiffin Menu - Veg',
        subtitle: 'Menu 3: Deluxe Selection',
        image: 'images/imperial_ghee_pongal.png',
        category: 'tiffin',
        type: 'veg',
        price: '₹200 – ₹230',
        sections: [
            { title: '🍬 Sweet', items: ['Kasi Halwa', 'Semiya Kesari'] },
            { title: '🍽️ Breakfast Items', items: ['Plate Idli / Elaneer Idli', 'Chole Poori', 'Rava Dosa / Masala Dosa', 'Ghee Pongal', 'Medu Vada / Masala Vada'] },
            { title: '🍛 Curries & Accompaniments', items: ['Channa Masala', 'Sambar', 'Coconut Chutney', 'Mint Chutney', 'Spicy Chutney'] },
            { title: '☕ Beverage', items: ['Coffee / Tea'] },
            { title: '🎁 Extras', items: ['Drinking Water Bottle', 'Banana Leaf', 'Paper roll', 'Service boys'] }
        ]
    },

    'Lunch Menu - Veg: Menu 1': {
        mainTitle: 'Lunch Menu - Veg',
        subtitle: 'Menu 1: Economy Selection',
        image: 'images/hero-south-indian.png',
        category: 'lunch',
        type: 'veg',
        price: '₹150 – ₹170',
        sections: [
            { title: '🍬 Sweet', items: ['Payasam'] },
            { title: '🍚 Rice', items: ['Plain White Rice'] },
            { title: '🥣 Gravies', items: ['Sambar', 'Vathal Kuzhambu', 'Rasam', 'Buttermilk'] },
            { title: '🥗 Sides', items: ['Varuval', 'Poriyal', 'Vada', 'Pickle', 'Appalam'] },
            { title: '🥤 Beverage', items: ['Drinking Water Bottle'] },
            { title: '🎁 Extras', items: ['Banana Leaf', 'Paper Roll', 'Service Boys'] }
        ]
    },
    'Lunch Menu - Veg: Menu 2': {
        mainTitle: 'Lunch Menu - Veg',
        subtitle: 'Menu 2: Standard Selection',
        image: 'images/gallery-1-south-indian.png',
        category: 'lunch',
        type: 'veg',
        price: '₹170 – ₹200',
        sections: [
            { title: '🍬 Sweet', items: ['Frini Payasam', 'Gulab Jamun'] },
            { title: '🍚 Rice', items: ['Plain White Rice'] },
            { title: '🥣 Gravies', items: ['Sambar', 'Vathal Kuzhambu', 'Tomato Rasam', 'Buttermilk'] },
            { title: '🥗 Sides', items: ['Kootu / Varuval', 'Poriyal / Avial', 'Vada', 'Pickle', 'Appalam'] },
            { title: '🥤 Beverage', items: ['Drinking Water Bottle'] },
            { title: '🎁 Extras', items: ['Banana Leaf', 'Paper Roll', 'Service Boys'] }
        ]
    },
    'Lunch Menu - Veg: Menu 3': {
        mainTitle: 'Lunch Menu - Veg',
        subtitle: 'Menu 3: Deluxe Selection',
        image: 'images/gallery-2-south-indian.png',
        category: 'lunch',
        type: 'veg',
        price: '₹250 – ₹270',
        sections: [
            { title: '🍬 Sweets', items: ['Ghee Mysore Pak', 'Special Payasam'] },
            { title: '🥘 Starter', items: ['Masala Vada / Keerai Vada'] },
            { title: '🍚 Rice', items: ['Vegetable Pulao / Vegetable Kuska', 'Plain White Rice'] },
            { title: '🥗 Accompaniment', items: ['Onion Raitha'] },
            { title: '🥣 Gravies', items: ['Vegetable Sambar', 'Vathal Kuzhambu', 'Paruppu Rasam', 'Buttermilk'] },
            { title: '🌱 Vegetables & Sides', items: ['Kootu', 'Varuval', 'Poriyal', 'Pickle', 'Appalam'] },
            { title: '🍨 Desserts', items: ['Ice Cream'] },
            { title: '🥤 Beverage', items: ['Drinking Water Bottle'] },
            { title: '🎁 Extras', items: ['Banana Leaf', 'Paper Roll', 'Service Boys'] }
        ]
    },
    'Lunch Menu - Non-Veg: Menu 1': {
        mainTitle: 'Lunch Menu - Non-Veg',
        subtitle: 'Menu 1: Signature Chicken Biryani Feast',
        image: 'images/menu-1.png',
        category: 'lunch',
        type: 'non-veg',
        price: '₹230 – ₹250',
        sections: [
            { title: '🍚 Signature Rice Special', items: ['Classic Chicken Biryani'] },
            { title: '🥗 Accompaniments', items: ['Onion Raita', 'Traditional Brinjal Pachadi'] },
            { title: '🍗 Starters', items: ['Chicken 65'] },
            { title: '🍬 Sweet & Dessert', items: ['Bread Halwa', 'Ice Cream'] },
            { title: '🎁 Premium Service & Arrangements', items: ['Banana Leaf Service', 'Paper roll', 'Drinking Water Bottle', 'Service Boys'] }
        ]
    },
    'Lunch Menu - Non-Veg: Menu 2': {
        mainTitle: 'Lunch Menu - Non-Veg',
        subtitle: 'Menu 2: Signature Mutton Biryani Feast',
        image: 'images/nizam_mutton_biryani.png',
        category: 'lunch',
        type: 'non-veg',
        price: '₹350 – ₹370',
        sections: [
            { title: '🍚 Signature Rice Special', items: ['Classic Mutton Biryani'] },
            { title: '🥗 Accompaniments', items: ['Onion Raita', 'Traditional Brinjal Pachadi'] },
            { title: '🍗 Starters', items: ['Chicken 65'] },
            { title: '🍬 Sweet & Dessert', items: ['Bread Halwa', 'Ice Cream'] },
            { title: '🎁 Premium Service & Arrangements', items: ['Banana Leaf Service', 'Paper roll', 'Drinking Water Bottle', 'Service Boys'] }
        ]
    },
    'Dinner Menu - Veg: Menu 1': {
        mainTitle: 'Dinner Menu - Veg',
        subtitle: 'Menu 1: Classic Selection',
        image: 'images/dinner-1.png',
        category: 'dinner',
        type: 'veg',
        price: '₹220 – ₹250',
        sections: [
            { title: '🍬 Sweet / Dessert', items: ['Gulab Jamun', 'Ice Cream (Scoop)'] },
            { title: '🥘 Starters', items: ['Cutlet / Vegetable Roll'] },
            { title: '🍽️ Main Course', items: ['Vegetable Biryani', 'Plain White Rice', 'Chapati / Romali Roti', 'Channa Masala or Paneer Butter Masala'] },
            { title: '🥣 Gravies & Soups', items: ['Sambar', 'Rasam', 'Buttermilk', 'Vathal Kuzhambu', 'Soup'] },
            { title: '🥗 Accompaniments', items: ['Onion Raita', 'Poriyal', 'Varuval', 'Pickle', 'Appalam'] },
            { title: '🥤 Beverage', items: ['Welcome Coffee', 'Drinking Water Bottle'] },
            { title: '🎁 Extras', items: ['Banana leaf', 'Paper Roll', 'Service Boys'] }
        ]
    },
    'Dinner Menu - Veg: Menu 2': {
        mainTitle: 'Dinner Menu - Veg',
        subtitle: 'Menu 2: Special Feast',
        image: 'images/dinner-2.png',
        category: 'dinner',
        type: 'veg',
        price: '₹250 – ₹290',
        sections: [
            { title: '🍬 Sweets & Desserts', items: ['Sweet Kaju Katli', 'Dry Jamun / Malai Sandwich', 'Ice Cream'] },
            { title: '🥘 Starters', items: ['Vegetable Cutlet / Gobi 65'] },
            { title: '🥖 Indian Breads', items: ['Chapati / Romali Roti'] },
            { title: '🍛 Main Course (Gravyes)', items: ['Mushroom Masala / Paneer Butter Masala'] },
            { title: '🍜 Indo-Chinese / Fast Food', items: ['Noodles'] },
            { title: '🍚 Rice Varieties', items: ['Vegetable Biryani / Fried Rice', 'Sambar Rice', 'Curd Rice', 'Plain White Rice'] },
            { title: '🥗 Accompaniments', items: ['Onion Raita', 'Vathal Kuzhambu', 'Tomato Rasam / Pineapple Rasam', 'Mango Pickle', 'Neet Appalam'] },
            { title: '🥦 Vegetable Side Dishes', items: ['Carrot Kootu / Cabbage Poriyal', 'Potato Varuval', 'Brinjal Fry / Yam Roast'] },
            { title: '🥤 Beverage', items: ['Welcome Juice', 'Drinking Water Bottle'] },
            { title: '🎁 Extras', items: ['Banana leaf', 'Paper Roll', 'Service Boys'] }
        ]
    },
    'Dinner Menu - Veg: Menu 3': {
        mainTitle: 'Dinner Menu - Veg',
        subtitle: 'Menu 3: Royal Banquet',
        image: 'images/dinner-3.png',
        category: 'dinner',
        type: 'veg',
        price: '₹300 – ₹350',
        sections: [
            { title: '🍬 Sweets & Desserts', items: ['Almond Halwa', 'Dry Jamun', 'Ice Cream (Abu Katta)', 'Sweet Beeda'] },
            { title: '🥘 Starters', items: ['Cheese Corn Nuggets / Veg Fried Momos', 'Sweet Corn Soup', 'Potato Chips'] },
            { title: '🥖 Indian Breads', items: ['Fulka / Romali roti'] },
            { title: '🍛 Main Course - Gravies', items: ['Paneer Butter Masala / Vegetable Masala'] },
            { title: '🍲 Special Items', items: ['Mini Idli Sambar'] },
            { title: '🍚 Rice Varieties', items: ['Soya Biryani / Mushroom Biryani', 'Sambar Rice', 'Plain White Rice', 'Curd Rice'] },
            { title: '🥣 Rasam Varities', items: ['Tomato Rasam / Pineapple Rasam'] },
            { title: '🥗 Vegetable Side Dishes', items: ['Onion Raitha', 'Potato Varuval', 'Cabbage Poriyal', 'Neet Appalam', 'Mango Pickle'] },
            { title: '🥤 Beverages & Extras', items: ['Welcome Juice', 'Drinking Water Bottle', 'Banana leaf', 'Paper Roll', 'Service Boys'] }
        ]
    },
    'Dinner Menu - Veg: Menu 4': {
        mainTitle: 'Dinner Menu - Veg',
        subtitle: 'Menu 4: Dinner Exclusive',
        image: 'images/dinner-4.png',
        category: 'dinner',
        type: 'veg',
        price: '₹370 – ₹420',
        sections: [
            { title: '🍬 Sweets & Desserts', items: ['Almond Halwa', 'Pistachio Roll', 'Elaneer Payasam', 'Ice Cream (Abukatta / Scoop)', 'Fresh Fruits (3 Types)', 'Sweet Beeda'] },
            { title: '🥘 Starters / Snacks', items: ['Cheese Corn Nuggets / Spring Rolls', 'Potato Chips'] },
            { title: '🥖 Breads & Breakfast Items', items: ['Chapthi / Rumali Roti', 'Mini Idli / Plate Idli', 'Uttapam', 'Idiyappam'] },
            { title: '🍛 Main Course - Gravies', items: ['Vegetable Paya / Kadai Paneer Masala', 'Tiffin Sambar', 'Spicy Chutney / Mint Chutney', 'Vada Curry'] },
            { title: '🍚 Rice Varieties', items: ['Hyderabadi Dum Biryani / Vegetable Pulao', 'Rasam Sadam', 'Curd Rice'] },
            { title: '🍲 Soups', items: ['Vegetable Soup / Mushroom Soup'] },
            { title: '🥗 Accompaniments', items: ['Onion Raitha', 'Moore Chilli', 'Mango Pickle', 'Vegetable Salad'] },
            { title: '🥦 Vegetable Side Dishes', items: ['National Poriyal', 'Black Chenna Potato Varuval'] },
            { title: '🥤 Extras', items: ['Welcome Juice', 'Tea / Coffee', 'Drinking Water Bottle', 'Banana leaf', 'Paper Roll', 'Service Boys'] }
        ]
    },
    'Dinner Menu - Veg: Menu 5': {
        mainTitle: 'Dinner Menu - Veg',
        subtitle: 'Menu 5: Grand Banquet',
        image: 'images/dinner-5.png',
        category: 'dinner',
        type: 'veg',
        price: '₹500 – ₹550',
        sections: [
            { title: '🍬 Sweets & Desserts', items: ['Rasmalai / Malai Roll', 'Lychee Sweet', 'Ilaneer Payasam / Paruppu Payasam', 'Mini Gulab Jamun', 'Ice Cream (Abujota / Scoop)', 'Fresh Fruits (4 Types)', 'Sweet Beeda'] },
            { title: '🥘 Starters', items: ['Soya 65 / Baby Corn Fry', 'Paneer Tikka'] },
            { title: '🥖 Indian Breads', items: ['Parrota', 'Idyappam'] },
            { title: '🍛 Main Course - Gravies', items: ['Mushroom Pepper Gravy', 'Vegetable Stew'] },
            { title: '🍚 Rice Varieties', items: ['Vegetable Mutton Biryani / Vegetable Chicken Biryani', 'Bisibelabath', 'Plain White Rice', 'Bagalabath'] },
            { title: '🍲 Soups', items: ['Vegetable Liver Soup'] },
            { title: '🥗 Vegetable Specialties', items: ['Chettinad Vegetable Fish Curry'] },
            { title: '🥗 Sides', items: ['Onion Raitha', 'Neet Appalam', 'Mango Pickle', 'Vegetable Salad'] },
            { title: '🥤 Extras', items: ['Welcome Snacks (Bonda, Coconut chutney, kesari)', 'Welcome Juice / Coffee', 'Popcorn and Cotton Candy', 'Drinking Water Bottle', 'Banana leaf', 'Paper Roll', 'Service Boys'] }
        ]
    },
    'Dinner Menu - Non-Veg: Menu 1': {
        mainTitle: 'Dinner Menu - Non-Veg',
        subtitle: 'Menu 1: Signature Chicken Biryani Feast',
        image: 'images/menu-3.png',
        category: 'dinner',
        type: 'non-veg',
        price: '₹230 – ₹250',
        sections: [
            { title: '🍚 Signature Rice Special', items: ['Classic Chicken Biryani'] },
            { title: '🥗 Accompaniments', items: ['Onion Raita', 'Traditional Brinjal Pachadi'] },
            { title: '🍗 Starters', items: ['Chicken 65'] },
            { title: '🍬 Sweet & Dessert', items: ['Bread Halwa', 'Ice Cream'] },
            { title: '🎁 Premium Service & Arrangements', items: ['Banana Leaf Service', 'Paper roll', 'Drinking Water Bottle', 'Service Boys'] }
        ]
    },
    'Dinner Menu - Non-Veg: Menu 2': {
        mainTitle: 'Dinner Menu - Non-Veg',
        subtitle: 'Menu 2: Signature Mutton Biryani Feast',
        image: 'images/nizam_mutton_biryani.png',
        category: 'dinner',
        type: 'non-veg',
        price: '₹350 – ₹370',
        sections: [
            { title: '🍚 Signature Rice Special', items: ['Classic Mutton Biryani'] },
            { title: '🥗 Accompaniments', items: ['Onion Raita', 'Traditional Brinjal Pachadi'] },
            { title: '🍗 Starters', items: ['Chicken 65'] },
            { title: '🍬 Sweet & Dessert', items: ['Bread Halwa', 'Ice Cream'] },
            { title: '🎁 Premium Service & Arrangements', items: ['Banana Leaf Service', 'Paper roll', 'Drinking Water Bottle', 'Service Boys'] }
        ]
    },
    'Baby Shower Menu - Veg: Menu 1': {
        mainTitle: 'Baby Shower Menu - Veg',
        subtitle: 'Menu 1: Festive Selection',
        image: 'images/baby-shower-1.png',
        category: 'baby_shower',
        type: 'veg',
        price: '₹250 – ₹270',
        sections: [
            { title: '🍬 Sweets & Desserts', items: ['Gulab Jamun', 'Malai Sandwich'] },
            { title: '🥘 Starters / Snacks', items: ['Thayir Vada'] },
            { title: '🍚 Rice Varieties (Pick Any Five Rice Varieties)', items: ['Mango Rice', 'Coconut Rice', 'Tamarind Rice', 'Curd Rice', 'Curry Leaf Rice', 'Mint Rice', 'Coriander Rice', 'Lemon Rice', 'Vegetable Biryani', 'Plain White Rice (Mandatory: pick any 5 varieties except White rice)'] },
            { title: '🥣 Gravies & Accompaniments', items: ['Sambar', 'Vathal Kuzhambu', 'Rasam'] },
            { title: '🥦 Vegetables & Sides', items: ['Vegetable Varuval', 'Poriyal', 'Appalam', 'Pickle'] },
            { title: '🥤 Beverages & Extras', items: ['Drinking Water Bottle', 'Banana Leaf', 'Paper Roll', 'Service Boys'] }
        ]
    }
};

const packageMap = {
    'Tiffin Menu - Veg: Menu 1': 'tiffin_veg_1',
    'Tiffin Menu - Veg: Menu 2': 'tiffin_veg_2',
    'Tiffin Menu - Veg: Menu 3': 'tiffin_veg_3',
    'Lunch Menu - Veg: Menu 1': 'lunch_veg_1',
    'Lunch Menu - Veg: Menu 2': 'lunch_veg_2',
    'Lunch Menu - Veg: Menu 3': 'lunch_veg_3',
    'Lunch Menu - Non-Veg: Menu 1': 'lunch_non_veg_1',
    'Lunch Menu - Non-Veg: Menu 2': 'lunch_non_veg_2',
    'Dinner Menu - Veg: Menu 1': 'dinner_veg_1',
    'Dinner Menu - Veg: Menu 2': 'dinner_veg_2',
    'Dinner Menu - Veg: Menu 3': 'dinner_veg_3',
    'Dinner Menu - Veg: Menu 4': 'dinner_veg_4',
    'Dinner Menu - Veg: Menu 5': 'dinner_veg_5',
    'Dinner Menu - Non-Veg: Menu 1': 'dinner_non_veg_1',
    'Dinner Menu - Non-Veg: Menu 2': 'dinner_non_veg_2',
    'Baby Shower Menu - Veg: Menu 1': 'baby_shower_veg_1'
};

const highlightedMenus = [
    {
        title: 'Royal Dinner Banquet',
        tag: '🏆 Most Chosen',
        description: 'Our most sought-after royal dinner experience with multi-course delicacies.',
        startingPrice: '300',
        menuId: 'Dinner Menu - Veg: Menu 3'
    },
    {
        title: 'Deluxe Mutton Feast',
        tag: '⭐ Most Popular',
        description: 'Authentic Mutton Biryani prepared with traditional spices and premium ingredients.',
        startingPrice: '350',
        menuId: 'Dinner Menu - Non-Veg: Menu 2'
    },
    {
        title: 'Grand Dinner Banquet',
        tag: '👑 Premium',
        description: 'The ultimate culinary masterpiece for elite celebrations and grand royal weddings.',
        startingPrice: '500',
        menuId: 'Dinner Menu - Veg: Menu 5'
    }
];
