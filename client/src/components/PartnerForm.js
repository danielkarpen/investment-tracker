import {
  Button,
  ButtonGroup,
  Collapse,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useReducer } from 'react';

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

function PartnerForm({ activeInvestment, handler }) {
  const [formState, dispatch] = useReducer(reducer, { mode: 'collapsed' });

  const handleClick = ({ target: { innerText } }) => {
    if (innerText === 'Add Partner') {
      dispatch({ type: 'activate-expanded-mode' });
    } else {
      dispatch({ type: 'activate-collapsed-mode' });
    }
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
      <form
        className="flex flex-col gap-2 min-w-208"
        onSubmit={handler}
        data-active={activeInvestment}
      >
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
  handler: PropTypes.func.isRequired,
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
