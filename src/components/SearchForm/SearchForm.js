import React from 'react';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import './SearchForm.css';
import clearImg from "../../images/close-icon.svg";


function SearchForm({ handleSearch, handleClearSearch,
    searchAllFilms, searchShortFilms, isSelected, isSaved }) {

    const [keyword, setKeyword] = React.useState('');

    function handleKeyword(evt) {
        setKeyword(evt.target.value);
    }

    function handleClear() {
        setKeyword('');
        handleClearSearch();
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        if (!isSaved) {
            localStorage.setItem('keyword', keyword);
        } else {
            localStorage.setItem('keywordSaved', keyword);
        }
        handleSearch();
    }

    React.useEffect(() => {

        if (!isSaved) {
            const word = localStorage.getItem('keyword');
            if (word) {

                setKeyword(word)
            }
        } else {
            const word = localStorage.getItem('keywordSaved');
            if (word) {
                setKeyword(word)
            }
        }
    }
        , [])

        React.useEffect(() => {
            handleSearch()
        }, [isSelected])
  

    return (
        <section className='search-form'>
            <div className='search-form__box'>
                <form className='search-form__container' onSubmit={handleSubmit}>
                    <input
                        required
                        type="text"
                        name="search"
                        placeholder="Фильм"
                        id='search'
                        className='search-form__input'
                        maxLength="40"
                        onChange={handleKeyword}
                        value={keyword || ''}
                    />
                    <img src={clearImg} alt="clear" className="search-form__clear-button" onClick={handleClear}></img>

                    <button type='submit' className='search-form__submit-button' onSubmit={handleSubmit}>
                        Поиск
                    </button>

                </form>
                <FilterCheckbox isSelected={isSelected} searchShortFilms={searchShortFilms}
                    searchAllFilms={searchAllFilms} handleSearch={handleSearch}/>
            </div>
        </section>
    )
}

export default SearchForm;