import React, { useContext } from "react";

import Layout from "./Layout";

import DogsContext from "../contexts/DogsContext";
import UserContext from "../contexts/UserContext";

function ExploreScreen() {
  const [dogs, setDogs] = useContext(DogsContext);
  const [user, setUser] = useContext(UserContext);

  function likeDog(id) {
    const MATCH_RATE_INCREMENT = 0.01;

    // copy dogs array
    const copyOfLikes = [...user.likes];

    // grab dog by id by finding index in array first
    const likeIndex = copyOfLikes.findIndex(like => like === id);

    // if found, skip; otherwise, push id
    if (likeIndex === -1) copyOfLikes.push(id);
    else return;

    setUser(user => ({
      ...user,
      likes: copyOfLikes,
      matchRate: user.matchRate + MATCH_RATE_INCREMENT
    }));
  }

  function skipDog(id) {
    // copy dogs array
    const copyOfSkips = [...user.skips];

    // grab dog by id by finding index in array first
    const skipIndex = copyOfSkips.findIndex(skip => skip === id);

    // if found, skip; otherwise, push id
    if (skipIndex === -1) copyOfSkips.push(id);
    else return;

    setUser(user => ({ ...user, skips: copyOfSkips }));
  }

  return (
    <>
      <Layout>
        <div>Explore</div>
        <div>
          {dogs
            .filter(
              d =>
                user.skips.findIndex(id => id === d.id) === -1 &&
                user.likes.findIndex(id => id === d.id) === -1
            )
            .map((d, i) => {
              if (i > 0) {
                return (
                  <div key={d.id}>
                    <img src={d.photo} alt="dog" />
                    <div>{d.breed}</div>

                    <div>
                      <button onClick={() => skipDog(d.id)}>Skip</button>
                      <button onClick={() => likeDog(d.id)}>Like</button>
                    </div>
                  </div>
                );
              }

              return null;
            })}
        </div>
      </Layout>
    </>
  );
}

export default ExploreScreen;
