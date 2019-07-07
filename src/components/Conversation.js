import React, { useContext, useEffect, useRef } from "react";
import { INPUTS } from "../data/inputHelpers";

import UserContext from "../contexts/UserContext";

function Conversation({ selectedDog, conversation, converse }) {
  const [user] = useContext(UserContext);

  const convoRef = useRef(null);

  function scrollToBottom() {
    convoRef.current.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    scrollToBottom();
  }, [conversation.length]);

  return (
    <div className="conversation">
      {/* <button>...</button>
      <button>Report</button>
      <button>Underage Pup</button>
      <button>Not Interested</button>
      <button>Scam / Bot</button> */}
      {/* Selected Match conversation */}

      <div className="convo" id="convo">
        {conversation.map(c => {
          let fromUser = false;
          if (c.from === user.id) {
            fromUser = true;
          }

          return (
            <div key={c.id} className={`msg ${fromUser ? "user" : ""}`}>
              {!fromUser && (
                <div
                  className="imgContainer"
                  style={{ backgroundImage: `url(${selectedDog.photo})` }}
                />
              )}
              <span>{c.message}</span>
              {fromUser && (
                <div
                  className="imgContainer"
                  style={{ backgroundImage: `url(${user.photo})` }}
                />
              )}
              {/* {c.createdAt.toString()} */}
            </div>
          );
        })}
        <div id="convoRef" ref={convoRef} />
      </div>

      <div id="conversationInputs">
        {Object.keys(INPUTS).map(inputKey => {
          const { text } = INPUTS[inputKey];

          return (
            <button
              key={inputKey}
              onClick={() => {
                converse(selectedDog.id, text);
              }}
            >
              {text}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Conversation;
