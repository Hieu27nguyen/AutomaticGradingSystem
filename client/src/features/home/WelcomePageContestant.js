import React from 'react';
import ContestImage1 from '../../img/contest1.jpg';
import ContestImage2 from '../../img/contest2.jpg';
import ContestImage3 from '../../img/contest3.jpg';
import '../../style/ContestantWelcomePage.css'
const WelcomePageContestant = () => {
  return (
    <div className="welcome-page-contestant">
      <h1>Welcome to the Puget Sound Coding Competition!</h1>

      <p>
        Get ready for an exciting coding challenge! Join us in this competition hosted at the
        University of Washington - Tacoma, where participants from colleges and universities across
        the Puget Sound region show off their coding skills.
      </p>

      <h2>Contest Scene</h2>
      <div className="previous-contests">
        <img src={ContestImage1} alt="Previous Contest 1" />
        <img src={ContestImage2} alt="Previous Contest 2" />
        <img src={ContestImage3} alt="Previous Contest 3" />
      </div>

      <p>
        Whether you're a coding pro or just starting, this competition is your chance to shine.
        Good luck, and may your code lead you to success in the Puget Sound Coding Competition!
      </p>
    </div>
  );
};

export default WelcomePageContestant;
