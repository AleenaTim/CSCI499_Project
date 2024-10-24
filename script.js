let unclicked = true; 
const selectedID = {
    valid: false, 
    id: "", 
};
const activeFilters = new Map(); 

const mainButton = document.querySelector("#side-button"); 

mainButton.addEventListener("click", function(){
    openSideBar(); 
    addOpacity(); 
}); 

const theGrey = document.querySelector("#opacitySet"); 
 theGrey.addEventListener("click", function(){
    console.log("clicked"); 
    closeSideBar(); 
    removeOpacity(); 
}); 
function closePriceDropDown(){
    document.getElementById("price-checkboxes").style.display = "none"; 
    document.querySelector(".my-arrow").textContent = 'arrow_drop_down'; 
}
function openPriceDropDown(){ 
    const pricedBttn = document.querySelector("#priceDropDownBttn"); 
    pricedBttn.addEventListener("click", function(){
        if(document.getElementById("price-checkboxes").style.display == "block"){
            closePriceDropDown(); 
        }
        else{
            document.getElementById("price-checkboxes").style.display = "block";
            document.querySelector(".my-arrow").textContent = 'arrow_drop_up'; 
        }
    });
}
function removeDuplicates(){
    let priceButton = document.querySelector("#affordable"); 
    activeFilters.forEach((key,value)=>{ 
        if(value.includes('$')){
            let priceSpan = priceButton.firstElementChild.textContent; 
            if(value == priceSpan){
                document.getElementById(priceButton.id).style.color = "#7fcecb";
                unclicked = false; 
            }
            priceButton = priceButton.nextElementSibling; 
        }
    }); 
}

function findPriceFilter(currID){
    const activeFilter = document.querySelector(".applied-filters").firstElementChild;
    let myFilter = activeFilter.id; 
    var count = document.querySelector(".applied-filters").childElementCount; 
    for(let i = 0; i < count; i++){
        if(myFilter.includes(currID)){
            return true; 
        }
    }
    return true; 
}
function getID(text){
    let myID = ""; 
    if(text == "$") {
        myID = "affordable"; 
    }
    if(text == "$$"){
        myID = "semi-affordable"; 
    }
    if(text == "$$$"){
        myID = "semi-expensive"; 
    }
    if(text == "$$$$"){
        myID = "expensive"; 
    }
    return myID; 
}
function mainPrices(){
    const myPrices = document.querySelector("#price-checkboxes"); 
    myPrices.addEventListener("click", function(e){
        let myLabel = e.target.nextElementSibling; 
        if(document.getElementById(e.target.id).checked){
            const activeFilter = document.querySelector(".applied-filters"); 
            const filter = document.createElement("span"); 
            filter.textContent = " ◦ " + myLabel.textContent;
            filter.style.fontSize = "10px"; 
            filter.id = "active" + myLabel.textContent;  
            activeFilter.appendChild(filter); 
            activeFilters.set(myLabel.textContent, getID(myLabel.textContent)); 
        }
        else{
            activeFilters.delete(myLabel.textContent);  
        } 
    }); 
}

function chooseMainFilter(){
    const mainFilter = document.querySelector("#section-two-buttons"); 
    mainFilter.addEventListener("click", function(e){
        if(document.getElementById(e.target.id).style.color != "rgb(127, 206, 203)"){
            document.getElementById(e.target.id).style.color = "rgb(127, 206, 203)"; 
            activeFilters.set(e.target.textContent, e.target.id);
            selectedFilters(e.target.textContent, e.target.id);  
        }
        else{
            document.getElementById(e.target.id).style.color = "black"; 
            removeFilter("active" +e.target.id); 
            activeFilters.delete(e.target.id); 
        }
        
    }); 
}
function openSideBar(){
    document.getElementById("sidebar").style.display = "block"; 
    document.getElementById("sidebar").style.width = "225px"; 
    document.getElementById("mainContent").style.marginLeft = "225px"; 
    closePriceDropDown(); ///   issue?
    removeDuplicates(); 
}

function addOpacity(){
    document.getElementById("opacitySet").style.display = "block"; 
}

function removeOpacity(){
    document.getElementById("opacitySet").style.display = "none"; 
}
   
function closeSideBar(){
    document.getElementById("sidebar").style.width = "0px"; 
    document.getElementById("sidebar").style.display = "none"; 
    document.getElementById("mainContent").style.marginLeft = "0px"; 
}


function starCount(){
    let stars = document.querySelector(".rating-stars").firstElementChild; 
    let counter = 0; 
    for(let i = 0; i < 5; i++){
        if(document.getElementById(stars.id).style.color == "gold"){
            counter++; 
            stars = stars.nextElementSibling; 
        }
    }
 
    
    return counter; 
}
function chooseRating(){
    const stars = document.querySelector(".rating-stars"); 
    stars.addEventListener("click", function(e){
        activeFilters.delete("star"); 
        let el = e.target; 
        if(document.getElementById(el.id).style.color != "gold"){ 
            while(el){
                document.getElementById(el.id).style.color = "gold"; 
                el = el.previousElementSibling;    
            }
        }
        else{
            if(el.id == "star1" && document.getElementById(el.nextElementSibling.id).style.color == "black"){
                document.getElementById("star1").style.color = "black"; 
            }
            else{
                while(el.nextElementSibling){
                    el = el.nextElementSibling; 
                    document.getElementById(el.id).style.color = "black"; 
                }
            }
        }
        
        activeFilters.set("star", starCount()); 
    }); 
}
function choosePriceRange(){
    const pButtons = document.querySelector(".price-buttons"); 
    pButtons.addEventListener("click", function(e){
        selectedID.id = e.target.id; 
        validID(selectedID);
        let myTextContent =""; 
        if(selectedID.valid == true){
            if(e.target.textContent.includes("$$$$")){
                myTextContent = "$$$$"; 
            }
            else if(e.target.textContent.includes("$$$")){
                myTextContent = "$$$"; 
            }
            else if(e.target.textContent.includes("$$")){
                myTextContent = "$$"; 
            }
            else if(e.target.textContent.includes("$")){
                myTextContent = "$"; 
            }



            selectButton(selectedID.id, myTextContent); 
        }
    }); 
}

function chooseFeature(){
    const featureCheckbox = document.querySelector(".suggested"); 
    featureCheckbox.addEventListener("click",function(e){
        selectedID.id = e.target.id; 
        selectCheckbox(selectedID.id); 
    }); 
}

function selectCheckbox(feature){
    if(document.getElementById(feature).checked){
        selectedFilters(feature); 
    }
    else{
        removeFilter("active" +feature); 
    }
    
}

function validID(selectedID){
    if(selectedID.id == "itallian" || selectedID.id == "american" || selectedID.id == "seafood" 
        || selectedID.id == "food-court" || selectedID == "soul-food" || selectedID == "hawaiian" || selectedID == "venezuelan"
        || selectedID.id == "thai" || selectedID.id == "Chinese" || selectedID.id == "Mediterranean"
        || selectedID.id == "Filipino" || selectedID.id == "Greek" || selectedID.id == "Mexican"){
        selectedID.valid = true; 
    }
    if(selectedID.id == "affordable" || selectedID.id == "semi-affordable" || selectedID.id == "semi-expensive" || selectedID.id == "expensive"){
        selectedID.valid = true; 
    }
}

function selectButton(selectedCategory, diffTextContent="text"){
    const curColor = document.getElementById(selectedCategory).style.color; 
    if(curColor == "black"){
        document.getElementById(selectedCategory).style.color = "#7fcecb"; 
        if(diffTextContent=="text"){
            selectedFilters(selectedCategory); 
        }
        else{
            selectedFilters(diffTextContent, selectedCategory); 
        }
        
        unclicked = false; 
    }
    else{
        document.getElementById(selectedCategory).style.color = "black";  
        if(unclicked == false){
            if(diffTextContent=="text"){
                removeFilter("active" +selectedCategory); 
            }
            else{
                removeFilter("active" +diffTextContent); 
                if(document.getElementById(selectedCategory + "-d").checked){
                    document.getElementById(selectedCategory + "-d").checked = false; 
                }
                
            }
           
        }
    } 
}

function chooseCategories(){
    const catButton = document.querySelector(".category"); 
    catButton.addEventListener("click", function(e){
        selectedID.id = e.target.id; 
        validID(selectedID)
        if(selectedID.valid == true &&  e.target.tagName == "BUTTON"){
            selectButton(selectedID.id); 
        }
        if(selectedID.valid == true && e.target.tagName == "INPUT"){
            selectCheckbox(selectedID.id); 
        }
        
    })
}


function selectedFilters(textField, myID=""){ 
    const activeFilter = document.querySelector(".applied-filters"); 
    const filter = document.createElement("span"); 
    if(textField.includes('-')){
        const multiWord = textField.split('-'); 
        filter.textContent = " ◦ " + multiWord.map(upper).join(' ');
    }
    else{
        filter.textContent =  " ◦ " + upper(textField); 
    }
    filter.style.fontSize = "10px"; 
    filter.id = "active" + textField; 
    activeFilter.appendChild(filter); 
    if(myID.length == 0){ 
        activeFilters.set(textField, textField);
    }
    else{
        activeFilters.set(textField, myID); 
    }
}

function upper(word){
    return  word[0].toUpperCase()+word.substring(1); 
}



function removeFilter(currFilter){
    const activeFilter = document.querySelector(".applied-filters"); 
    const filter = document.getElementById(currFilter); 
    if(filter){
        activeFilters.delete(filter.id.substring(6)); 
        activeFilter.removeChild(filter); 
    }
}

function chooseDistance(){
    var distanceSlider = document.getElementById("myRange"); 
    const filter = document.getElementById("distanceFilter"); 
    filter.style.fontSize = "10px"; 
    distanceSlider.oninput = function(){
        filter.textContent = "◦ Distance : " + "< " + distanceSlider.value + "mi"; 
        addDistance(filter.textContent.substring(13)); 
    }

}

function addDistance(distance){
    let distS = "mi";
    if(activeFilters.size > 0){
        for(const key of activeFilters.keys()){
            if(key.includes(distS)){
                activeFilters.delete(key); 
            }
        }
   } 
   activeFilters.set(distance, "distance"); 
}

function seeMoreFeatures(){
    const seeMore = document.querySelector("#see-more-features"); 
    seeMore.addEventListener("click", function(){
        if(document.getElementById("see-more-f").style.display != "flex"){
            document.getElementById("see-more-f").style.display = "flex"; 
            document.getElementById("see-more-c").style.display = "none"; 
        }
        else{
            document.getElementById("see-more-f").style.display = "none"; 
        }
    }); 
}

function seeMoreCategories(){
    const seeMoreC = document.querySelector("#see-more-categories"); 
    seeMoreC.addEventListener("click", function(){
        if(document.getElementById("see-more-c").style.display != "flex"){
            document.getElementById("see-more-c").style.display = "flex"; 
            document.getElementById("see-more-f").style.display = "none"; 
         }
         else{
             document.getElementById("see-more-c").style.display = "none"; 
         }
    }); 
}

function exitCategories(){
    const myCat = document.querySelector(".close-category"); 
    myCat.addEventListener("click",function(){
        document.getElementById("see-more-c").style.display = "none"; 
    }); 
}

function exitFeatures(){
    const myFeat = document.querySelector(".close-filter"); 
    myFeat.addEventListener("click", function(){
        document.getElementById("see-more-f").style.display = "none"; 
    }); 
}

function clearSideBar(){
    const clearButtn = document.querySelector(".clear"); 
    clearButtn.addEventListener("click", function(){
        clearFilters(); 
    }); 
}

function clearStar(){
    let stars = document.querySelector(".rating-stars").firstElementChild; 
    for(let i = 0; i < 5; i++){
        if(document.getElementById(stars.id).style.color == "gold"){
            document.getElementById(stars.id).style.color = "black"; 
            stars = stars.nextElementSibling; 
        }
    }
}

function clearFilters(){
    const activeFilter = document.querySelector(".applied-filters"); 
    var distanceSlider = document.getElementById("myRange"); 
    const distance = document.querySelector("#distanceFilter"); 

    while(activeFilter.firstElementChild){
        activeFilter.removeChild(activeFilter.firstElementChild); 
    }

    if(distance.textContent.length != 0){
        distance.textContent = ""; 
        distanceSlider.value = 5; 
    }
    if(activeFilters.has("star")){
        clearStar(); 
        activeFilters.delete("star"); 
    }

    activeFilters.forEach((key, value) =>{
        const remove = document.querySelector(`#${key}`); 
        if(key != "distance"){
            if(remove.tagName == "INPUT"){ 
                remove.checked = false; 
            }
            if(remove.tagName == "BUTTON"){ 
                if(value.includes('$')){
                    let priceCheckboxID = key+"-d"; 
                    const priceCheckbox = document.getElementById(priceCheckboxID); 
                    priceCheckbox.checked = false; 
                }
                remove.style.color = "black"; 
            }
        }
   }); 

    activeFilters.clear(); 
}

function cancel(){
    const cancelBttn = document.querySelector(".cancel"); 
    cancelBttn.addEventListener("click", function(){
        clearFilters(); 
        closeSideBar(); 
        removeOpacity();
    }); 
}

chooseRating(); 
choosePriceRange(); 
chooseCategories(); 
chooseFeature(); 
chooseDistance(); 
openPriceDropDown(); 
chooseMainFilter(); 
seeMoreFeatures(); 
seeMoreCategories(); 
exitCategories(); 
exitFeatures(); 
mainPrices(); 
clearSideBar(); 
cancel(); 


