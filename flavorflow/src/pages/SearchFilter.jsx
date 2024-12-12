import React from 'react';
import '../styles/SearchFilter.css';
import {  useState } from 'react';
import SearchResultsPage from './SearchResultsPage.jsx';
import { GoStar } from "react-icons/go";
import { maxMapVal} from '../utils/filterData.js'; 

function SearchFilter() {
    const [selectedSearchButtons, setSearchButtons] = useState(new Map()); 
    const selectSearchButton = (e) => {
        let searchButtonID = e.target.id; 
        if(selectedSearchButtons.has(searchButtonID)){
            for(let searchButton of selectedSearchButtons.keys()){
                if(searchButton === searchButtonID){
                    selectedSearchButtons.delete(searchButton); 
                }
            }
            setSearchButtons(new Map(selectedSearchButtons)); 
        }
        else{
            setSearchButtons(() => {
                let myMap = new Map(selectedSearchButtons); 
                return myMap.set(searchButtonID, "mainButton"); 
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

    function appliedFilters(){

        if(selectedStars.size !== 0){
            const highestStar = maxMapVal(selectedStars); 
            let appliedfiltersmap1 =  [...selectedSearchButtons, [highestStar, "rating"]];  
            return appliedfiltersmap1; 
        }

        let appliedfiltersmap1 =  [...selectedSearchButtons]; 
        return appliedfiltersmap1; 
    }

    let unchangedMap =  appliedFilters(); 

    return(
        <>
            <div className = "searchFilterContainer">
                <button className={selectedSearchButtons.has("open-now") ? 'searchFilterButtonOn' : 'searchFilterButton' }  onClick={selectSearchButton} id="open-now" >Open Now</button>
                <button className={selectedSearchButtons.has("offers-delivery") ? 'searchFilterButtonOn' : 'searchFilterButton' }  onClick={selectSearchButton} id="offers-delivery" >Offers Delivery</button>
                <button className={selectedSearchButtons.has("offers-takeout") ? 'searchFilterButtonOn' : 'searchFilterButton' }  onClick={selectSearchButton} id="offers-takeout" >Offers Takeout</button> 
                <div className="rating-stars-search">
                        <GoStar id="star1" className={selectedStars.has("star1") ? 'starSearchColor' : 'noStarSearchColor'} onClick={selectStars}/>
                        <GoStar id="star2" className={selectedStars.has("star2") ? 'starSearchColor' : 'noStarSearchColor'} onClick={selectStars}/>
                        <GoStar id="star3" className={selectedStars.has("star3") ? 'starSearchColor' : 'noStarSearchColor'} onClick={selectStars}/>
                        <GoStar id="star4" className={selectedStars.has("star4") ? 'starSearchColor' : 'noStarSearchColor'} onClick={selectStars}/>
                        <GoStar id="star5" className={selectedStars.has("star5") ? 'starSearchColor' : 'noStarSearchColor'} onClick={selectStars}/>
                </div>
            </div>
             <SearchResultsPage filterValueSearch = {unchangedMap}/>
        </>  
    ); 
            
}

export default SearchFilter;