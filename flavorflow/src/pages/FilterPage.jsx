import React from 'react';
import '../styles/FilterPage.css';
import {  useState } from 'react';
import { RiCloseLargeFill } from "react-icons/ri";
import { IoFilterSharp } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io"; //<IoMdArrowDropdown />
import { IoMdArrowDropup } from "react-icons/io"; //<IoMdArrowDropup />
import { GoStar } from "react-icons/go";
function FilterPage() {

 
    function upper(word){
        return  word[0].toUpperCase()+word.substring(1); 
    }

    const [sidebar, setSidebarVis] = useState(false); 
    const displaySidebar = () => setSidebarVis(!sidebar); 
    const [priceDropDown, setPriceDropDown] = useState(false); 
    const selectPriceDropDown = () => setPriceDropDown(!priceDropDown); 
    const [clearFilter, setClear] = useState(false); 
    const clearAll = () => {
        selectedPriceButtons.clear(); 
        selectedCategoryButtons.clear(); 
        selectedMainButtons.clear(); 
        selectedStars.clear(); 
        checkedBoxes.clear(); 
        setClear(!clearFilter); 
    }; 
    const [seeMoreF, setSeeMoreFVis ] = useState(false); 
    const displaySeeMoreF = () => setSeeMoreFVis(!seeMoreF); 
    const [seeMoreC, setSeeMoreCVis ] = useState(false); 
    const displaySeeMoreC = () => setSeeMoreCVis(!seeMoreC); 

    const [selectedPriceButtons, setPriceButtons] = useState(new Map()); 
    const selectPriceButton = (e) => {
        let priceButtonID = e.target.id; 
        if(selectedPriceButtons.has(priceButtonID) || checkedBoxes.has(priceButtonID)){
            for(let priceButton of selectedPriceButtons.keys()){
                if(priceButton == priceButtonID){
                    selectedPriceButtons.delete(priceButton); 
                }
            }
            for(let priceButton of checkedBoxes.keys()){
                if(priceButton == priceButtonID){
                    checkedBoxes.delete(priceButton); 
                }
            }
            setPriceButtons(new Map(selectedPriceButtons)); 
        }
        else{
            setPriceButtons(()=>{
                let myMap = new Map(selectedPriceButtons); 
                return myMap.set(priceButtonID, "price"); 

            }); 
        }
        
    }
    const [selectedMainButtons, setMainButtons] = useState(new Map()); 
    const selectMainButton = (e) => {
        let mainButtonID = e.target.id; 
        if(selectedMainButtons.has(mainButtonID)){
            for(let mainButton of selectedMainButtons.keys()){
                if(mainButton == mainButtonID){
                    selectedMainButtons.delete(mainButton); 
                }
            }
            setMainButtons(new Map(selectedMainButtons)); 
        }
        else{
            setMainButtons(() => {
                let myMap = new Map(selectedMainButtons); 
                return myMap.set(mainButtonID, "mainButton"); 
            })
        }
    }
    const [selectedCategoryButtons, setCategoryButtons] = useState(new Map()); 
    const selectCategoryButton = (e) => {
        let categoryButtonID = e.target.id; 
        if(selectedCategoryButtons.has(categoryButtonID)){
            for(let categoryButton of selectedCategoryButtons.keys()){
                if(categoryButton == categoryButtonID){
                    selectedCategoryButtons.delete(categoryButton); 
                }
            }
            setCategoryButtons(new Map(selectedCategoryButtons)); 
        }
        else{
            setCategoryButtons(() => {
                let myMap = new Map(selectedCategoryButtons); 
                return myMap.set(categoryButtonID, "category"); 
            })
        }
    }
   
    const[selectedStars, setStars] = useState(new Map()); 
    const selectStars = (e) => {
        let starID = e.target.id; 
        if(selectedStars.has(starID)){
            for(let starButton of selectedStars.keys()){
                if(starButton == starID){
                   selectedStars.delete(starButton); 
                }
                if(starID.slice(-1) <= starButton.slice(-1)){
                    selectedStars.delete(starButton); 
                }
            }
            setStars(new Map(selectedStars)); 
        }
        else{
            setStars(()=>{
                let myMap = new Map(selectedStars); 
                for(let i = Number(starID.slice(-1)); i  >= 1; i--){
                    myMap.set("star"+i, "rating"); 
                }
                return myMap; 

            }); 
        }
       
    }

    const [inputDistance, setInputDistance] = useState(null); 
    const [checkedBoxes, setCheckedBoxes] = useState(new Map()); 
    const selectCheckbox = (e) => {
        let checkboxValue = e.target.defaultValue; 
        if(e.target.checked){
            checkedBoxes.set(checkboxValue, e.target.name); 
        }
        else{

            checkedBoxes.delete(checkboxValue); 
        }
        setCheckedBoxes(new Map(checkedBoxes)); 
        
    }
    function appliedFilters(){
        let finalAppliedFilters = new Map(selectedMainButtons, checkedBoxes, selectedStars, selectedCategoryButtons, selectedPriceButtons, selectedStars); 
        finalAppliedFilters.set(inputDistance, "distance"); 
        return finalAppliedFilters; 
    }

    function showAppliedFilters(){
        let appliedfiltersmap1 =  [...selectedMainButtons, ...checkedBoxes, ...selectedCategoryButtons, ...selectedPriceButtons]; 
        appliedfiltersmap1.forEach((item)=>{
            if(item[0] == "affordable"){
                item[0] = '$'; 
            }
            if(item[0] == "semi-affordable"){
                item[0] = '$$'; 
            }
            if(item[0] == "semi-expensive"){
                item[0] = '$$$'; 
            }
            if(item[0] == "expensive"){
                item[0] = '$$$$'; 
            }
            if(item[0].includes('-')){
                const multiWord = item[0].split('-'); 
                item[0] = multiWord.map(upper).join(' '); 
            }
            else{
              item[0] = item[0][0].toUpperCase() + item[0].slice(1); 
            }
  
        })
        return appliedfiltersmap1; 
    }
    
     let appliedfiltersmap = showAppliedFilters(); 

    
    function cancelFilter(){
        clearAll(); 
        setSidebarVis(false); 
    }
   
    return (
      <>
        <style>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        </style>
        <div>
            <div id="sidebar" className={sidebar ? 'sidebar-vis' : 'sidebar-novis'}>
                <div className="filter-box">
                <div className='close-button' onClick={displaySidebar}><RiCloseLargeFill /></div>  
                <div className="filters">
                    <div className="active-filters">
                    <p>Applied Filters</p>
                    <span id="distanceFilter">
                        {inputDistance}
                    </span>
                    <div className="applied-filters">
                        {appliedfiltersmap.map((appliedFilter, index)=>(
                            <span key={index}>
                                {" ◦ "  + appliedFilter[0]}
                            </span>
                            ))}
                    </div>
                    </div>
                    <div className="price">
                    <p>Price</p>
                    <div className="price-buttons" > {/* TODO: add  this as an array */}
                        <button id="affordable" className= {(selectedPriceButtons.has("affordable") || checkedBoxes.has("affordable"))? 'buttonsOn' : 'buttonsOff' } onClick={selectPriceButton}>$</button>
                        <button id="semi-affordable" className= {(selectedPriceButtons.has("semi-affordable") || checkedBoxes.has("semi-affordable") )? 'buttonsOn' : 'buttonsOff' } onClick={selectPriceButton}>$$</button>
                        <button id="semi-expensive" className= {(selectedPriceButtons.has("semi-expensive") || checkedBoxes.has("semi-expensive"))? 'buttonsOn' : 'buttonsOff' } onClick={selectPriceButton}>$$$</button>
                        <button id="expensive" className= {(selectedPriceButtons.has("expensive") || checkedBoxes.has("expensive") )? 'buttonsOn' : 'buttonsOff' } onClick={selectPriceButton}>$$$$</button>
                    </div>   
                    </div>
                
                    <div className="rating-range">
                    <p>Rating</p> 
                    <div className="rating-stars">
                        <GoStar id="star1" className={selectedStars.has("star1") ? 'starColor' : 'noStarColor'} onClick={selectStars}/>
                        <GoStar id="star2" className={selectedStars.has("star2") ? 'starColor' : 'noStarColor'} onClick={selectStars}/>
                        <GoStar id="star3" className={selectedStars.has("star3") ? 'starColor' : 'noStarColor'} onClick={selectStars}/>
                        <GoStar id="star4" className={selectedStars.has("star4") ? 'starColor' : 'noStarColor'} onClick={selectStars}/>
                        <GoStar id="star5" className={selectedStars.has("star5") ? 'starColor' : 'noStarColor'} onClick={selectStars}/>
                    </div>
                    </div>
                    <div className="distance">
                    <p>Distance</p>
                    <input type="range" min={0} max={60} defaultValue={5} step={5} className="slider" id="myRange"
                            onChange={(event) => {
                                setInputDistance(event.target.value + " " + "mi")
                            }}
                     />
                    </div>
                    <div className="suggested">
                    <p>Features</p>
                            <ul className = "features">
                                <li>
                                    <input type="checkbox" id="vegetarian" name="diet" defaultValue="vegetarian" checked={checkedBoxes.has("vegetarian") ? true : false} onChange={selectCheckbox}/>
                                    <label htmlFor="vegetarian">Vegetarian</label> <br />
                                </li>
                                <li>
                                    <input type="checkbox" id="gluten-free" name="diet" defaultValue="gluten-free" checked={checkedBoxes.has("gluten-free") ? true : false} onChange={selectCheckbox}/>
                                    <label htmlFor="gluten-free">Gluten Free</label> <br />
                                </li>
                                <li>
                                    <input type="checkbox" id="kosher" name="diet" defaultValue="kosher" checked={checkedBoxes.has("kosher") ? true : false} onChange={selectCheckbox}/>
                                    <label htmlFor="kosher">Kosher</label> <br />
                                </li>
                            </ul>
                    <p className="see-more" id="see-more-features" onClick={displaySeeMoreF}>See More</p>
                    <div id="see-more-f" className={seeMoreF ? 'see-more-f-vis' : 'see-more-f-novis'}>
                        <div className='close-button' onClick={displaySeeMoreF}><RiCloseLargeFill /></div> 
                        <ul>
                        <li>
                            <input type="checkbox" id="halal" name="diet" defaultValue="halal"  checked={checkedBoxes.has("halal") ? true : false}  onChange={selectCheckbox}/>
                            <label htmlFor="halal">Halal</label> <br />
                        </li>
                        <li>
                            <input type="checkbox" id="allergy-friendly" name="diet" defaultValue="allergy-friendly"  checked={checkedBoxes.has("allergy-friendly") ? true : false}  onChange={selectCheckbox}/>
                            <label htmlFor="allergy-friendly">Allergy Friendly</label> <br />
                        </li>
                        <li>
                            <input type="checkbox" id="vegan" name="diet" defaultValue="vegan" checked={checkedBoxes.has("vegan") ? true : false}  onChange={selectCheckbox}/>
                            <label htmlFor="vegan">Vegan</label> <br />
                        </li>
                        <li>
                            <input type="checkbox" id="organic" name="food-type" defaultValue="organic"  checked={checkedBoxes.has("organic") ? true : false}  onChange={selectCheckbox}/>
                            <label htmlFor="organic">Organic</label> <br />
                        </li>
                        <li>
                            <input type="checkbox" id="low-sodium" name="diet" defaultValue="low-sodium"  checked={checkedBoxes.has("low-sodium") ? true : false}  onChange={selectCheckbox}/>
                            <label htmlFor="low-sodium">Low Sodium</label> <br />
                        </li>
                        <li>
                            <input type="checkbox" id="heart-healthy-menu" name="diet" defaultValue="heart-healthy-menu"  checked={checkedBoxes.has("heart-healthy-menu") ? true : false}  onChange={selectCheckbox}/>
                            <label htmlFor="heart-healthy-menu">Heart Healthy Menu</label> <br />
                        </li>
                        <li>
                            <input type="checkbox" id="kids-menu" name="diet" defaultValue="kids-menu"  checked={checkedBoxes.has("kids-menu") ? true : false}  onChange={selectCheckbox}/>
                            <label htmlFor="kids-menu">Kids Menu</label> <br />
                        </li>
                        <li>
                            <input type="checkbox" id="live-music" name="diet" defaultValue="live-music" checked={checkedBoxes.has("live-music") ? true : false}  onChange={selectCheckbox}/>
                            <label htmlFor="live-music">Live Music</label> <br />
                        </li>
                        <li>
                            <input type="checkbox" id="eat-in" name="diet" defaultValue="eat-in"  checked={checkedBoxes.has("eat-in") ? true : false}  onChange={selectCheckbox}/>
                            <label htmlFor="eat-in">Eat In</label> <br />
                        </li>
                        <li>
                            <input type="checkbox" id="take-out" name="diet" defaultValue="take-out" checked={checkedBoxes.has("take-out") ? true : false}  onChange={selectCheckbox}/>
                            <label htmlFor="take-out">Take Out</label> <br />
                        </li>
                        </ul> 
                    </div>
                    </div>
                    <div className="category">
                    <p>Category</p> {/* wrap in div ? minimize code*/}
                    <div className="categoryBttns">
                        <button id="italian" className= {selectedCategoryButtons.has("italian") ? 'buttonsOn' : 'buttonsOff' } onClick={selectCategoryButton}>Italian</button>
                        <button id="american" className= {selectedCategoryButtons.has("american") ? 'buttonsOn' : 'buttonsOff' } onClick={selectCategoryButton}>American</button>
                        <button id="seafood" className= {selectedCategoryButtons.has("seafood") ? 'buttonsOn' : 'buttonsOff' } onClick={selectCategoryButton}>Seafood</button>
                        <button id="jamaican" className= {selectedCategoryButtons.has("jamaican") ? 'buttonsOn' : 'buttonsOff' } onClick={selectCategoryButton}>Jamaican</button>
                    </div>
                        <p className="see-more" id="see-more-categories" onClick={displaySeeMoreC}>See More</p> 
                    
                    <div id="see-more-c" className={seeMoreC ? 'see-more-c-vis' : 'see-more-c-novis'}> 
                        <div className='close-button' onClick={displaySeeMoreC}><RiCloseLargeFill /></div> 
                        <ul>
                        <li>
                            <input type="checkbox" id="food-court" name="diet" defaultValue="food-court" checked={checkedBoxes.has("food-court") ? true : false} onChange={selectCheckbox}/>
                            <label htmlFor="food-court">Food Court</label><br />
                        </li>
                        <li>
                            <input type="checkbox" id="soul-food" name="diet" defaultValue="soul-food" checked={checkedBoxes.has("soul-food") ? true : false}  onChange={selectCheckbox}/>
                            <label htmlFor="soul-food">Soul Food</label><br />
                        </li>
                        <li>
                            <input type="checkbox" id="hawaiian" name="diet" defaultValue="hawaiian" checked={checkedBoxes.has("hawaiian") ? true : false}  onChange={selectCheckbox}/>
                            <label htmlFor="hawaiian">Hawaiian</label><br />
                        </li>
                        <li>
                            <input type="checkbox" id="venezuelan" name="diet" defaultValue="venezuelan" checked={checkedBoxes.has("venezuelan") ? true : false}  onChange={selectCheckbox}/>
                            <label htmlFor="venezuelan">Venezuelan</label><br />
                        </li>
                        <li>
                            <input type="checkbox" id="thai" name="diet" defaultValue="thai" checked={checkedBoxes.has("thai") ? true : false}  onChange={selectCheckbox}/>
                            <label htmlFor="thai">Thai</label><br />
                        </li>
                        <li>
                            <input type="checkbox" id="Chinese" name="diet" defaultValue="Chinese" checked={checkedBoxes.has("Chinese") ? true : false}  onChange={selectCheckbox}/>
                            <label htmlFor="Chinese">Chinese</label><br />
                        </li>
                        <li>
                            <input type="checkbox" id="Mediterranean" name="diet" defaultValue="Mediterranean" checked={checkedBoxes.has("Mediterranean") ? true : false}  onChange={selectCheckbox}/>
                            <label htmlFor="Mediterranean">Mediterranean</label><br />
                        </li>
                        <li>
                            <input type="checkbox" id="Filipino" name="diet" defaultValue="Filipino" checked={checkedBoxes.has("Filipino") ? true : false}  onChange={selectCheckbox}/>
                            <label htmlFor="Filipino">Filipino</label><br />
                        </li>
                        <li>
                            <input type="checkbox" id="Greek" name="diet" defaultValue="Greek" checked={checkedBoxes.has("Greek") ? true : false}  onChange={selectCheckbox}/>
                            <label htmlFor="Greek">Greek</label><br />
                        </li>
                        <li>
                            <input type="checkbox" id="Mexican" name="diet" defaultValue="Mexican" checked={checkedBoxes.has("Mexican") ? true : false} onChange={selectCheckbox}/>
                            <label htmlFor="Mexican">Mexican</label><br />
                        </li>
                        </ul>
                    </div>
                    </div>
                </div>
                </div>
                <div className="exit-filter">
                <button className="cancel" onClick={cancelFilter}>Cancel</button>
                <button className="clear" onClick={clearAll}>Clear</button>
                </div>
            </div>
            <div className={sidebar ? 'opacitySet' : 'noOpacity'}>
            </div>
            <div id="mainContent">
                <div id="mainButtons">
                <div id="section-one-buttons">
                    <button className="buttons" id="side-button" onClick={displaySidebar}>
                        <IoFilterSharp />
                        Filter
                    </button>
                    <div id="price-drop-down">
                    <button id="priceDropDownBttn" className="buttons" onClick={selectPriceDropDown} >
                        Price
                        <IoMdArrowDropdown className={priceDropDown ? 'up-novis' : 'down-vis'}/>
                        <IoMdArrowDropup className={priceDropDown ? 'down-vis' : 'up-novis'}/>

                    </button>
                    <ul id="price-checkboxes" className={priceDropDown ? 'down-vis' : 'up-novis'}>
                        <li>
                        <input type="checkbox" id="affordable-d" name="affordable" defaultValue="affordable" checked={checkedBoxes.has("affordable") ? true : false} onChange={selectCheckbox}/>
                        <label htmlFor="affordable-d">$</label> <br /> 
                        </li>
                        <li>
                        <input type="checkbox" id="semi-affordable-d" name="semi-affordable" defaultValue="semi-affordable" checked={checkedBoxes.has("semi-affordable") ? true : false} onChange={selectCheckbox}/>
                        <label htmlFor="semi-affordable-d">$$</label> <br /> 
                        </li>
                        <li>
                        <input type="checkbox" id="semi-expensive-d" name="semi-expensive" defaultValue="semi-expensive" checked={checkedBoxes.has("semi-expensive") ? true : false} onChange={selectCheckbox}/>
                        <label htmlFor="semi-expensive-d">$$$</label> <br />  
                        </li>
                        <li>
                        <input type="checkbox" id="expensive-d" name="expensive" defaultValue="expensive" checked={checkedBoxes.has("expensive") ? true : false} onChange={selectCheckbox}/>
                        <label htmlFor="expensive-d">$$$$</label> <br />  
                        </li>
                    </ul>
                    </div>
                </div>
                <div id="section-two-buttons">
                    <button className= {selectedMainButtons.has("open-main") ? 'buttonsOn' : 'buttonsOff' } onClick={selectMainButton} id="open-main">Open Now</button> 
                    <button className= {selectedMainButtons.has("reservation-main") ? 'buttonsOn' : 'buttonsOff' } onClick={selectMainButton}  id="reservation-main">Reservation</button>
                    <button className= {selectedMainButtons.has("delivery-main") ? 'buttonsOn' : 'buttonsOff' } onClick={selectMainButton} id="delivery-main">Offers Delivery</button>
                    <button className= {selectedMainButtons.has("takeout-main") ? 'buttonsOn' : 'buttonsOff' } onClick={selectMainButton} id="takeout-main">Offers Takeout</button>
                </div>
                </div>
            </div>
        </div>
      </>
    );
  }


export default FilterPage; 