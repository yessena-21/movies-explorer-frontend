import React from 'react';
import './infoTooltip.css'
function NothingFoundPopup(props){
    return(
        <infoTooltip titleText={`Ничего не найдено`} isOpen={props.isOpen} onClose={props.onClose}/>
    )
}

export default NothingFoundPopup;