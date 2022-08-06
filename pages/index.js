import React from "react";
import style from "../styles/Home.module.css";
import shortid from "shortid";
import { useAppContext } from "../context/state";

export default function Home() {
  const { user, setAuthState } = useAppContext();
  const [formData, setFormData] = React.useState({
    userId: shortid.generate(),
  });

  function updateFormData(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className={style.Home}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setAuthState(formData);
          window.location.href = "/register-event";
        }}
      >
        <h2>Basic Details</h2>
        <label>
          Name
          <input type="text" name="name" onChange={updateFormData} />
        </label>
        <label>
          Email
          <input type="text" name="email" onChange={updateFormData} />
        </label>
        <label>
          <button type="submit">Submit</button>
        </label>
      </form>
    </div>
  );
}
