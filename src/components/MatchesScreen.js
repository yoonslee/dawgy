import React, { useContext, useState } from "react";

import Layout from "./Layout";

import DogsContext from "../contexts/DogsContext";

import UserContext from "../contexts/UserContext";

function MatchesScreen() {
  const [dogs, setDogs] = useContext(DogsContext);
  const [user, setUser] = useContext(UserContext);

  const [selectedMatchId, setSelectedMatchId] = useState();

  return (
    <>
      <Layout>
        <div>Matches</div>

        <div>
          {[...user.matches].reverse().map(m => {
            const dogIndex = dogs.findIndex(d => d.id === m.id);

            const d = dogs[dogIndex];

            return (
              <div
                key={d.id}
                className={`${selectedMatchId === d.id ? "active" : ""}`}
                onClick={() => setSelectedMatchId(d.id)}
              >
                <img src={d.photo} alt="dog" />
                <div>{d.breed}</div>
                <div>{m.date.toString()}</div>
              </div>
            );
          })}
        </div>

        {user.matches.length === 0 ? (
          <div>No match</div>
        ) : (
          <div>
            {selectedMatchId ? (
              <div>
                Selected Match conversation
                <button>Woof</button>
                <button>Bark</button>
                <button>Growl</button>
                <button>Pant</button>
                <button>Sniff</button>
              </div>
            ) : (
              <div>Select a match</div>
            )}
          </div>
        )}
      </Layout>
    </>
  );
}

export default MatchesScreen;
