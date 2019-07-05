import React, { useContext, useState } from "react";
import uuidv4 from "uuid/v4";

import Layout from "./Layout";

import DogsContext from "../contexts/DogsContext";

import UserContext from "../contexts/UserContext";
import Conversation from "./Conversation";

function MatchesScreen() {
  const [dogs, setDogs] = useContext(DogsContext);
  const [user, setUser] = useContext(UserContext);

  const [selectedMatchId, setSelectedMatchId] = useState();

  function converse(to, text) {
    const copyOfMatches = [...user.matches];

    const matchIndex = copyOfMatches.findIndex(m => m.id === to);

    if (matchIndex === -1) return;

    copyOfMatches[matchIndex].conversation.push({
      id: uuidv4(),
      from: user.id,
      to,
      date: new Date(),
      text
    });

    setUser(user => ({ ...user, matches: copyOfMatches }));
  }

  const selectedMatchIndex = user.matches.findIndex(
    m => m.id === selectedMatchId
  );

  const selectedDogIndex = dogs.findIndex(d => d.id === selectedMatchId);

  let selectedMatch;
  let selectedDog;

  if (selectedMatchId !== -1) {
    selectedMatch = user.matches[selectedMatchIndex];
  }
  if (selectedMatchId !== -1) {
    selectedDog = dogs[selectedDogIndex];
  }

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
            {selectedMatch ? (
              <Conversation
                conversation={selectedMatch.conversation}
                selectedDog={selectedDog}
                converse={converse}
              />
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
