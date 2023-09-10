import { UserCircleGear } from "phosphor-react";
import React, { useContext, useState } from "react";
import { BuildProvider } from "./BuildContext";

const BuildInputs = ({ handleSubmit, loading }) => {
  const { inputs, setInputs } = useContext(BuildProvider);

  const { fname, sname, genre, description, url, country } = inputs;

  const handleChanges = (e) => {
    const { name, value } = e.target;

    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form className="build-form">
      <h4>Build a profile</h4>
      <p>
        <UserCircleGear size={40} color="rgb(60, 165, 165)" />
      </p>
      <div className="names">
        <>
          <label htmlFor="fname">FirstName</label>
          <input
            name="fname"
            type="text"
            id="fname"
            value={fname}
            onChange={handleChanges}
          />
        </>
        <>
          <label htmlFor="sname">SecondName (optional)</label>
          <input
            name="sname"
            type="text"
            id="sname"
            value={sname}
            onChange={handleChanges}
          />
        </>
      </div>
      <label htmlFor="country">Country</label>
      <input
        name="country"
        type="text"
        id="country"
        value={country}
        onChange={handleChanges}
      />
      <label htmlFor="genre">Genre</label>
      <input
        name="genre"
        type="text"
        id="genre"
        value={genre}
        onChange={handleChanges}
      />
      <label htmlFor="url">Image Url</label>
      <input
        name="url"
        type="text"
        id="url"
        value={url}
        onChange={handleChanges}
      />
      <label htmlFor="description">Description</label>
      <textarea
        name="description"
        id="description"
        value={description}
        cols="10"
        rows="2"
        onChange={handleChanges}
      />
      <button onClick={handleSubmit}>
        {loading ? "Loading..." : "Create a Profile"}
      </button>
    </form>
  );
};

export default BuildInputs;
