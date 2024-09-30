let unclicked = true; 
const selectedID = {
    valid: false, 
    id: "", 
};
const mainButton = document.querySelector("#side-button"); 

mainButton.addEventListener("click", function(){
    if(document.getElementById("sidebar").style.display == "none"){
        openSideBar(); 
    }
    else{
       closeSideBar(); 
    }
 }); 

function openPriceDropDown(){
    const pricedBttn = document.querySelector("#priceDropDownBttn"); 
    pricedBttn.addEventListener("click", function(){
        console.log("clicked"); 
        if(document.getElementById("price-checkboxes").style.display == "block"){
            document.getElementById("price-checkboxes").style.display = "none"; 
        }
        else{
            document.getElementById("price-checkboxes").style.display = "block";
        }
   
    });
}

function openSideBar(){
    document.getElementById("sidebar").style.display = "block"; 
    document.getElementById("sidebar").style.width = "250px"; 
}
   
function closeSideBar(){
    document.getElementById("sidebar").style.width = "0px"; 
    document.getElementById("sidebar").style.display = "none"; 
    document.getElementById("mainContent").style.marginLeft = "0px"; 
}

function chooseRating(){
    const stars = document.querySelector(".rating-range"); 
    stars.addEventListener("click", function(e){
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
                while(el){
                    el = el.nextElementSibling; 
                    document.getElementById(el.id).style.color = "black"; 
                }
            }
        }
    }); 
}
function choosePriceRange(){
    const pButtons = document.querySelector(".price-buttons"); 
    pButtons.addEventListener("click", function(e){
        selectedID.id = e.target.id; 
        validID(selectedID);
        if(selectedID.valid == true){
            selectButton(selectedID.id, e.target.textContent); 
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
        console.log('checked'); 
        selectedFilters(feature); 
    }
    else{
        removeFilter("active" +feature); 
    }
    
}

function validID(selectedID){
    if(selectedID.id == "itallian" || selectedID.id == "american" || selectedID.id == "seafood"){
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
            selectedFilters(diffTextContent); 
        }
        
        unclicked = false; 
    }
    else{
        document.getElementById(selectedCategory).style.color = "black"; 
        console.log(unclicked); 
        if(unclicked == false){
            if(diffTextContent=="text"){
                removeFilter("active" +selectedCategory); 
            }
            else{
                removeFilter("active" +diffTextContent); 
            }
           
        }
    } 
}

function chooseCategories(){
    const catButton = document.querySelector(".category"); 
    catButton.addEventListener("click", function(e){
        selectedID.id = e.target.id; 
        validID(selectedID)
        if(selectedID.valid == true){
            selectButton(selectedID.id); 
        }
        
    })
}



function selectedFilters(textField){
    const activeFilter = document.querySelector(".active-filters"); 
    const filter = document.createElement("span"); 
    filter.textContent =  " ◦ " + textField[0].toUpperCase() + textField.substring(1); 
    filter.color = "#7fcecb"; 
    filter.id = "active" + textField; 
    activeFilter.appendChild(filter); 

}


function removeFilter(currFilter){
    const activeFilter = document.querySelector(".active-filters"); 
    const filter = document.getElementById(currFilter); 
    if(filter){
        activeFilter.removeChild(filter); 
    }
}

function chooseDistance(){
    var distanceSlider = document.getElementById("myRange"); 
    const filter = document.getElementById("distanceFilter"); 
    distanceSlider.oninput = function(){
        filter.textContent = "◦ Distance : " + "< " + distanceSlider.value + "mi"; 
    }
}

chooseRating(); 
choosePriceRange(); 
chooseCategories(); 
chooseFeature(); 
chooseDistance(); 
openPriceDropDown(); 
