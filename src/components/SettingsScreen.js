import React, { useState, useContext } from "react";
import Layout from "./Layout";

import UserContext from "../contexts/UserContext";
import Modal from "../components/Modal";

import close from "../images/close.svg";
import platinum from "../images/platinum.svg";
import diamond from "../images/diamond.svg";

function SettingsScreen() {
  const [user, setUser] = useContext(UserContext);
  const [showModal, setModal] = useState(false);

  return (
    <>
      <Layout>
        {/* <div>Settings</div> */}
        <div id="premiumSubscriptions">
          <h3>Premium Subscriptions</h3>
          <button
            className="buttonMain"
            onClick={() => setModal(showModal => !showModal)}
            disabled={user.platinum}
          >
            {user.platinum ? `Platinum Unlocked` : "Purchase"}
          </button>
          {user.platinum && (
            <span>Expires {user.platinumExpirationDate.toString()}</span>
          )}
          {user.platinum && (
            <div className="matchRateContainer">
              <h3>
                Match Rate <span>{user.matchRate}/10</span>
              </h3>

              <input
                id="matchRate"
                type="range"
                min={1}
                max={8}
                value={user.matchRate}
                onChange={e => {
                  const value = +e.target.value;
                  setUser(user => ({ ...user, matchRate: value }));
                }}
              />
            </div>
          )}
        </div>
      </Layout>
      {showModal && (
        <Modal>
          <div className="modal-inner settings">
            <button
              className="buttonClose"
              onClick={() => setModal(showModal => !showModal)}
            >
              <img src={close} alt="Close modal" />
            </button>

            <h2>Premium Subscriptions</h2>

            <div className="tiers">
              <div className="tierPanel" id="platinum">
                <div className="infoSection">
                  <h4>Platinum</h4>
                  <img
                    className="tierGraphic"
                    src={platinum}
                    alt="Platinum icon"
                  />

                  <div className="tierPrice">
                    <span className="dollar">$</span>
                    <span className="amount">49</span>
                    <span className="rate">{`/ m`}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    const now = new Date();

                    setUser(user => ({
                      ...user,
                      platinum: true,
                      platinumPurchaseDate: new Date(),
                      platinumExpirationDate: new Date(
                        now.setMonth(now.getMonth() + 1)
                      )
                    }));

                    setModal(showModal => !showModal);
                  }}
                >
                  Purchase
                </button>
              </div>

              <div className="tierPanel" id="diamond">
                <div className="infoSection">
                  <h4>Diamond</h4>
                  <img
                    className="tierGraphic"
                    src={diamond}
                    alt="Diamond icon"
                  />

                  <div className="tierPrice">
                    <span className="dollar">$</span>
                    <span className="amount">99</span>
                    <span className="rate">{`/ m`}</span>
                  </div>
                </div>
                <button disabled>Coming Soon</button>
              </div>
            </div>

            <div id="qAndA">
              <h3>What do I get with a Platinum subscription?</h3>
              <p>
                The ability to adjust your chance of success with dogs in your
                area. Thus, you are more likely to meet the perfect match for
                you!
              </p>

              <h3>How does billing work?</h3>
              <p>Monthly recurring billing! Of course, non-refundable.</p>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default SettingsScreen;
