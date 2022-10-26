import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutRequest } from "../../../redux/auth/auth-operations";

import sprite from "../../../images/icons/sprite.svg";
import s from "./NavbarAuth.module.scss";

const NavbarAuth = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.auth.email);
  const avatar =  JSON.stringify(userName)
  const token = useSelector((state) => state.auth.token);
  return (
    <>
      <div className={s.NavAuth}>
        <div className={s.avatar + " " + s.marginleft}>{avatar.charAt(1)}</div>
        <div className={s.marginleft}>{userName}</div>
        <div className={s.logbtncontainer + " " + s.marginleft}>
          <button className={s.btn} type="button" onClick={() => dispatch(logoutRequest(token))}>
            <svg className={s.svg}>
              <use href={sprite + "#logout"}></use>
            </svg>
          </button>
        </div>
      </div>
      {/* <div className={s.NavAuth}>
        <div className={s.avatar}>P</div>
        <div className={s.margin}>Pavlo</div>
        <div className={s.log}>
          <button className={s.btn} type="button" onClick={() => dispatch(logoutRequest(token))}>
            <svg width="16px" height="16px">
              <use href={sprite + "#logout"}></use>
            </svg>
          </button>
        </div>
      </div> */}
    </>
  );
};

export default NavbarAuth;
