import { AuthContext, InvestmentsContext } from 'context';
import { useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

function View() {
  const { loggedInUser } = useContext(AuthContext);
  const { investments } = useContext(InvestmentsContext);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (!loggedInUser) {
      history.push('/');
    }
  }, [history, loggedInUser]);

  const activeInvestment = investments?.find(
    investment => investment._id === id
  );

  return (
    <>
      <p>{activeInvestment?.investment}</p>
    </>
  );
}

export default View;
