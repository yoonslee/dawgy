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

  function converse(to, message) {
    const copyOfMatches = [...user.matches];

    const matchIndex = copyOfMatches.findIndex(m => m.id === to);

    if (matchIndex === -1) return;

    const now = new Date();

    copyOfMatches[matchIndex].updatedAt = now;
    copyOfMatches[matchIndex].conversation.push({
      id: uuidv4(),
      from: user.id,
      to,
      createdAt: now,
      message,
      readByUser: true
    });

    setUser(user => ({ ...user, matches: copyOfMatches }));
  }

  function openConversation(matchId) {
    const copyOfMatches = [...user.matches];

    // grab match from match array by index
    const matchIndex = copyOfMatches.findIndex(m => m.id === matchId);

    // override selected match conversation, iterating through each and setting read to true
    copyOfMatches[matchIndex].conversation.forEach(c => {
      c.readByUser = true;
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
          {[...user.matches]
            .sort((a, b) => {
              if (a.updatedAt.getTime() < b.updatedAt.getTime()) return 1;
              return -1;
            })
            .map(m => {
              const dogIndex = dogs.findIndex(d => d.id === m.id);

              const d = dogs[dogIndex];

              return (
                <div
                  key={d.id}
                  className={`${selectedMatchId === d.id ? "active" : ""}`}
                  onClick={() => {
                    setSelectedMatchId(d.id);
                    openConversation(d.id);
                  }}
                >
                  <img src={d.photo} alt="dog" />
                  <div>{d.breed}</div>
                  <div>{m.matchedAt.toString()}</div>
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
