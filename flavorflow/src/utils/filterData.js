const mainFeatures = [
    ["Vegetarian", "vegetarian"], 
    ["Gluten Free", "gluten-free"], 
    ["Kosher", "kosher"]
]; 

const seeMoreFeatures = [
    ["Halal", "halal"], 
    ["Allergy Friendly", "allergy-friendly"], 
    ["Vegan", "vegan"], 
    ["Organic", "organic"], 
    ["Low Sodium", "low-sodium"], 
    ["Heart Healthy Menu", "heart-healthy-menu"], 
    ["Kids Menu", "kids-menu"], 
    ["Live Music", "live-music"], 
    ["Eat In", "eat-in"], 
    ["Take Out", "take-out"]
]

const seeMoreCategories = [
    ["Food Court", "food-court"], 
    ["Soul Food", "soul-food"], 
    ["Hawaiian", "hawaiian"], 
    ["Venezuelan", "venezuelan"], 
    ["Thai", "thai"], 
    ["Chinese", "chinese"], 
    ["Mediterranean", "mediterranean"], 
    ["Filipino", "filipino"], 
    ["Greek", "greek"], 
    ["Mexican", "mexican"]
]

const prices = [
    ["$", "affordable-d"], 
    ["$$", "semi-affordable-d"], 
    ["$$$", "semi-expensive-d"], 
    ["$$$$", "expensive-d"]
]

function upper(word){
    return  word[0].toUpperCase()+word.substring(1); 
}

function maxMapVal(container){
    let maxValue = 0; 
    for(let item of container.keys()){
        if(item.slice(-1) > maxValue){
            maxValue = item.slice(-1); 
        }
    }
    return maxValue; 
}

function milesToMeters(mile){
    return Number(mile) * 1609.34; 
}
export{mainFeatures, seeMoreFeatures, seeMoreCategories, prices, upper, maxMapVal, milesToMeters}; 