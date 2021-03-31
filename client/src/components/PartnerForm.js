import {
  Button,
  ButtonGroup,
  Collapse,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import api from 'api';
import { AuthContext } from 'context';
import PropTypes from 'prop-types';
import { useContext, useReducer } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';

// state, action (it's from the dispatcher)
function reducer(state, { type, payload }) {
  switch (type) {
    case 'activate-collapsed-mode':
      return { ...state, ...{ mode: 'collapsed', info: '' } };
    case 'activate-expanded-mode':
      return { ...state, ...{ mode: 'expanded', info: '' } };
    case 'update-info':
      return { ...state, ...{ info: payload } };
    default:
      throw new Error('Illegal 🙅🏾‍♂️ action! 💣');
  }
}

function PartnerForm({ activeInvestment }) {
  const [formState, dispatch] = useReducer(reducer, { mode: 'collapsed' });
  const history = useHistory();
  const { loggedInUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const addPartner = useMutation(newPartner => api.partner.create(newPartner), {
    onSuccess: () => {
      // Tell react query to 4get about current data and re-fetch it.
      queryClient.invalidateQueries('investments');
    },
  });

  const handleClick = ({ target: { innerText } }) => {
    if (innerText === 'Add Partner') {
      dispatch({ type: 'activate-expanded-mode' });
    } else {
      dispatch({ type: 'activate-collapsed-mode' });
    }
  };

  const handleSubmit = async function (event) {
    event.preventDefault();

    const input = Object.fromEntries(new FormData(event.target));
    const partner = {
      investment: activeInvestment.investment,
      partner: {
        name: input.name,
        ownership: Number(input.ownership),
        contribution: Number(input.contribution),
        email: input.email,
      },
    };

    addPartner.mutate(partner);
    event.target.reset();
  };

  function renderSubmitTxt(mode) {
    switch (formState.mode) {
      case 'expanded':
        return 'Create New Partner';
      default:
        return 'Create New Partner';
    }
  }

  return (
    <>
      <form className="flex flex-col gap-2 min-w-208" onSubmit={handleSubmit}>
        <Button
          type="button"
          className="mt-2 min-w-208"
          colorScheme="blue"
          variant="outline"
          onClick={handleClick}
        >
          {formState.mode === 'collapsed' ? 'Add Partner' : 'Cancel'}
        </Button>
        <Collapse
          in={formState.mode === 'expanded'}
          animateOpacity
          unmountOnExit
        >
          <FormControl id="name" isRequired>
            <FormLabel>Partner Name</FormLabel>
            <Input type="text" name="name" />
          </FormControl>

          <FormControl id="ownership" isRequired>
            <FormLabel>Ownership Percentage</FormLabel>
            <Input type="number" name="ownership" />
          </FormControl>

          <FormControl id="contribution" isRequired>
            <FormLabel>Contribution</FormLabel>
            <Input type="number" name="contribution" />
          </FormControl>

          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" name="email" />
          </FormControl>

          <ButtonGroup variant="outline" spacing="6">
            <Button type="submit" className="mt-4" colorScheme="green">
              {renderSubmitTxt(formState.mode)}
            </Button>
          </ButtonGroup>
        </Collapse>

        {formState.info ? (
          <p className="text-red-300">{formState.info}</p>
        ) : null}
      </form>
    </>
  );
}

PartnerForm.propTypes = {
  activeInvestment: PropTypes.shape({
    investment: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    partners: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        ownership: PropTypes.number,
        contribution: PropTypes.number,
      })
    ).isRequired,
  }),
};

export default PartnerForm;
