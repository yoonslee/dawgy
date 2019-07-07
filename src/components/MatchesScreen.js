import React, { useContext, useState } from "react";
import uuidv4 from "uuid/v4";

import Layout from "./Layout";

import DogsContext from "../contexts/DogsContext";

import UserContext from "../contexts/UserContext";
import Conversation from "./Conversation";

function MatchesScreen() {
  const [dogs] = useContext(DogsContext);
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
      <Layout isMatchesScreen={true}>
        <div className="matchesPage">
          {/* <h2>Matches</h2> */}
          <div className="matchesPane">
            {user.matches.length === 0 && (
              <div className="noMatches">No matches</div>
            )}

            {user.matches
              .sort((a, b) => {
                if (a.updatedAt.getTime() < b.updatedAt.getTime()) return 1;
                return -1;
              })
              .map(m => {
                const dogIndex = dogs.findIndex(d => d.id === m.id);

                const d = dogs[dogIndex];

                let lastMessage;

                if (m.conversation.length > 0) {
                  lastMessage =
                    m.conversation[m.conversation.length - 1].message;
                }

                const month = m.matchedAt.getMonth() + 1;
                const day = m.matchedAt.getDate();

                const formattedDate = `${day}/${month}`;

                return (
                  <div
                    key={d.id}
                    className={`match ${
                      selectedMatchId === d.id ? "active" : ""
                    }`}
                    onClick={() => {
                      setSelectedMatchId(d.id);
                      openConversation(d.id);
                    }}
                  >
                    <div
                      className="imgContainer"
                      style={{ backgroundImage: `url(${d.photo})` }}
                    />
                    <div className="matchInfo">
                      {/* <div>{d.breed}</div> */}
                      <div className="matchedAt">Matched {formattedDate}</div>
                      {lastMessage && (
                        <div className="lastMessage">{lastMessage}</div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
          <div>
            {selectedMatch && (
              <Conversation
                conversation={selectedMatch.conversation}
                selectedDog={selectedDog}
                converse={converse}
              />
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}

export default MatchesScreen;
