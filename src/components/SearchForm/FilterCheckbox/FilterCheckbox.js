import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox(){
    
    const [value, setValue] = React.useState('');

    const [isSelected, setIsSelected] = React.useState(true)

    function handleChange(e) {
    setValue(e.target.value);
    }

    function toggleFilterCheckbox() {
        if( isSelected === false) {
            setIsSelected(true)
        }
        else{setIsSelected(false)}
    }

    return(
        <div className='filter-checkbox'>
            <div className={`filter-checkbox__form ${
              isSelected ? 'filter-checkbox__form_active' : ''
            }`} onClick={toggleFilterCheckbox}>
                <input 
                    required
                    type='checkbox'
                    name="checkbox"
                    value={value}
                    onChange={handleChange}
                    id='filter-checkbox'
                    className='filter-checkbox__tub'/>
                <div className={`filter-checkbox__button ${
              isSelected ? 'filter-checkbox__button_active' : ''
            }`}></div>
            </div>
                <p className='filter-checkbox__text'>Короткометражки</p>
        </div>
    )
}

export default FilterCheckbox;