
const seeMoreCategories = [
    ["Bar", "bar"], 
    ["Cafe", "cafe"], 
    ["Night Club", "night-club"], 
    ["Supermarket", "supermarket"]
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
export{ seeMoreCategories, prices, upper, maxMapVal}; 