import classNames from "classnames";
import { useNavigate } from "react-router";

import useForm from "../../../shared/hooks/useForm";

import FormField from "../../../shared/components/FormField";
import Button from "../../../shared/components/Button";

import { initialState } from "../../../data/initialStateAuth.js";

import s from "./signUpForm.module.scss";

function SignUpForm({ onSubmit }) {
  const navigate = useNavigate();
  const { state, handleChange, handleSubmit, validateEmail, validatePassword } =
    useForm({
      onSubmit,
      initialState,
    });
  const { email, password, message } = state;
  const goToSignIn = () => {
    navigate("/signin");
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <FormField
        type="email"
        name="email"
        value={email}
        placeholder="Email"
        required
        handleChange={handleChange}
        handleBlur={validateEmail}
      />
      <FormField
        name="password"
        value={password}
        placeholder="Password"
        type="password"
        handleBlur={validatePassword}
        required
        handleChange={handleChange}
      />
      <div className={s[`wrapper-btn`]}>
        <Button
          className={classNames("button", "text", "focus", "auth")}
          type="submit"
          text="Sign up"
        />
        <Button
          className={classNames("button", "text", "base", "auth")}
          type="button"
          text="Sign in"
          onClick={goToSignIn}
        />
      </div>
    </form>
  );
}
export default SignUpForm;

/* 
const [email, setEmail] = React.useState("");
const [message, setMessage] = React.useState("");
const emailValidation = () => {
  const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
  if (regEx.test(email)) {
     setMessage("Valid Email");
     } else if (!regEx.test(email`enter code here`) && email !== "") {
          setMessage("Invalid email");
     } else {
         setMessage("");
     }
}
const handleOnChange = (e)=> {
     setEmail(e.target.value);
}
    <input id="email" className="input" type="email" placeholder="email" value={email} onChange={handleOnChange} />
    <button onClick={emailValidation}>Check</button>
    <p className="message">{message}</p> */
