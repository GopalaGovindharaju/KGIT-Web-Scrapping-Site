import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './email.css'

function EmailVerify() {
    const { token } = useParams();
    const { username } = useParams();
    const [closePage, setClosePage] = useState(false);

    const handleEmailVerify = () =>{
        const data = {
            token: token
          }
    
          axios.post('http://localhost:3001/api/emailVerify/', data)
          .then((response) => {
            console.log(response.data);
            setClosePage(true);

          })
          .catch((error) => {
            console.log(error);
          })
    }
  return (
    <>{closePage ? <p>You may Login now</p> : <div class="activation__wrapper">
    <div class="activation__container">
      <div class="activation__header"><img class="activation__logo" src="http://hortonworks.com/wp-content/uploads/2013/10/Fusionex-Logo-New.png" alt='hello' /></div>
      <div class="activation__subject">Fusionex GIANT Activation Link</div>
      <div class="activation__arrow"></div>
      <div class="activation__message">
        <div> Dear, <span class="activation__user">{username}</span>
          <br/>Thank you for choosing Fusionex GIANT.</div>
      </div>
      <div class="activation__link">
        <div>
          Click on the following link to activate your account:
        </div>
        <div class="activation__btn" onClick={handleEmailVerify}>Activate your account here</div>
      </div>
      <div class="activation__footer">
        Thank you. Sincerely,
        <br/> Fusionex GIANT Support Team
        <br/>
      </div>
    </div>
  </div>}</>
  );
}

export default EmailVerify;
