import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Notification.module.sass';

const Notification = ({ message, contestId/**, navigate**/ }) => {
  const navigate = useNavigate();
  return (
    <div>
      <br />
      <span>{message}</span>
      <br />
      {contestId && (
        <span
          onClick={() => navigate(`/contest/${contestId}`)}
          className={styles.goToContest}
        >
          Go to contest
        </span>
      )}
    </div>
  );
};

export default Notification;

/**import React from 'react';
import { withRouter } from 'react-router-dom';
import styles from './Notification.module.sass';

const Notification = props => (
  <div>
    <br />
    <span>{props.message}</span>
    <br />
    {props.contestId && (
      <span
        onClick={() => props.history.push(`/contest/${props.contestId}`)}
        className={styles.goToContest}
      >
        Go to contest
      </span>
    )}
  </div>
);

export default withRouter(Notification);**/
