import React, { useContext } from "react";

import Layout from "./Layout";

import DogsContext from "../contexts/DogsContext";
import LikesContext from "../contexts/LikesContext";
import SkipsContext from "../contexts/SkipsContext";

function ExploreScreen() {
  const [dogs, setDogs] = useContext(DogsContext);
  const [likes, setLikes] = useContext(LikesContext);
  const [skips, setSkips] = useContext(SkipsContext);

  function likeDog(id) {
    // copy dogs array
    const copyOfLikes = [...likes];

    // grab dog by id by finding index in array first
    const likeIndex = copyOfLikes.findIndex(like => like === id);

    // if found, skip; otherwise, push id
    if (likeIndex === -1) copyOfLikes.push(id);
    else return;

    setLikes(copyOfLikes);
  }

  function skipDog(id) {
    // copy dogs array
    const copyOfSkips = [...skips];

    // grab dog by id by finding index in array first
    const skipIndex = copyOfSkips.findIndex(skip => skip === id);

    // if found, skip; otherwise, push id
    if (skipIndex === -1) copyOfSkips.push(id);
    else return;

    setSkips(copyOfSkips);
  }

  return (
    <>
      <Layout>
        <div>Explore</div>
        <div>
          {dogs
            .filter(
              d =>
                skips.findIndex(id => id === d.id) === -1 &&
                likes.findIndex(id => id === d.id) === -1
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
