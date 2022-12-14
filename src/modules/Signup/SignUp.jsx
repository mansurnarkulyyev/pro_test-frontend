import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { NotificationManager } from "react-notifications";

import useAuthState from "../../shared/hooks/useAuthState";

import { signupRequest } from "../../redux/auth/auth-operations";

import AuthCommonPart from "../../shared/components/AuthCommonPart";
import Title from "../../shared/components/Title";
import SignUpForm from "./SignUpForm";

import s from "./signUp.module.scss";

function SignUp() {
  const dispatch = useDispatch();
  const auth = useAuthState();

  const { error, loading, email } = auth;
  const errMessage = error?.data.message;

  const onSingUp = (data) => {
    dispatch(signupRequest(data));
  };

  return (
    <div className={s.wrapper}>
      <AuthCommonPart />
      {!email ? (
        <SignUpForm onSubmit={onSingUp} error={errMessage} loading={loading} />
      ) : (
        <div className={s["wrapper-title"]}>
          <Title
            className="signup"
            text="You have been registered successfully"
          />
          <Link className={s.link} to="/signin">
            Sign In
          </Link>
        </div>
      )}
      {error && NotificationManager.error(errMessage)}
    </div>
  );
}
export default SignUp;
