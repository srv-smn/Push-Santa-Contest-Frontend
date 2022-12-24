import React from 'react'
import * as PushAPI from "@pushprotocol/restapi";
import { useSigner, useAccount } from "wagmi";
import axios from "axios";

import "./About.css"
function About() {
         const { data: signer, isError, isLoading } = useSigner();
         const { address } = useAccount();
         async function Subscribe() {

           await PushAPI.channels.subscribe({
             signer: signer,
             channelAddress:
               "eip155:5:0x9147BDf9aaca01B5f2680633e254a9776ecB10e5", // channel address in CAIP
             userAddress: `eip155:5:${address}`, // user address in CAIP
             onSuccess: () => {
               console.log("opt in success");
             },
             onError: () => {
               console.error("opt in error");
             },
             env: "staging",
           });
           const baseURL = `https://expensive-tiara-colt.cyclic.app/user/add-user-details`;
           const data = JSON.stringify({
             walletAddress: address,
             name: "demoname",
           });
           const config = {
             method: "post",
             url: baseURL,
             headers: {
               "Content-Type": "application/json",
             },
             data: data,
           };
           let response = await axios(config);
           console.log(response);
         }

  return (
    <div className="main">
      <br />

      <h2>About Us</h2>

      <div className="h">
        <section>
          <img
            src="https://www.nicepng.com/png/detail/38-385668_push-notifications-push-notification-icon-png.png"
            alt=""
          />
          <div class="card">
            <p>Get notifications for free </p>
          </div>
        </section>{" "}
        <section>
          <img
            src="https://mpng.subpng.com/20180402/oiw/kisspng-computer-icons-business-finance-clip-art-tracking-5ac245188a6ef5.135644321522681112567.jpg"
            alt=""
          />
          <div class="card">
            <p>
              Stay informed about any changes to your balance{" "}
            </p>
          </div>
        </section>{" "}
        <section>
          <img
            src="https://cdn5.vectorstock.com/i/1000x1000/13/49/no-access-for-unauthorized-persons-prohibition-vector-24711349.jpg"
            alt=""
          />
          <div class="card">
            <p>Stay updated about all your Credit and Debit</p>
          </div>
        </section>
      </div>
      <div>
        <button className="btns" onClick={Subscribe}>
          Subscribe
        </button>
      </div>
    </div>
  );
}

export default About