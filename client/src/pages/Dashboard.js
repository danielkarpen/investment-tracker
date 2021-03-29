import { Box } from '@chakra-ui/react';
import api from 'api';
import { InvestmentCard, InvestmentForm } from 'components';
import { AuthContext } from 'context';
import { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';

function Dashboard() {
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
    enabled: Boolean(loggedInUser?.email),
  });

  if (isError) {
    return <Box className="text-red-500">{error.message}</Box>;
  }

  // useEffect(() => {
  //   (async () => {
  //     // TODO: 🐛 Review this for the log out crashing!
  //     const { email } = loggedInUser;
  //     const resp = await api.db.index({ email });
  //     setData(() => resp);
  //   })();
  // }, [loggedInUser]);

  return (
    <>
      <p>
        Hello,&nbsp;
        {loggedInUser?.email === process.env.REACT_APP_INVESTMENTS_ADMIN
          ? 'Admin'
          : loggedInUser?.name}
      </p>
      <InvestmentForm />
      {data?.map(({ _id: id, investment, value }) => (
        <InvestmentCard key={id} investment={investment} value={value} />
      ))}
    </>
  );
}

export default Dashboard;
