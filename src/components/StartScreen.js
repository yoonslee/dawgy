import React, { useContext } from "react";
import { navigate } from "@reach/router";

import UserContext from "../contexts/UserContext";

import Layout from "./Layout";

import { INPUTS } from "../data/inputHelpers";

function StartScreen() {
  const [user, setUser] = useContext(UserContext);

  return (
    <Layout>
      <div id="startScreen">
        <div className="maxWidth">
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
              <h2>Create Profile</h2>
              <div className="genderAndBreedRow">
                <label id="selectGender">
                  <h3>Gender</h3>
                  <div>
                    <button
                      id="buttonMale"
                      className={`${user.gender === "M" ? "active" : ""}`}
                      onClick={() =>
                        setUser(user => ({ ...user, gender: "M" }))
                      }
                    >
                      M
                    </button>
                    <button
                      id="buttonFemale"
                      className={`${user.gender === "F" ? "active" : ""}`}
                      onClick={() =>
                        setUser(user => ({ ...user, gender: "F" }))
                      }
                    >
                      F
                    </button>
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
                    <textarea value={user.bio} readOnly disabled rows={3} />
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

          {/* <div>Platinum</div> */}
        </div>
      </div>
    </Layout>
  );
}

export default StartScreen;
