import {
  Button,
  ButtonGroup,
  Collapse,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import api from 'api';
import { useReducer } from 'react';
import { useHistory } from 'react-router-dom';

// state, action (it's from the dispatcher)
function reducer(state, { type, payload }) {
  switch (type) {
    case 'activate-collapsed-mode':
      return { ...state, ...{ mode: 'collapsed', info: '' } };
    case 'activate-expanded-mode':
      return { ...state, ...{ mode: 'expanded', info: '' } };
    default:
      throw new Error('Illegal 🙅🏾‍♂️ action! 💣');
  }
}

function InvestmentForm() {
  const [formState, dispatch] = useReducer(reducer, { mode: 'collapsed' });
  const history = useHistory();

  const handleClick = ({ target: { innerText } }) => {
    if (innerText === 'Add Investment') {
      dispatch({ type: 'activate-expanded-mode' });
    } else {
      dispatch({ type: 'activate-collapsed-mode' });
    }
  };

  const handleSubmit = async function (event) {
    event.preventDefault();
    // TODO: Actually handle all of the fields
    const investment = Object.fromEntries(new FormData(event.target));

    switch (formState.mode) {
      case 'collapsed':
        api.auth.show();
        break;
      case 'expanded':
        api.auth.create(investment.name, investment.partners).catch(error => {
          dispatch({ type: 'update-info', payload: error.message });
        });
        break;
      default:
        throw new Error('Illegal 🙅🏾‍♂️ action!');
    }
  };

  function renderSubmitTxt(mode) {
    switch (formState.mode) {
      case 'collapsed':
        return 'Add Investment';
      case 'expanded':
        return 'Create Investment';
      default:
        throw new Error('Illegal form mode');
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Collapse in={formState.mode === 'expanded'} animateOpacity unmountOnExit>
        <FormControl id="name" isRequired>
          <FormLabel>Investment Name</FormLabel>
          <Input type="name" name="name" />
        </FormControl>

        <FormControl id="Partners" isRequired>
          <FormLabel>Number of Partners</FormLabel>
          <Input type="number" name="partners" />
        </FormControl>

        <ButtonGroup variant="outline" spacing="6">
          <Button type="submit" colorScheme="green">
            {renderSubmitTxt(formState.mode)}
          </Button>
        </ButtonGroup>
      </Collapse>

      <Button type="button" colorScheme="blue" onClick={handleClick}>
        {formState.mode === 'collapsed' ? 'Add Investment' : 'Cancel'}
      </Button>

      {formState.info ? <p className="text-red-300">{formState.info}</p> : null}
    </form>
  );
}

export default InvestmentForm;
