import React, { useEffect, useContext } from "react";

import UserContext from "../contexts/UserContext";

function Conversation({ selectedDog, conversation, converse }) {
  return (
    <div>
      <button>...</button>
      <button>Report</button>
      <button>Underage Pup</button>
      <button>Not Interested</button>
      <button>Scam / Bot</button>
      Selected Match conversation
      {conversation.map(c => (
        <div key={c.id}>
          {c.message}
          {c.createdAt.toString()}
          {/* <img src={selectedDog.photo} alt="Your match" /> */}
        </div>
      ))}
      <button onClick={() => converse(selectedDog.id, "Woof")}>Woof</button>
      <button onClick={() => converse(selectedDog.id, "Bark")}>Bark</button>
      <button onClick={() => converse(selectedDog.id, "Growl")}>Growl</button>
      <button onClick={() => converse(selectedDog.id, "Pant")}>Pant</button>
      <button onClick={() => converse(selectedDog.id, "Sniff")}>Sniff</button>
    </div>
  );
}

export default Conversation;
