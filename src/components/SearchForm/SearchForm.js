import React from 'react';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm() {

    return (
         <section className='search-form'>
            <div className='search-form__box'>
                <form className='search-form__container'>
                    <input
                        required
                        type="text"
                        name="search"
                        placeholder="Фильм"
                        id='search-input'
                        className='search-form__input'
                        maxLength="40" />
                    <button type='submit' className='search-form__submit-button'>
                        Поиск
                    </button>

                </form>
                <FilterCheckbox />
            </div>
         </section>
    )
}

export default SearchForm;