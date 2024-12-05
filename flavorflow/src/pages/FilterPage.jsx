import React from 'react';
import '../styles/FilterPage.css';
import {  useState } from 'react';
import { IoFilterSharp } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io"; 
import { IoMdArrowDropup } from "react-icons/io"; 
import { GoStar } from "react-icons/go";
import {mainFeatures, seeMoreFeatures, seeMoreCategories, prices, upper, maxMapVal, milesToMeters} from '../utils/filterData.js'; 
import MapPage from './MapPage';

function FilterPage() {
    const [show, setShow] = useState({
        sideButton: false, 
        seeMoreC: false, 
        seeMoreF: false, 
        priceDropDown: false, 
    }); 
    const showDisplay = (e) => {
        setShow({
            ...show, [e.target.value] : !show[e.target.value], 
        }); 
    }
    const [clearFilter, setClear] = useState(false); 
    const clearAll = () => {
        selectedPriceButtons.clear(); 
        selectedCategoryButtons.clear(); 
        selectedMainButtons.clear(); 
        selectedStars.clear(); 
        checkedBoxes.clear(); 
        setClear(!clearFilter); 
    }; 

    const [selectedPriceButtons, setPriceButtons] = useState(new Map()); 
    const selectPriceButton = (e) => {
        let priceButtonID = e.target.id; 
        if(selectedPriceButtons.has(priceButtonID) || checkedBoxes.has(priceButtonID)){
            for(let priceButton of selectedPriceButtons.keys()){
                if(priceButton === priceButtonID){
                    selectedPriceButtons.delete(priceButton); 
                }
            }
            for(let priceButton of checkedBoxes.keys()){
                if(priceButton === priceButtonID){
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
                if(mainButton === mainButtonID){
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
                if(categoryButton === categoryButtonID){
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
                if(starButton === starID){
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
    const [inputDistance, setInputDistance] = useState("0 mi"); 
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
        if(selectedStars.size !== 0 && inputDistance !== "0 mi"){
            const highestStar = maxMapVal(selectedStars); 
            let appliedfiltersmap1 =  [...selectedMainButtons, ...checkedBoxes, ...selectedCategoryButtons, ...selectedPriceButtons, [highestStar, "rating"], [milesToMeters(inputDistance.substring(0,inputDistance.length-3)), "distance"]];  
            return appliedfiltersmap1; 
        }
        else if(selectedStars.size !== 0){
            const highestStar = maxMapVal(selectedStars); 
            let appliedfiltersmap1 =  [...selectedMainButtons, ...checkedBoxes, ...selectedCategoryButtons, ...selectedPriceButtons, [highestStar, "rating"]];  
            return appliedfiltersmap1; 
        }
        else if(inputDistance !== "0 mi"){
            let appliedfiltersmap1 =  [...selectedMainButtons, ...checkedBoxes, ...selectedCategoryButtons, ...selectedPriceButtons,[milesToMeters(inputDistance.substring(0,inputDistance.length-3)), "distance"]];  
            return appliedfiltersmap1; 
        }

        let appliedfiltersmap1 =  [...selectedMainButtons, ...checkedBoxes, ...selectedCategoryButtons, ...selectedPriceButtons]; 
        return appliedfiltersmap1; 
    }

    function showAppliedFilters(){
        let appliedfiltersmap1 =  [...selectedMainButtons, ...checkedBoxes, ...selectedCategoryButtons, ...selectedPriceButtons]; 
        appliedfiltersmap1.forEach((item)=>{
            if(item[0] === "affordable"){
                item[0] = '$'; 
            }
            if(item[0] === "semi-affordable"){
                item[0] = '$$'; 
            }
            if(item[0] === "semi-expensive"){
                item[0] = '$$$'; 
            }
            if(item[0] === "expensive"){
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
    let unchangedMap =  appliedFilters(); 
   

    function cancelFilter(){
        clearAll(); 
        setShow(false); 
    }
   
    return (
      <>
        <style>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        </style>
    <div id="pageContent">
        <div>
            <div className={`${'sidebar'} ${show.sideButton ? 'sidebar-vis' : 'sidebar-novis'}`} >
                <div className="filter-box">
                    <button className='close-button' value="sideButton" onClick={showDisplay}>X</button>  
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
                    <div className="price-buttons" > 
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
                            <ul className = "features pageList">
                              {mainFeatures.map((item, index)=>(
                                <li key={index}>
                                    <input type="checkbox" id={item[1]} name="diet" defaultValue={item[1]} checked={checkedBoxes.has(item[1]) ? true : false} onChange={selectCheckbox}/>
                                    <label htmlFor={item[1]}>{item[0]}</label> 
                                </li>
                            ))}
                            </ul>
                    <button value = "seeMoreF" onClick={showDisplay} className="see-more" id="see-more-features">See More</button>
                    <div id="seeMoreF" className={show.seeMoreF ? 'see-more-f-vis' : 'see-more-f-novis'}>
                        <button value ="seeMoreF" className='close-button' onClick={showDisplay}>X</button> 
                        <ul className="pageList">
                            {seeMoreFeatures.map((item, index)=>(
                                    <li key={index}>
                                        <input type="checkbox" id={item[1]} name="diet" defaultValue={item[1]} checked={checkedBoxes.has(item[1]) ? true : false} onChange={selectCheckbox}/>
                                        <label htmlFor={item[1]}>{item[0]}</label> 
                                    </li>
                                ))}
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
                        <button value="seeMoreC" className="see-more"  onClick={showDisplay}>See More</button> 
                    
                    <div id="seeMoreC" className={show.seeMoreC ? 'see-more-c-vis' : 'see-more-c-novis'}> 
                        <button className='close-button' value="seeMoreC" onClick={showDisplay}>X</button> 
                        <ul className="pageList">
                            {seeMoreCategories.map((item, index)=>(
                                        <li key={index}>
                                            <input type="checkbox" id={item[1]} name="diet" defaultValue={item[1]} checked={checkedBoxes.has(item[1]) ? true : false} onChange={selectCheckbox}/>
                                            <label htmlFor={item[1]}>{item[0]}</label> 
                                        </li>
                                    ))} 
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
            <div className={show.sidebar ? 'opacitySet' : 'noOpacity'}>
            </div>
            <div id="mainContent">
                <div id="mainButtons">
                <div id="section-one-buttons">
                    <button id="priceDropDownBttns" value = "sideButton" className="sideButton buttons" onClick={showDisplay}>
                        <IoFilterSharp />
                        Filter
                    </button>
                    <div id="price-drop-down">
                    <button id="priceDropDownBttn" value = "priceDropDown" className="buttons" onClick={showDisplay} >
                        Price
                        <IoMdArrowDropdown className={show.priceDropDown ? 'up-novis' : 'down-vis'}/>
                        <IoMdArrowDropup className={show.priceDropDown ? 'down-vis' : 'up-novis'}/>
                    </button>
                    <ul id="price-checkboxes" className={show.priceDropDown ? 'down-vis' : 'up-novis'}>
                    {prices.map((item, index)=>(
                                            <li key={index}>
                                                <input type="checkbox" id={item[1]} name="price" defaultValue={item[1].slice(0,-2)} checked={checkedBoxes.has(item[1].slice(0,-2)) ? true : false} onChange={selectCheckbox}/>
                                                <label htmlFor={item[1]}>{item[0]}</label> 
                                            </li>
                                        ))} 
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
        <div className="filter-map-container">
            <MapPage filterValue={unchangedMap}/>
        </div>
        
    </div>
      </>
    );
  }

export default FilterPage;