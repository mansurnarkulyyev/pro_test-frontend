import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../../shared/components/FormInput';
import s from "./contacts.module.scss"

import { addUserInfo } from '../../shared/api/userInfo';
import Button from '../../shared/components/Button';
import classNames from 'classnames';


function TeamRegister() {

    const handleSubmit = (e) => {
        e.preventDefault();

        let data = new FormData(e.target);
        const result = Object.fromEntries(data.entries())
        console.log(result);
        addUserInfo(result);
    }

    const history = useNavigate();

    const addUserData = async (token) => {
        history("/contacts")
    }

    return (
        <form className={s.form} onSubmit={handleSubmit}>
            <input name="cover" type="file" enctype="multipart/form-data" />
            <FormInput name="name" placeholder="Name" />
            <FormInput name="position" placeholder="Title" />
            <FormInput name="about" placeholder="Lorem text" />
            <Button
                className={classNames("button", "text", "focus", "top")}
                type="submit"
                text="Submit"
                onClick={addUserData}
            />
        </form>
    )
}

export default TeamRegister;


