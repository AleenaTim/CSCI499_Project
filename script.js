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


function chooseMainFilter(){
    const mainFilter = document.querySelector("#section-two-buttons"); 
    mainFilter.addEventListener("click", function(e){
        if(document.getElementById(e.target.id).style.color != "rgb(127, 206, 203)"){
            document.getElementById(e.target.id).style.color = "rgb(127, 206, 203)"; 
        }//works only with rgb not hex 
        else{
            document.getElementById(e.target.id).style.color = "black"; 
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
    if(selectedID.id == "itallian" || selectedID.id == "american" || selectedID.id == "seafood" 
        || selectedID.id == "foodCourt" || selectedID == "soulFood" || selectedID == "hawaiian" || selectedID == "venezuelan"
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
        if(selectedID.valid == true &&  e.target.tagName == "BUTTON"){
            selectButton(selectedID.id); 
        }
        if(selectedID.valid == true && e.target.tagName == "INPUT"){
            selectCheckbox(selectedID.id); 
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

function seeMoreFeatures(){
    const seeMore = document.querySelector("#see-more-features"); 
    seeMore.addEventListener("click", function(){
        if(document.getElementById("see-more-f").style.display != "block"){
            document.getElementById("see-more-f").style.display = "block"; 
        }
        else{
            document.getElementById("see-more-f").style.display = "none"; 
        }
    }); 
}

function seeMoreCategories(){
    const seeMoreC = document.querySelector("#see-more-categories"); 
    seeMoreC.addEventListener("click", function(){
        if(document.getElementById("see-more-c").style.display != "block"){
            document.getElementById("see-more-c").style.display = "block"; 
         }
         else{
             document.getElementById("see-more-c").style.display = "none"; 
         }
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

