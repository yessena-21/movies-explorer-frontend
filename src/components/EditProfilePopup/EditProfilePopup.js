
import React, { useEffect } from 'react';
//import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import useValidator from '../hooks/useFormAndValidation';
import './EditProfilePopup.css';
function EditProfile({ isOpen, onClose, onUpdateUser, isLoading }) {

    // const { values, handleChange, setValues } = useForm({});
    const { values, errors, isValid, handleChange, setValues } = useValidator({});
    const [isSubmitButtonActive, setIsSubmitButtonActive] = React.useState(false);
    const currentUser = React.useContext(CurrentUserContext);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser(values)
        ;
    }

    useEffect(() => {
        if ((values.email !== currentUser.email || values.name !== currentUser.name) && isValid) {
            setIsSubmitButtonActive(true);
        } else {
            setIsSubmitButtonActive(false);
        }

    }, [currentUser.email, currentUser.name, values, isOpen])

    React.useEffect(() => {
        values.name = currentUser.name;
        values.email = currentUser.email;
    }, [currentUser, isOpen]);

    return (
        <div className={`popup popup_type_edit-profile ${isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container">
            <h3 className="popup__title">Редактировать профиль</h3>
            <form className="form" name="edit-profile" onSubmit={handleSubmit}>
            <label className="form__input-label">Имя
                <input
                    className="form__input form__input-name"
                    id="form__input-name"
                    type="text"
                    name="name"
                    required
                    minLength="2"
                    maxLength="40"
                    value={values.name || ''}
                    onChange={handleChange}
                />
                {/* <span className="form__input-error form__input-name-error">{errors.name}</span> */}
                <ErrorMessage isActive={!isValid} errorText={errors.name || ''} />
            </label>
            <label className="form__input-label">E-mail
                <input
                    className="form__input form__input-description"
                    id="form__input-email"
                    type="email"
                    name="email"
                    required
                    minLength="2"
                    maxLength="200"
                    value={values.email || ''}
                    onChange={handleChange}
                />
                {/* <span className="form__input-error form__input-email-error">{errors.email}</span> */}
                <ErrorMessage isActive={!isValid} errorText={errors.email || ''} />
            </label>
                <button
                    className={`form__save-button button ${(!isValid || !isSubmitButtonActive) && 'form__save-button_disabled'}`}//"form__save-button form__save-button_submit"
                    type="submit"
                    disabled={(!isValid || !isSubmitButtonActive) && true}
                >{`${isLoading ? `Сохранение...` : `Сохранить`}`}</button>
            </form>
            <button className="popup__exit-button" type="button" onClick={onClose} />

        </div>
    </div>

        // <PopupWithForm
        //     name="edit-profile"
        //     title="Редактировать профиль"
        //     buttonText="Сохранить"
        //     isOpen={isOpen}
        //     onClose={onClose}
        //     onSubmit={handleSubmit}
        //     isLoading={isLoading}
        // >
 
        //</PopupWithForm>
    )
}

export default EditProfile