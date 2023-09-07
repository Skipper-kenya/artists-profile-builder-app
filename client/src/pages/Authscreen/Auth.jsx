import React from "react";
import "./auth.css";
import { UserFocus } from "phosphor-react";
import { Link } from "react-router-dom";
const Auth = ({
  isLogin,
  username,
  setUsername,
  password,
  setPassword,
  password2,
  setPassword2,
  handleSubmit,
  phone,
  setPhone,
  dob,
  setDob,
}) => {
  return (
    <form className="auth" onSubmit={handleSubmit}>
      <h3>{isLogin ? "Login" : "Register"}</h3>
      <p>
        <UserFocus size={30} color="orangered" />
      </p>

      <GenerateInputs
        isLogin={isLogin}
        label="Username"
        typ="text"
        name="username"
        placeholder="user@ke"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />

      <GenerateInputs
        isLogin={isLogin}
        label="Password"
        typ="password"
        name="password"
        placeholder="********"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      {!isLogin ? (
        <>
          <GenerateInputs
            isLogin={isLogin}
            label="Confirm Password"
            typ="password"
            name="password2"
            placeholder="********"
            value={password2}
            onChange={(e) => {
              setPassword2(e.target.value);
            }}
          />
          <GenerateInputs
            isLogin={isLogin}
            label="Phone"
            name="phone"
            typ="number"
            placeholder="0712345678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <GenerateInputs
            isLogin={isLogin}
            label="Date of birth"
            name="dob"
            placeholder=""
            typ="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </>
      ) : (
        ""
      )}

      {isLogin ? (
        <>
          <small>
            Don't have an account? <Link to="/register">Register</Link>
          </small>
        </>
      ) : (
        <>
          <small>
            have an account? <Link to="/login">Login</Link>
          </small>
        </>
      )}

      <button type="submit" onClick={handleSubmit}>
        {isLogin ? "Login" : "Create Account"}
      </button>
    </form>
  );
};

export const GenerateInputs = (props) => {
  return (
    <div className="inputs">
      <label htmlFor="password2">{props.label}</label>
      <input
        name={props.name}
        type={props.typ}
        id={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onKeyUp={props.handleKeyUp}
        onChange={props.onChange}
      />
      <small>
        {props.isLogin ? (
          ""
        ) : (
          <>
            {props.name === "username" ? "*use atleast 5 characters" : ""}
            {props.name === "password" ? "*use atleast 6 characters" : ""}
          </>
        )}
      </small>
    </div>
  );
};

export default Auth;
