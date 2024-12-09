import React from 'react';
import { IconContext } from "react-icons";
import { FaLocationDot } from "react-icons/fa6";
const Marker=() => {
    return( 
        <div>
            <IconContext.Provider value={{size: "3em", color:"orange"}}>
                <FaLocationDot />
             </IconContext.Provider>
        </div>

    )
}
export default Marker; 