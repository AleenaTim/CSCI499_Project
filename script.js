const mainButton = document.querySelector("#mainButton"); 

mainButton.addEventListener("click", function(){
    if(document.getElementById("sidebar").style.display == "none"){
        openSideBar(); 
    }
    else{
       closeSideBar(); 
    }
 }); 

function openSideBar(){
    document.getElementById("sidebar").style.display = "block"; 
    document.getElementById("sidebar").style.width = "250px"; 
}
   
function closeSideBar(){
    document.getElementById("sidebar").style.width = "0px"; 
    document.getElementById("sidebar").style.display = "none"; 
    document.getElementById("mainContent").style.marginLeft = "0px"; 
}



