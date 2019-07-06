import React, { useContext } from "react";
import { navigate } from "@reach/router";

import UserContext from "../contexts/UserContext";

import Layout from "./Layout";

import { INPUTS } from "../data/inputHelpers";
import RadioButton from "./RadioButton";

function StartScreen() {
  const [user, setUser] = useContext(UserContext);

  return (
    <Layout>
      <div id="startScreen">
        <h2>Create Profile</h2>
        <form
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <div
            className="profilePhoto"
            style={{ backgroundImage: `url(${user.photo})` }}
          />

          <div className="formFields">
            <div className="genderAndBreedRow">
              <label id="selectGender">
                <h3>Gender</h3>
                <div>
                  <RadioButton
                    id="buttonMale"
                    className={`${
                      user.gender === "M" ? "active radioButton" : "radioButton"
                    }`}
                    onClick={() => setUser(user => ({ ...user, gender: "M" }))}
                  >
                    Male
                  </RadioButton>

                  <RadioButton
                    id="buttonFemale"
                    className={`${
                      user.gender === "F" ? "active radioButton" : "radioButton"
                    }`}
                    onClick={() => setUser(user => ({ ...user, gender: "F" }))}
                  >
                    Female
                  </RadioButton>
                </div>
              </label>

              <label id="inputBreed">
                <h3>Breed</h3>
                <input value={user.breed} readOnly disabled />
              </label>
            </div>

            <div className="bioRow">
              <label>
                <h3>Bio</h3>
                <div>
                  <textarea
                    value={user.bio}
                    readOnly
                    disabled
                    rows={3}
                    placeholder="To add content, tap on buttons below"
                  />
                  <div id="textareaInputs">
                    {Object.keys(INPUTS).map(inputKey => {
                      const { text } = INPUTS[inputKey];

                      return (
                        <button
                          key={inputKey}
                          onClick={() => {
                            setUser(user => ({
                              ...user,
                              bio: `${user.bio} ${text}`
                            }));
                          }}
                        >
                          {text}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </label>
            </div>

            <div>
              <button
                id="buttonCreateProfile"
                onClick={() => {
                  let isValid = true;

                  if (isValid) {
                    setUser(user => ({ ...user, created: true }));
                    navigate("/explore");
                  }
                }}
              >
                Create Profile
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default StartScreen;
