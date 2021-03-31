import { Box } from '@chakra-ui/react';
import api from 'api';
import { InvestmentCard, InvestmentForm } from 'components';
import { AuthContext, InvestmentsContext } from 'context';
import { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';

function Dashboard() {
  const { loggedInUser } = useContext(AuthContext);
  const { updateInvestments } = useContext(InvestmentsContext);
  const history = useHistory();

  // TODO{Daniel K.}: Use try-catch in these asyncs
  const fetchInvestments = async () => {
    const results = await api.db.index({ email: loggedInUser?.email });
    return results;
  };

  const handleDelete = async event => {
    const results = await api.db.delete(
      event.target.closest('tr').dataset.name
    );
    return results;
  };

  useEffect(() => {
    if (!loggedInUser) {
      history.push('/');
    }
  }, [history, loggedInUser]);

  // 'investments' will be referenced in InvestmentForm to update the results
  const { isError, data, error } = useQuery('investments', fetchInvestments, {
    enabled: Boolean(loggedInUser?.email),
  });

  if (isError) {
    return <Box className="text-red-500">{error.message}</Box>;
  }

  if (data?.length) {
    updateInvestments(data);
  }

  return (
    <>
      <p>
        Hello,&nbsp;
        {loggedInUser?.email === process.env.REACT_APP_INVESTMENTS_ADMIN
          ? 'Admin'
          : loggedInUser?.displayName}
      </p>
      <InvestmentForm />
      <InvestmentCard userInvestments={data} handler={handleDelete} />
    </>
  );
}

export default Dashboard;
