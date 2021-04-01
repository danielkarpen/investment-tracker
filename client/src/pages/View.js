import { Button } from '@chakra-ui/react';
import api from 'api';
import { InvestmentView, PartnerForm } from 'components';
import { AuthContext, InvestmentsContext } from 'context';
import { useContext, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Link, useHistory, useParams } from 'react-router-dom';

function View() {
  const { loggedInUser } = useContext(AuthContext);
  const { investments } = useContext(InvestmentsContext);
  const history = useHistory();
  const { id } = useParams();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!loggedInUser) {
      history.push('/');
    }
  }, [history, loggedInUser]);

  const addPartner = useMutation(
    payload => api.partner.create(payload)
    // {
    //   onSuccess: data => {
    //     // Tell react query to 4get about current data and re-fetch it.
    //     queryClient.setQueryData('investments', currentInvestments => {
    //       /**
    //        * 1. Find the updated investment in the `currentData`
    //        * 2. Add the new partner to that data
    //        */
    //       console.log(
    //         'AFTER SUCCSS DATA',
    //         currentInvestments.find(
    //           ({ investment: investmentName }) =>
    //             investmentName === data.investment
    //         )
    //       );

    //       return currentInvestments;
    //     });
    //   },
    // }
  );

  const handleSubmit = async function (event) {
    event.preventDefault();

    const input = Object.fromEntries(new FormData(event.target));
    const payload = {
      investmentName: activeInvestment.investment,
      newPartner: {
        name: input.name,
        ownership: Number(input.ownership),
        contribution: Number(input.contribution),
        email: input.email,
      },
    };

    addPartner.mutate(payload);
    event.target.reset();
  };

  const activeInvestment = investments?.find(
    investment => investment._id === id
  );

  return (
    <>
      <div className="flex flex-row justify-between">
        <h1>
          {activeInvestment.investment} - Value: ${activeInvestment.value}{' '}
        </h1>
      </div>
      <div>
        <Link to="/dashboard">
          <Button
            colorScheme="red"
            className="mt-2 min-w-208"
            variant="outline"
          >
            Return to Dashboard
          </Button>
        </Link>
        {activeInvestment ? (
          <PartnerForm
            className="min-w-208"
            activeInvestment={activeInvestment}
            handler={handleSubmit}
          />
        ) : (
          // TODO{daniel.karpan}: Do something 🆒 here.
          <p>Loading...</p>
        )}
      </div>
      {activeInvestment ? (
        <>
          <InvestmentView investment={activeInvestment} />
        </>
      ) : (
        // TODO{daniel.karpan}: Do something 🆒 here.
        <p>Loading...</p>
      )}
    </>
  );
}

export default View;
