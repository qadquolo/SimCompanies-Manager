
//
console.log('variables.js loaded')
const runtimeID = chrome.runtime.id

//console.log(['abc', 'env'].join('/'))
let csrftoken
let panel = {
        prcInspector: 'price-settings-panel',
        buildBusy: 'build-busy-panel',
        exchange: 'exchange-panel'
}

let _style = {
        buyBtn: '',
        busyWares: 'position: static;z-index: 10;margin-bottom: 0;margin-left: 1rem;',
        busyDropdownGrp: 'display: flex;flex-direction: row;position: relative;',
        busyProdBtn: 'padding: 4px 6px; max-width:8rem',
        toggleBtn: 'display: flex; padding: 0px; min-width: 8rem; max-width: 8rem; align-content: center; flex-wrap: wrap; border-color: rgb(90, 90, 90);background-color: rgb(34 34 34);height: 45px;',
        customExchangeBtn: "display: flex; position: relative;-webkit-box-pack: center;justify-content: center;-webkit-box-align: center;align-items: center;line-height: 1.3;color: rgb(153, 153, 153);background-color: transparent;width: 150px;cursor: pointer;",
        div: '',
        exchPanel: "display: inline-flex;position: relative;justify-self: flex-end;flex-direction: column;justify-content: flex-start;align-items: center;background: rgb(34, 34, 34);z-index: 5;padding-top: 15px;height: 100%;width: -webkit-fill-available;max-width: min-content;",
        input: 'margin-inline: 5px;',
        img: 'width: 40px;',
        label: '',
        mCustomLabels: 'flex-direction: row;display: flex;justify-content: space-evenly;min-width: -webkit-fill-available;',
        mItem: "position: inline-flex; background: rgb(51, 51, 51);padding-bottom: 5px;padding-top: 5px;display: inline-flex; margin-right: 2px; margin-bottom: 2px; position: relative;text-decoration: none;overflow: visible;width: -webkit-fill-available;",
        mitemcb: "position: absolute; width: 24px;",
        prcInspector: 'display: flex;align-items: center;',
        prcInspectorSettings:     'width: 2.5rem;height: 32px;',
        qtyBtn: 'padding: 0px;min-width: fit-content;width: 2rem;display: flex;align-content: center;flex-wrap: wrap;border-color: rgb(90, 90, 90);',
        intervalBtn: 'padding: 0px;min-width: fit-content;width: 2rem;height:3rem;display: flex;align-content: center;flex-wrap: wrap;border-color: rgb(90, 90, 90);margin-left:.5rem;color: rgb(242, 242, 242)',
        qtyUL: '',
        qtyOption: '',
        qtyLink: '',
}

let sources = {
        sim_boost: 'https://www.simcompanies.com/static/images/sim-boosts2.png',

}

let resID = {
        Power: { id: 1, ch: 2566, wh: 477 },
        Water: { id: 2, ch: 1626, wh: 402 },
        Apples: { id: 3, ch: 208.44, wh: 119 },
        Oranges: { id: 4, ch: 186.01, wh: 119 },
        Grapes: { id: 5, ch: 166.75, wh: 119 },
        Grain: { id: 6, ch: 833.77, wh: 119 },
        Steak: { id: 7, ch: 25.67, wh: 477 },
        Sausages: { id: 8, ch: 77, wh: 477 },
        Eggs: { id: 9, ch: 316, wh: 156 },
        'Crude oil': { id: 10, ch: 41.5, wh: 596 },
        Petrol: { id: 11, ch: 111, wh: 555 },
        Diesel: { id: 12, ch: 115, wh: 555 },
        Transport: { id: 13, ch: 3173, wh: 327 },
        Minerals: { id: 14, ch: 119, wh: 318 },
        Bauxite: { id: 15, ch: 96, wh: 318 },
        Silicon: { id: 16, ch: 154.02, wh: 477 },
        Chemicals: { id: 17, ch: 213.91, wh: 477 },
        Aluminium: { id: 18, ch: 106.61, wh: 477 },
        Plastic: { id: 19, ch: 204, wh: 555 },
        Processors: { id: 20, ch: 9.18, wh: 437 },
        'Electronic components': { id: 21, ch: 41.33, wh: 437 },
        Batteries: { id: 22, ch: 25.26, wh: 437 },
        Displays: { id: 23, ch: 32.14, wh: 437 },
        'Smart phones': { id: 24, ch: 11.48, wh: 437 },
        Tablets: { id: 25, ch: 11.48, wh: 437 },
        Laptops: { id: 26, ch: 9.18, wh: 437 },
        Monitors: { id: 27, ch: 18.37, wh: 437 },
        Televisions: { id: 28, ch: 18.16, wh: 437 },
        'Plant research': { id: 29, ch: 4.78, wh: 516 },
        'Energy research': { id: 30, ch: 3.3, wh: 676 },
        'Mining research': { id: 31, ch: 3, wh: 676 },
        'Electronics research': { id: 32, ch: 2.4, wh: 676 },
        'Breeding research': { id: 33, ch: 3.85, wh: 477 },
        'Chemistry research': { id: 34, ch: 4.71, wh: 477 },
        Software: { id: 35, ch: 5.71, wh: 675 },
        Cotton: { id: 40, ch: 266.81, wh: 119 },
        Fabric: { id: 41, ch: 241.12, wh: 157 },
        'Iron ore': { id: 42, ch: 181, wh: 318 },
        Steel: { id: 43, ch: 192.52, wh: 477 },
        Sand: { id: 44, ch: 1419, wh: 313 },
        Glass: { id: 45, ch: 128.35, wh: 477 },
        Leather: { id: 46, ch: 30.14, wh: 156 },
        'On-board computer': { id: 47, ch: 13.78, wh: 437 },
        'Electric motor': { id: 48, ch: 30.78, wh: 715 },
        'Luxury car interior': { id: 49, ch: 19.93, wh: 516 },
        'Basic interior': { id: 50, ch: 27.74, wh: 516 },
        'Car body': { id: 51, ch: 23.92, wh: 516 },
        'Combustion engine': { id: 52, ch: 5.6, wh: 715 },
        'Economy e-car': { id: 53, ch: 17.14, wh: 516 },
        'Luxury e-car': { id: 54, ch: 3.99, wh: 516 },
        'Economy car': { id: 55, ch: 13.95, wh: 516 },
        'Luxury car': { id: 56, ch: 1.99, wh: 516 },
        Truck: { id: 57, ch: 4.78, wh: 516 },
        'Automotive research': { id: 58, ch: 4.19, wh: 636 },
        'Fashion research': { id: 59, ch: 6.78, wh: 517 },
        Underwear: { id: 60, ch: 165, wh: 157 },
        Gloves: { id: 61, ch: 143, wh: 157 },
        Dress: { id: 62, ch: 150, wh: 157 },
        'Stiletto heel': { id: 63, ch: 98, wh: 157 },
        Handbags: { id: 64, ch: 67, wh: 157 },
        Sneakers: { id: 65, ch: 173, wh: 157 },
        Seeds: { id: 66, ch: 917.14, wh: 119 },
        'Xmas crackers': { id: 67, ch: 222.47, wh: 477 },
        'Gold ore': { id: 68, ch: 56, wh: 318 },
        'Golden bars': { id: 69, ch: 29.95, wh: 477 },
        'Luxury watch': { id: 70, ch: 18.84, wh: 157 },
        Necklace: { id: 71, ch: 41.44, wh: 157 },
        Sugarcane: { id: 72, ch: 580.3, wh: 119 },
        Ethanol: { id: 73, ch: 60.94, wh: 278 },
        Methane: { id: 74, ch: 55.3, wh: 596 },
        'Carbon fibers': { id: 75, ch: 245, wh: 555 },
        'Carbon composite': { id: 76, ch: 68.45, wh: 477 },
        Fuselage: { id: 77, ch: 3.3, wh: 675 },
        Wing: { id: 78, ch: 8.11, wh: 675 },
        'High grade e-comps': { id: 79, ch: 1.84, wh: 437 },
        'Flight computer': { id: 80, ch: 2.26, wh: 833 },
        Cockpit: { id: 81, ch: 2.26, wh: 833 },
        'Attitude control': { id: 82, ch: 2.72, wh: 833 },
        'Rocket fuel': { id: 83, ch: 78, wh: 555 },
        'Propellant tank': { id: 84, ch: 4.51, wh: 675 },
        'Solid fuel booster': { id: 85, ch: 0.28, wh: 715 },
        'Rocket engine': { id: 86, ch: 0.28, wh: 715 },
        'Heat shield': { id: 87, ch: 12.01, wh: 675 },
        'Ion drive': { id: 88, ch: 0.56, wh: 715 },
        'Jet engine': { id: 89, ch: 0.84, wh: 715 },
        'Sub-orbital 2nd stage': { id: 90, ch: 3, wh: 675 },
        'Sub-orbital rocket': { id: 91, ch: 0.63, wh: 885 },
        'Orbital booster': { id: 92, ch: 1.5, wh: 675 },
        Starship: { id: 93, ch: 0.3, wh: 675 },
        BFR: { id: 94, ch: 0.21, wh: 885 },
        'Jumbo jet': { id: 95, ch: 0.06, wh: 938 },
        'Luxury jet': { id: 96, ch: 0.17, wh: 938 },
        'Single engine plane': { id: 97, ch: 1.48, wh: 938 },
        Quadcopter: { id: 98, ch: 12.45, wh: 833 },
        Satellite: { id: 99, ch: 0.11, wh: 833 },
        'Aerospace research': { id: 100, ch: 0, wh: 518 },
        'Reinforced concrete': { id: 101, ch: 212.74, wh: 436 },
        Bricks: { id: 102, ch: 367.35, wh: 436 },
        Cement: { id: 103, ch: 298.47, wh: 436 },
        Clay: { id: 104, ch: 1078, wh: 313 },
        Limestone: { id: 105, ch: 794, wh: 313 },
        Wood: { id: 106, ch: 90.3, wh: 119 },
        'Steel beams': { id: 107, ch: 129.98, wh: 556 },
        Planks: { id: 108, ch: 115.13, wh: 556 },
        Windows: { id: 109, ch: 14.54, wh: 556 },
        Tools: { id: 110, ch: 26, wh: 556 },
        'Construction units': { id: 111, ch: 0.99, wh: 399 },
        Bulldozer: { id: 112, ch: 6.31, wh: 516 },
        'Materials research': { id: 113, ch: 3.42, wh: 477 },
        Robots: { id: 114, ch: 2.3, wh: 437 },
        Cows: { id: 115, ch: 37.68, wh: 156 },
        Pigs: { id: 116, ch: 82.8, wh: 156 },
        Milk: { id: 117, ch: 120.5, wh: 156 },
        'Coffee beans': { id: 118, ch: 425.22, wh: 119 },
        'Coffee powder': { id: 119, ch: 23, wh: 437 },
        Vegetables: { id: 120, ch: 314.2, wh: 119 },
        Bread: { id: 121, ch: 11.96, wh: 517 },
        Cheese: { id: 122, ch: 5.51, wh: 437 },
        'Apple pie': { id: 123, ch: 5.98, wh: 517 },
        'Orange juice': { id: 124, ch: 91.41, wh: 278 },
        'Apple cider': { id: 125, ch: 36.56, wh: 278 },
        'Ginger beer': { id: 126, ch: 73.13, wh: 278 },
        'Frozen pizza': { id: 127, ch: 9.18, wh: 437 },
        Pasta: { id: 128, ch: 18.37, wh: 437 },
        Hamburger: { id: 129, ch: 0.52, wh: 758 },
        Lasagna: { id: 130, ch: 1.56, wh: 758 },
        'Meat balls': { id: 131, ch: 1.04, wh: 758 },
        Cocktails: { id: 132, ch: 0.52, wh: 758 },
        Flour: { id: 133, ch: 87.25, wh: 437 },
        Butter: { id: 134, ch: 13.78, wh: 437 },
        Sugar: { id: 135, ch: 41.33, wh: 437 },
        Cocoa: { id: 136, ch: 169.84, wh: 119 },
        Dough: { id: 137, ch: 11.96, wh: 517 },
        Sauce: { id: 138, ch: 0.78, wh: 758 },
        Fodder: { id: 139, ch: 284, wh: 437 },
        Chocolate: { id: 140, ch: 3.21, wh: 437 },
        'Vegetable oil': { id: 141, ch: 36.74, wh: 437 },
        Salad: { id: 142, ch: 2.09, wh: 758 },
        Samosa: { id: 143, ch: 1.83, wh: 758 },
        'Xmas ornament': { id: 144, ch: 179.69, wh: 477 },
        Recipes: { id: 145, ch: 3.81, wh: 595 },
        Pumpkin: { id: 146, ch: 137.49, wh: 119 },
        "Jack o'lantern": { id: 147, ch: 284.7, wh: 437 },
        'Witch costume': { id: 148, ch: 120, wh: 157 },
        'Pumpkin soup': { id: 149, ch: 2.09, wh: 758 },
        Tree: { id: 150, ch: 0, wh: 91 },
        'Easter bunny': { id: 151, ch: 3.67, wh: 437 },
        'Ramadan sweets': { id: 152, ch: 5.05, wh: 437 }
      }
    let resType = {
        Agriculture: ["Seeds","Apples","Oranges","Grapes","Grain","Sugarcane", "Cotton","Cows","Pigs", "Coffee beans","Cocoa", "Vegetables", "Fodder"],
        Food: [ "Dough","Sauce","Steak", "Sausages",  "Eggs", "Milk", "Coffee powder", "Flour","Bread","Apple pie","Orange juice","Apple cider", "Ginger beer",
          "Frozen pizza","Pasta","Butter", "Cheese", "Chocolate","Sugar","Hamburger","Lasagna", "Meat balls","Cocktails", "Vegetable oil", "Salad","Samosa","Pumpkin soup" ],
        Construction:[
            "Wood",
            "Reinforced concrete",
            "Bricks",
            "Cement",
            "Clay",
            "Limestone",
            "Steel beams",
            "Planks",
            "Windows",
            "Tools",
            "Construction units"
        ],
       Fashion:[
            "Fabric",
            "Leather",
            "Underwear",
            "Gloves",
            "Dress",
            "Stiletto Heel",
            "Handbags",
            "Sneakers",
            "Luxury watch",
            "Necklace"
        ],
       Energy:[
            "Crude oil",
            "Petrol",
            "Diesel",
            "Power",
            "Ethanol",
            "Methane",
            "Rocket fuel"
        ],
        Electronics:[
            "Processors",
            "Electronic components",
            "Batteries",
            "Displays",
            "Smart phones",
            "Tablets",
            "Laptops",
            "Monitors",
            "Televisions",
            "High grade e-comps",
            "Quadcopter",
            "Robots"
        ],
        Automotive: [
              "On-board computer",
              "Electric motor",
              "Luxury car interior",
              "Basic interior",
              "Car body",
              "Combustion engine",
              "Economy e-car",
              "Luxury e-car",
              "Economy car",
              "Luxury car",
              "Truck",
              "Bulldozer"
          ],
        Aerospace:[
              "Fuselage",
              "Wing",
              "Flight computer",
              "Cockpit",
              "Attitude control",
              "Propellant tank",
              "Solid fuel booster",
              "Rocket engine",
              "Heat shield",
              "Ion drive",
              "Jet engine",
              "Sub-orbital 2nd stage",
              "Sub-orbital rocket",
              "Orbital booster",
              "Starship",
              "BFR",
              "Jumbo jet",
              "Luxury jet",
              "Single engine plane",
              "Satellite"
          ],
        Resources:[
              "Water",
              "Transport",
              "Minerals",
              "Bauxite",
              "Silicon",
              "Chemicals",
              "Aluminium",
              "Plastic",
              "Iron ore",
              "Steel",
              "Sand",
              "Glass",
              "Gold ore",
              "Golden bars",
              "Carbon fibers",
              "Carbon composite"
          ],
          Seasonal: [
              "Pumpkin",
              "Xmas crackers",
              "Xmas ornament",
              "Jack o'lantern",
              "Witch costume",
              "Tree",
              "Easter Bunny",
              "Ramadan sweets"
          ],
          Research: [
                "Plant research",
                "Energy research",
                "Mining research",
                "Electronics research",
                "Breeding research",
                "Chemistry research",
                "Software",
                "Automotive research",
                "Fashion research",
                "Aerospace research",
                "Materials research",
                "Recipes"
            ]
    }

let busy_items = {
        Slaughterhouse: ['Steak', 'Sausages'], // 477
        Mill: ['Coffee powder', 'Flour', 'Fodder'], // 437
        Bakery: ['Bread', 'Apple pie', 'Dough'], // 517
        Restaurant: ['Milk','Bread','Butter','Cheese','Coffee powder','Apple pie','Hamburger','Lasagna','Meat balls', 
                     'Salad', 'Samosa','Cocktails','Orange juice','Apple cider','Ginger beer','Pumpkin soup'],
        Catering: ['Hamburger', 'Lasagna', 'Meat balls', 'Cocktails', 'Sauce','Salad','Samosa', 'Pumpkin soup'], // 758
        "Food processing plant": ['Cheese','Frozen pizza', 'Pasta', 'Butter', 'Sugar', 'Chocolate', 'Vegetable oil', 'Easter bunny'], //437
        "Grocery store": ['Apples', 'Oranges', 'Grapes','Steak','Sausages','Eggs','Coffee powder','Apple pie','Orange juice', 
                        'Apple cider','Ginger beer','Cheese','Frozen pizza','Chocolate','Easter bunny' ],
        Ranch: ['Eggs', 'Leather', 'Cows', 'Pigs', 'Milk'], // 156
        "Beverage factory": ['Ethanol','Orange juice','Apple cider','Ginger beer'], // 278
               
        "Hardware store": ['Bricks','Cement','Planks','Windows','Tools'],     
        "General contractor": ['Construction units'], // 399
        "Concrete plant": ['Reinforced concrete','Bricks','Cement'], // 436
        "Construction factory": ['Steel beams','Planks','Windows','Tools'], // 556
        Farm: ['Apples','Oranges','Grapes','Grain','Cotton','Seeds','Sugarcane','Wood','Coffee beans','Vegetables','Cocoa','Pumpkin'], //119 w/h
        Quarry: ['Sand','Clay','Limestone'], // 318

        "Fashion store": ['Underwear','Gloves','Dress','Stiletto heel','Handbags','Sneakers','Luxury watch','Necklace'], 
        "Fashion factory": ['Fabric','Underwear','Gloves','Dress','Stiletto heel','Handbags','Sneakers','Luxury watch','Necklace','Witch costume'], // 157

        "Gas station":['Petrol','Diesel'],
        "Power plant":['Power'], // 477
        "Oil rig":['Crude oil', 'Methane'],  // 596    
        "Refinery":['Petrol','Diesel','Plastic','Carbon fibers','Rocket fuel'], // 555

        "Aerospace electronics":['Flight computer','Cockpit','Attitude control','Quadcopter','Satellite'], // 833
        "Electronics factory":['Processors','Electronic components','Batteries','Displays','Smart phones','Tablets','Laptops','Monitors','Televisions', // 437
                                'On-board computer', 'High grade e-comps','Robots',"Jack o'lantern"],
        "Electronics store":['Smart phones','Tablets','Laptops','Monitors','Televisions','Quadcopter'],

        "Car factory":['Luxury car interior', 'Basic interior','Car body','Economy e-car','Luxury e-car','Economy car','Luxury car','Truck','Bulldozer'], // 516
        "Propulsion factory":['Electric motor','Combustion engine','Solid fuel booster','Rocket engine', 'Ion drive','Jet engine'], // 715
        "Car dealership":['Economy e-car','Luxury e-car','Economy car','Luxury car','Truck'],        

        "Aerospace factory":['Fuselage','Wing','Propellant tank','Heat shield','Sub-orbital 2nd stage','Orbital booster','Starship'],  // 675
        "Vertical integration facility":['Sub-orbital rocket', 'BFR'], // 885
        Hangar:['Jumbo jet','Luxury jet','Single engine plane'], // 938
        "Sales offices":['Sub-orbital rocket', 'BFR','Jumbo jet','Luxury jet','Single engine plane','Satellite'], 

        Mine:['Minerals','Bauxite','Iron ore','Gold ore'], // 318
        "Shipping depot":['Transport'], //327
        "Water reservoir":['Water'], // 402
        Factory:['Silicon','Chemicals','Aluminium','Steel','Glass','Golden bars','Carbon composite','Xmas crackers','Xmas ornament'], // 477

        "Automotive R&D":['Automotive research'], // 636
        "Breeding laboratory":['Breeding research'], // 477
        "Chemistry laboratory":['Chemistry research', 'Materials research'], // 477
        "Fashion & Design":['Fashion research'],   // 517
        "Physics laboratory":["Mining research", 'Electronics research', 'Energy research'], //676
        "Launch pad":['Aerospace research'],   // 518
        "Plant research center":['Plant research'],  // 516
        Kitchen:['Recipes'],    // 595
        "Software R&D":['Software'],  // 675

        "Forest nursery":['Tree'], // 91
        "Xmas market": ['Xmas crackers','Xmas ornament', 'Tree'],
        "Halloween market":['Pumpkin',"Jack o'lantern",'Witch costume' ],
}



let _itemImages = {
        0: 'power', 1: '', 2: '', 3: 'apples', 4: 'oranges', 5: 'grapes', 6: 'grain', 7: 'steak', 8: 'sausages', 9: 'eggs',
        10: 'crude-oil', 11: 'petrol', 12: 'diesel', 13: '', 14: '', 15: '', 16: '', 17: '', 18: '', 19: '',
        20: '', 21: '', 22: '', 23: '', 24: '', 25: '', 26: '', 27: '', 28: '', 29: '',
        30: '', 31: '', 32: '', 33: '', 34: '', 35: '', 36: '', 37: '', 38: '', 39: '',
        40: 'cotton', 41: 'fabric', 42: '', 43: '', 44: '', 45: '', 46: 'leather', 47: '', 48: '', 49: '',
        50: '', 51: '', 52: '', 53: '', 54: '', 55: '', 56: '', 57: '', 58: '', 59: '',
        60: 'underwear', 61: 'gloves', 62: 'dress', 63: 'stiletto-heel', 64: 'handbags', 65: 'sneakers', 66: '', 67: '', 68: '', 69: '',
        70: 'luxury-watch', 71: 'necklace', 72: 'sugarcane', 73: 'ethanol', 74: 'methane', 75: '', 76: '', 77: '', 78: '', 79: '',
        80: '', 81: '', 82: '', 83: 'rocket-fuel', 84: '', 85: '', 86: '', 87: '', 88: '', 89: '',
        90: '', 91: '', 92: '', 93: '', 94: '', 95: '', 96: '', 97: '', 98: '', 99: '',
        100: '', 101: 'reinforced-concrete', 102: 'bricks', 103: 'cement', 104: 'clay', 105: 'limestone', 106: 'wood', 107: 'steel-beams', 108: 'planks', 109: 'windows',
        110: 'tools', 111: 'construction-units', 112: '', 113: '', 114: '', 115: 'cows', 116: 'pigs', 117: 'milk', 118: 'coffee-beans', 119: 'coffee-powder',
        120: 'vegetables', 121: 'bread', 122: 'cheese', 123: 'apple-pie', 124: 'orange-juice', 125: 'apple-cider', 126: 'ginger-beer', 127: 'frozen-pizza', 128: 'pasta', 129: 'hamburger',
        130: 'lasagna', 131: 'meat-balls', 132: 'cocktails', 133: 'flour', 134: 'butter', 135: 'sugar', 136: 'cocoa', 137: 'dough', 138: 'sauce', 139: 'fodder',
        140: 'chocolate', 141: 'vegetable-oil', 142: 'salad', 143: 'samosa', 144: '', 145: '', 146: '', 147: '', 148: '', 149: 'pumpkin-soup',
        150: '', 151: '', 152: '', 153: '', 154: '', 155: '', 156: '', 157: '', 158: '', 159: '',
        160: '', 161: '', 162: '', 163: '', 164: '', 165: '', 166: '', 167: '', 168: '', 169: '',
}

let itemImages = {
        "1": "https://www.simcompanies.com/static/images/resources/power.png",
        "2": "https://www.simcompanies.com/static/images/resources/water.png",
        "3": "https://www.simcompanies.com/static/images/resources/apples.png",
        "4": "https://www.simcompanies.com/static/images/resources/oranges.png",
        "5": "https://www.simcompanies.com/static/images/resources/grapes.png",
        "6": "https://www.simcompanies.com/static/images/resources/grain.png",
        "7": "https://www.simcompanies.com/static/images/resources/steak.png",
        "8": "https://www.simcompanies.com/static/images/resources/sausages.png",
        "9": "https://www.simcompanies.com/static/images/resources/eggs.png",
        "10": "https://www.simcompanies.com/static/images/resources/crude-oil.png",
        "11": "https://www.simcompanies.com/static/images/resources/petrol.png",
        "12": "https://www.simcompanies.com/static/images/resources/diesel.png",
        "13": "https://www.simcompanies.com/static/images/resources/transport.png",
        "14": "https://www.simcompanies.com/static/images/resources/minerals.png",
        "15": "https://www.simcompanies.com/static/images/resources/bauxite.png",
        "16": "https://www.simcompanies.com/static/images/resources/silicon.png",
        "17": "https://www.simcompanies.com/static/images/resources/chemicals.png",
        "18": "https://www.simcompanies.com/static/images/resources/aluminium.png",
        "19": "https://www.simcompanies.com/static/images/resources/plastic.png",
        "20": "https://www.simcompanies.com/static/images/resources/processors.png",
        "21": "https://www.simcompanies.com/static/images/resources/electronic-components.png",
        "22": "https://www.simcompanies.com/static/images/resources/batteries.png",
        "23": "https://www.simcompanies.com/static/images/resources/displays.png",
        "24": "https://www.simcompanies.com/static/images/resources/smart-phones.png",
        "25": "https://www.simcompanies.com/static/images/resources/tablets.png",
        "26": "https://www.simcompanies.com/static/images/resources/laptops.png",
        "27": "https://www.simcompanies.com/static/images/resources/monitors.png",
        "28": "https://www.simcompanies.com/static/images/resources/televisions.png",
        "29": "https://www.simcompanies.com/static/images/resources/plant-research.png",
        "30": "https://www.simcompanies.com/static/images/resources/energy-research.png",
        "31": "https://www.simcompanies.com/static/images/resources/mining-research.png",
        "32": "https://www.simcompanies.com/static/images/resources/electronics-research.png",
        "33": "https://www.simcompanies.com/static/images/resources/breeding-research.png",
        "34": "https://www.simcompanies.com/static/images/resources/chemistry-research.png",
        "35": "https://www.simcompanies.com/static/images/resources/software.png",
        "40": "https://www.simcompanies.com/static/images/resources/cotton.png",
        "41": "https://www.simcompanies.com/static/images/resources/fabric.png",
        "42": "https://www.simcompanies.com/static/images/resources/iron-ore.png",
        "43": "https://www.simcompanies.com/static/images/resources/steel.png",
        "44": "https://www.simcompanies.com/static/images/resources/sand.png",
        "45": "https://www.simcompanies.com/static/images/resources/glass.png",
        "46": "https://www.simcompanies.com/static/images/resources/leather.png",
        "47": "https://www.simcompanies.com/static/images/resources/on-board-computer.png",
        "48": "https://www.simcompanies.com/static/images/resources/electric-motor.png",
        "49": "https://www.simcompanies.com/static/images/resources/luxury-car-interior.png",
        "50": "https://www.simcompanies.com/static/images/resources/car-interior.png",
        "51": "https://www.simcompanies.com/static/images/resources/car-body.png",
        "52": "https://www.simcompanies.com/static/images/resources/combustion-engine.png",
        "53": "https://www.simcompanies.com/static/images/resources/economy-e-car.png",
        "54": "https://www.simcompanies.com/static/images/resources/luxury-e-car.png",
        "55": "https://www.simcompanies.com/static/images/resources/economy-car.png",
        "56": "https://www.simcompanies.com/static/images/resources/luxury-car.png",
        "57": "https://www.simcompanies.com/static/images/resources/truck.png",
        "58": "https://www.simcompanies.com/static/images/resources/automotive-research.png",
        "59": "https://www.simcompanies.com/static/images/resources/fashion-research.png",
        "60": "https://www.simcompanies.com/static/images/resources/underwear.png",
        "61": "https://www.simcompanies.com/static/images/resources/gloves.png",
        "62": "https://www.simcompanies.com/static/images/resources/dress.png",
        "63": "https://www.simcompanies.com/static/images/resources/simmi-shoes.png",
        "64": "https://www.simcompanies.com/static/images/resources/handbags.png",
        "65": "https://www.simcompanies.com/static/images/resources/sneakers.png",
        "66": "https://www.simcompanies.com/static/images/resources/seeds.png",
        "67": "https://www.simcompanies.com/static/images/resources/xmas-crackers.png",
        "68": "https://www.simcompanies.com/static/images/resources/gold-ore.png",
        "69": "https://www.simcompanies.com/static/images/resources/golden-bars.png",
        "70": "https://www.simcompanies.com/static/images/resources/gold-watch.png",
        "71": "https://www.simcompanies.com/static/images/resources/necklace.png",
        "72": "https://www.simcompanies.com/static/images/resources/sugarcane.png",
        "73": "https://www.simcompanies.com/static/images/resources/ethanol.png",
        "74": "https://www.simcompanies.com/static/images/resources/methane.png",
        "75": "https://www.simcompanies.com/static/images/resources/carbon-fiber.png",
        "76": "https://www.simcompanies.com/static/images/resources/carbon-composite.png",
        "77": "https://www.simcompanies.com/static/images/resources/fuselage.png",
        "78": "https://www.simcompanies.com/static/images/resources/wing.png",
        "79": "https://www.simcompanies.com/static/images/resources/high-grade-e-components.png",
        "80": "https://www.simcompanies.com/static/images/resources/flight-computer.png",
        "81": "https://www.simcompanies.com/static/images/resources/cockpit.png",
        "82": "https://www.simcompanies.com/static/images/resources/attitude-control.png",
        "83": "https://www.simcompanies.com/static/images/resources/rocket-fuel.png",
        "84": "https://www.simcompanies.com/static/images/resources/fuel-tank.png",
        "85": "https://www.simcompanies.com/static/images/resources/solid-rocket.png",
        "86": "https://www.simcompanies.com/static/images/resources/rocket-engine.png",
        "87": "https://www.simcompanies.com/static/images/resources/heat-shield.png",
        "88": "https://www.simcompanies.com/static/images/resources/ion-drive.png",
        "89": "https://www.simcompanies.com/static/images/resources/jet-engine.png",
        "90": "https://www.simcompanies.com/static/images/resources/sub-orbital-second-stage.png",
        "91": "https://www.simcompanies.com/static/images/resources/sub-orbital-rocket2.png",
        "92": "https://www.simcompanies.com/static/images/resources/orbital-booster.png",
        "93": "https://www.simcompanies.com/static/images/resources/starship.png",
        "94": "https://www.simcompanies.com/static/images/resources/BFR.png",
        "95": "https://www.simcompanies.com/static/images/resources/jumbojet2.png",
        "96": "https://www.simcompanies.com/static/images/resources/private-jet.png",
        "97": "https://www.simcompanies.com/static/images/resources/single-engine.png",
        "98": "https://www.simcompanies.com/static/images/resources/quadcopter.png",
        "99": "https://www.simcompanies.com/static/images/resources/satellite.png",
        "100": "https://www.simcompanies.com/static/images/resources/aero-research.png",
        "101": "https://www.simcompanies.com/static/images/resources/reinforced-concrete.png",
        "102": "https://www.simcompanies.com/static/images/resources/bricks.png",
        "103": "https://www.simcompanies.com/static/images/resources/cement.png",
        "104": "https://www.simcompanies.com/static/images/resources/clay.png",
        "105": "https://www.simcompanies.com/static/images/resources/limestone.png",
        "106": "https://www.simcompanies.com/static/images/resources/wood.png",
        "107": "https://www.simcompanies.com/static/images/resources/steel-beams.png",
        "108": "https://www.simcompanies.com/static/images/resources/planks.png",
        "109": "https://www.simcompanies.com/static/images/resources/windows.png",
        "110": "https://www.simcompanies.com/static/images/resources/tools.png",
        "111": "https://www.simcompanies.com/static/images/resources/construction-units.png",
        "112": "https://www.simcompanies.com/static/images/resources/bulldozer.png",
        "113": "https://www.simcompanies.com/static/images/resources/materials-research.png",
        "114": "https://www.simcompanies.com/static/images/resources/robots.png",
        "115": "https://www.simcompanies.com/static/images/resources/cow.png",
        "116": "https://www.simcompanies.com/static/images/resources/pig.png",
        "117": "https://www.simcompanies.com/static/images/resources/milk.png",
        "118": "https://www.simcompanies.com/static/images/resources/coffee-beans.png",
        "119": "https://www.simcompanies.com/static/images/resources/coffee-ground.png",
        "120": "https://www.simcompanies.com/static/images/resources/vegetables.png",
        "121": "https://www.simcompanies.com/static/images/resources/bread.png",
        "122": "https://www.simcompanies.com/static/images/resources/cheese.png",
        "123": "https://www.simcompanies.com/static/images/resources/apple-pie.png",
        "124": "https://www.simcompanies.com/static/images/resources/orange-juice.png",
        "125": "https://www.simcompanies.com/static/images/resources/apple-cider.png",
        "126": "https://www.simcompanies.com/static/images/resources/ginger-beer.png",
        "127": "https://www.simcompanies.com/static/images/resources/pizza.png",
        "128": "https://www.simcompanies.com/static/images/resources/pasta.png",
        "129": "https://www.simcompanies.com/static/images/resources/hamburger.png",
        "130": "https://www.simcompanies.com/static/images/resources/lasagna.png",
        "131": "https://www.simcompanies.com/static/images/resources/meatballs.png",
        "132": "https://www.simcompanies.com/static/images/resources/cocktails.png",
        "133": "https://www.simcompanies.com/static/images/resources/flour.png",
        "134": "https://www.simcompanies.com/static/images/resources/butter.png",
        "135": "https://www.simcompanies.com/static/images/resources/sugar.png",
        "136": "https://www.simcompanies.com/static/images/resources/cocoa-beans.png",
        "137": "https://www.simcompanies.com/static/images/resources/dough.png",
        "138": "https://www.simcompanies.com/static/images/resources/gravy-boat.png",
        "139": "https://www.simcompanies.com/static/images/resources/fodder.png",
        "140": "https://www.simcompanies.com/static/images/resources/chocolate.png",
        "141": "https://www.simcompanies.com/static/images/resources/vegetable-oil.png",
        "142": "https://www.simcompanies.com/static/images/resources/salad.png",
        "143": "https://www.simcompanies.com/static/images/resources/samosas.png",
        "144": "https://www.simcompanies.com/static/images/resources/xmas-ornament.png",
        "145": "https://www.simcompanies.com/static/images/resources/recipes.png",
        "146": "https://www.simcompanies.com/static/images/resources/pumpkin.png",
        "147": "https://www.simcompanies.com/static/images/resources/jack-o-lantern.png",
        "148": "https://www.simcompanies.com/static/images/resources/witch-costume.png",
        "149": "https://www.simcompanies.com/static/images/resources/pumpkin-soup.png",
        "150": "https://www.simcompanies.com/static/images/resources/tree.png",
        "151": "https://www.simcompanies.com/static/images/resources/easter-bunny.png",
        "152": "https://www.simcompanies.com/static/images/resources/ramadan-sweets.png"
    }


 
    
    let _path = {
        addWares: '<path fill="currentColor" d="M 168 144 L 168 0 L 276 0 L 276 432 L 168 432 C 168 96 168 96 168 120 C 180 -96 196.8 52.8 206.4 105.6 A 6.816 6.816 90 0 1 206.4 105.6 A 24 24 90 0 0 206.4 100.8 Q 201.6 105.6 196.8 4.8 T 201.6 48 T 206.4 148.8 T 206.4 120 T 196.8 67.2 A 24 24 90 0 1 220.8 124.8 A 6.816 6.816 90 0 1 206.4 43.2 C 206.4 206.4 192 254.4 182.4 24 C 216 134.4 187.2 100.8 182.4 9.6 M 444 264 L 120 264 L 0 264 L 0 156 L 444 156"></path>',
        wares: '<path fill="currentColor" d="M248 0H208c-26.5 0-48 21.5-48 48V160c0 35.3 28.7 64 64 64H352c35.3 0 64-28.7 64-64V48c0-26.5-21.5-48-48-48H328V80c0 8.8-7.2 16-16 16H264c-8.8 0-16-7.2-16-16V0zM64 256c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H224c35.3 0 64-28.7 64-64V320c0-35.3-28.7-64-64-64H184v80c0 8.8-7.2 16-16 16H120c-8.8 0-16-7.2-16-16V256H64zM352 512H512c35.3 0 64-28.7 64-64V320c0-35.3-28.7-64-64-64H472v80c0 8.8-7.2 16-16 16H408c-8.8 0-16-7.2-16-16V256H352c-15 0-28.8 5.1-39.7 13.8c4.9 10.4 7.7 22 7.7 34.2V464c0 12.2-2.8 23.8-7.7 34.2C323.2 506.9 337 512 352 512z"></path>',
        
        prcInspector: '<path fill="currentColor" d="M352 222.7c0 18.4 14.9 33.3 33.3 33.3c8.4 0 16.4-3.1 22.6-8.8l99-91.4c3.3-3 5.1-7.3 5.1-11.8s-1.9-8.7-5.1-11.8l-99-91.4c-6.1-5.7-14.2-8.8-22.6-8.8C366.9 32 352 46.9 352 65.3V128H16c-8.8 0-16 7.2-16 16s7.2 16 16 16H352v62.7zm33.3 1.3c-.7 0-1.3-.6-1.3-1.3V65.3c0-.7 .6-1.3 1.3-1.3c.3 0 .6 .1 .9 .3L472.4 144l-86.3 79.7c-.2 .2-.5 .3-.9 .3zM126.7 480c18.4 0 33.3-14.9 33.3-33.3V384H496c8.8 0 16-7.2 16-16s-7.2-16-16-16H160V289.3c0-18.4-14.9-33.3-33.3-33.3c-8.4 0-16.4 3.1-22.6 8.8l-99 91.4C1.9 359.3 0 363.5 0 368s1.9 8.7 5.1 11.8l99 91.4c6.1 5.7 14.2 8.8 22.6 8.8zm1.3-33.3c0 .7-.6 1.3-1.3 1.3c-.3 0-.6-.1-.9-.3L39.6 368l86.3-79.7c.2-.2 .5-.3 .9-.3c.7 0 1.3 .6 1.3 1.3V446.7z"></path>',
        inspectorSettings: '<path fill="currentColor" d="M315.3 4.7c6.2 6.2 6.2 16.4 0 22.6L302.6 40 472 209.4l12.7-12.7c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6l-24 24-96 96-24 24c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6L353.4 328 184 158.6l-12.7 12.7c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l24-24 96-96 24-24c6.2-6.2 16.4-6.2 22.6 0zM206.6 136L376 305.4 449.4 232 280 62.6 206.6 136zM144 320L32 432l48 48L192 368l-48-48zm-22.6-22.6c12.5-12.5 32.8-12.5 45.3 0l12.7 12.7 49.8-49.8 22.6 22.6-49.8 49.8 12.7 12.7c12.5 12.5 12.5 32.8 0 45.3l-112 112c-12.5 12.5-32.8 12.5-45.3 0l-48-48c-12.5-12.5-12.5-32.8 0-45.3l112-112z"></path>',
        buildBusy:'<path fill="currentColor" d="M263.9 2.1C259-.7 253-.7 248.1 2.1L15.8 133.7C6 139.3 0 149.6 0 160.8C0 178 14 192 31.2 192H480.8c17.2 0 31.2-14 31.2-31.2c0-11.2-6-21.6-15.8-27.1L263.9 2.1zM256 34.4L477.7 160H34.3L256 34.4zM64 352c-8.8 0-16 7.2-16 16s7.2 16 16 16H448c8.8 0 16-7.2 16-16s-7.2-16-16-16V224H416V352H336V224H304V352H208V224H176V352H96V224H64V352zM24 432c0 8.8 7.2 16 16 16H472c8.8 0 16-7.2 16-16s-7.2-16-16-16H40c-8.8 0-16 7.2-16 16zM0 496c0 8.8 7.2 16 16 16H496c8.8 0 16-7.2 16-16s-7.2-16-16-16H16c-8.8 0-16 7.2-16 16z"></path>',
        SVGStar:'<path fill="currentColor" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>',
}

let aBusy = {
        "started": "2025-06-13T01:35:41.560382+00:00",
        "duration": 0,
        "category": "r",
        "accelerationFactor": 1,
        "resource": {
            "amount": 0,
            "quality": 0,
            "unitCost": 5.015671569757788,
            "kind": 16,
            "name": "Silicon",
            "image": "images/resources/silicon.png",
            "amountAvailableNow": 0
        },
        "canFetch": false
}

    let bwh = {
        Slaughterhouse: { items: [ 'Steak', 'Sausages' ], wh: 477 },
        Mill: { items: [ 'Coffee powder', 'Flour', 'Fodder' ], wh: 437 },
        Bakery: { items: [ 'Bread', 'Apple pie', 'Dough' ], wh: 517 },
        Catering: {
          items: [
            'Hamburger',
            'Lasagna',
            'Meat balls',
            'Cocktails',
            'Sauce',
            'Salad',
            'Samosa',
            'Pumpkin soup'
          ],
          wh: 758
        },
        'Food processing plant': {
          items: [
            'Cheese',
            'Frozen pizza',
            'Pasta',
            'Butter',
            'Sugar',
            'Chocolate',
            'Vegetable oil',
            'Easter bunny'
          ],
          wh: 437
        },
     
        Ranch: { items: [ 'Eggs', 'Leather', 'Cows', 'Pigs', 'Milk' ], wh: 156 },
        'Beverage factory': {
          items: [ 'Ethanol', 'Orange juice', 'Apple cider', 'Ginger beer' ],
          wh: 278
        },
      
        'General contractor': { items: [ 'Construction units' ], wh: 399 },
        'Concrete plant': { items: [ 'Reinforced concrete', 'Bricks', 'Cement' ], wh: 436 },
        'Construction factory': { items: [ 'Steel beams', 'Planks', 'Windows', 'Tools' ], wh: 556 },
        Farm: {
          items: [
            'Apples',       'Oranges',
            'Grapes',       'Grain',
            'Cotton',       'Seeds',
            'Sugarcane',    'Wood',
            'Coffee beans', 'Vegetables',
            'Cocoa',        'Pumpkin'
          ],
          wh: 119
        },
        Quarry: { items: [ 'Sand', 'Clay', 'Limestone' ], wh: 313 },
    
        'Fashion factory': {
          items: [
            'Fabric',
            'Underwear',
            'Gloves',
            'Dress',
            'Stiletto heel',
            'Handbags',
            'Sneakers',
            'Luxury watch',
            'Necklace',
            'Witch costume'
          ],
          wh: 157
        },
        'Power plant': { items: [ 'Power' ], wh: 477 },
        'Oil rig': { items: [ 'Crude oil', 'Methane' ], wh: 596 },
        Refinery: {
          items: [ 'Petrol', 'Diesel', 'Plastic', 'Carbon fibers', 'Rocket fuel' ],
          wh: 555
        },
        'Aerospace electronics': {
          items: [
            'Flight computer',
            'Cockpit',
            'Attitude control',
            'Quadcopter',
            'Satellite'
          ],
          wh: 833
        },
        'Electronics factory': {
          items: [
            'Processors',
            'Electronic components',
            'Batteries',
            'Displays',
            'Smart phones',
            'Tablets',
            'Laptops',
            'Monitors',
            'Televisions',
            'On-board computer',
            'High grade e-comps',
            'Robots',
            "Jack o'lantern"
          ],
          wh: 437
        },
    
        'Car factory': {
          items: [
            'Luxury car interior',
            'Basic interior',
            'Car body',
            'Economy e-car',
            'Luxury e-car',
            'Economy car',
            'Luxury car',
            'Truck',
            'Bulldozer'
          ],
          wh: 516
        },
        'Propulsion factory': {
          items: [
            'Electric motor',
            'Combustion engine',
            'Solid fuel booster',
            'Rocket engine',
            'Ion drive',
            'Jet engine'
          ],
          wh: 715
        },
    
        'Aerospace factory': {
          items: [
            'Fuselage',
            'Wing',
            'Propellant tank',
            'Heat shield',
            'Sub-orbital 2nd stage',
            'Orbital booster',
            'Starship'
          ],
          wh: 675
        },
        'Vertical integration facility': { items: [ 'Sub-orbital rocket', 'BFR' ], wh: 885 },
        Hangar: {
          items: [ 'Jumbo jet', 'Luxury jet', 'Single engine plane' ],
          wh: 938
        },
    
        Mine: { items: [ 'Minerals', 'Bauxite', 'Iron ore', 'Gold ore' ], wh: 318 },
        'Shipping depot': { items: [ 'Transport' ], wh: 327 },
        'Water reservoir': { items: [ 'Water' ], wh: 402 },
        Factory: {
          items: [
            'Silicon',
            'Chemicals',
            'Aluminium',
            'Steel',
            'Glass',
            'Golden bars',
            'Carbon composite',
            'Xmas crackers',
            'Xmas ornament'
          ],
          wh: 477
        },
        'Automotive R&D': { items: [ 'Automotive research' ], wh: 636 },
        'Breeding laboratory': { items: [ 'Breeding research' ], wh: 477 },
        'Chemistry laboratory': { items: [ 'Chemistry research', 'Materials research' ], wh: 477 },
        'Fashion & Design': { items: [ 'Fashion research' ], wh: 517 },
        'Physics laboratory': {
          items: [ 'Mining research', 'Electronics research', 'Energy research' ],
          wh: 676
        },
        'Launch pad': { items: [ 'Aerospace research' ], wh: 518 },
        'Plant research center': { items: [ 'Plant research' ], wh: 516 },
        Kitchen: { items: [ 'Recipes' ], wh: 595 },
        'Software R&D': { items: [ 'Software' ], wh: 675 },
        'Forest nursery': { items: [ 'Tree' ], wh: 91 }
    }

  const warehouseItemHTML = '<img src="/static/images/resources/eggs.png" alt="" class="css-pn23tk e14va4ca0"><b>Eggs</b><span class="css-1w44llp e14va4ca1">0</span>'