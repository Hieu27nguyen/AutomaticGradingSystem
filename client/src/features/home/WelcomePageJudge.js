import React from 'react';
import useAuth from '../../hooks/useAuth';
import '../../style/WelcomePage.css'; // Import your CSS file for styling

const WelcomePageJudge = () => {
  const { username } = useAuth();

  return (
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

  );
};

export default WelcomePageJudge;
