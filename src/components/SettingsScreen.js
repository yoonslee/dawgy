import React, { useState, useContext } from "react";
import Layout from "./Layout";

import UserContext from "../contexts/UserContext";
import Modal from "../components/Modal";

function SettingsScreen() {
  const [user, setUser] = useContext(UserContext);
  const [showModal, setModal] = useState(false);

  return (
    <>
      <Layout>
        <div>Settings</div>
        <div>
          Platinum
          <button
            onClick={() => setModal(showModal => !showModal)}
            disabled={user.platinum}
          >
            {user.platinum
              ? `Purchased Platinum ${user.platinumPurchaseDate.toString()}`
              : "Purchase Platinum Subscription"}
          </button>
          {user.platinum && `Expires ${user.platinumExpirationDate.toString()}`}
        </div>

        <label htmlFor="matchRate">
          Match Rate
          <div>{user.matchRate}/10</div>
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
        </label>
      </Layout>
      {showModal && (
        <Modal>
          <div className="modal-inner">
            <button onClick={() => setModal(showModal => !showModal)}>
              Close
            </button>
            Would you like to purchase a 1-month Platinum subscription? Increase
            your rate of getting matches! Be shown to more dawgys in the area.
            Sick platinum-only theme! Of course, as always, no refunds and
            automatically recurring!
            <label>
              Credit / Debit
              <input
                id="credit-card"
                type="password"
                value="YOONISAGREATDEV!"
                readOnly
              />
            </label>
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
        </Modal>
      )}
    </>
  );
}

export default SettingsScreen;
