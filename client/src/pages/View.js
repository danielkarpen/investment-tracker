import { Button } from '@chakra-ui/react';
import { InvestmentView, PartnerForm } from 'components';
import { AuthContext, InvestmentsContext } from 'context';
import { useContext, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

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
      <Link to="/dashboard">
        <Button colorScheme="blue">Return to Dashboard</Button>
      </Link>
      {activeInvestment ? (
        <PartnerForm activeInvestment={activeInvestment} />
      ) : (
        // TODO{daniel.karpan}: Do something 🆒 here.
        <p>Loading...</p>
      )}
      {activeInvestment ? (
        <InvestmentView investment={activeInvestment} />
      ) : (
        // TODO{daniel.karpan}: Do something 🆒 here.
        <p>Loading...</p>
      )}
    </>
  );
}

export default View;
