import React from 'react';
import useAuth from '../../hooks/useAuth'
import ContestImage1 from '../../img/contest1.jpg';
import ContestImage2 from '../../img/contest2.jpg';
import ContestImage3 from '../../img/contest3.jpg';
import '../../style/ContestantWelcomePage.css';
import '../../style/WelcomePage.css'; 

const WelcomePageJudge = () => {
  const { username, status } = useAuth();

  return (
    <div>
      {status !== "CONTESTANT" ? (
        <div className="welcome-container judge-welcome">
          <header>
            <h1>Welcome, Judge {username}!</h1>
          </header>
          <section className='introduction'>
            <p>
              Welcome to our coding competition platform! Our application is designed to
              help with the process of hosting and participating in coding contests, making
              the experience enjoyable for both hosts and contestants.
            </p>
            <p>
              As a judge, you have will have these following privileges in the application to help
              with the process to host a coding competition:
            </p>
          </section>
          <section className="judge-features">
            <div className="feature-item">
              <h3>Manage Contestants</h3>
              <p>
                Easily manage the list of contestants participating in your competitions.
              </p>
            </div>
            <div className="feature-item">
              <h3>Prepare Problem Sets</h3>
              <p>
                Create and organize challenging problem sets to test the skills of the participating coders.
              </p>
            </div>

            <div className="feature-item">
              <h3>Host Competitions</h3>
              <p>
                Bring the coding community together by hosting engaging and competitive coding competitions.
              </p>
            </div>
          </section>


        </div>
      ) : (
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
      )}


    </div>
  );
};

export default WelcomePageJudge;
