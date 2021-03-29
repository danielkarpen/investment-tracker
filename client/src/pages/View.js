import { Box } from '@chakra-ui/react';
import api from 'api';
import { InvestmentView } from 'components';
import { AuthContext } from 'context';
import { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';

function View() {
  const { loggedInUser } = useContext(AuthContext);
  const history = useHistory();

  const fetchInvestments = async () => {
    const results = await api.db.index({ email: loggedInUser?.email });
    return results;
  };

  useEffect(() => {
    if (!loggedInUser) {
      history.push('/');
    }
  }, [history, loggedInUser]);

  const { isError, data, error } = useQuery('investments', fetchInvestments, {
    enabled: Boolean(loggedInUser),
  });

  if (isError) {
    return <Box className="text-red-500">{error.message}</Box>;
  }

  return (
    <>
      {data?.map(({ _id: id, investment, value, partners }) => (
        <InvestmentView
          key={id}
          investment={investment}
          value={value}
          partners={partners}
        />
      ))}
    </>
  );
}

export default View;
