import { Button, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function InvestmentCard({ id, investment, value, handler }) {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Investment</Th>
          <Th>Current Value</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr data-name={investment}>
          <Td>{investment}</Td>
          <Td>{value}</Td>
          <Td>
            <Link to={`/${id}`}>
              <Button colorScheme="blue">View</Button>
            </Link>
          </Td>
          <Td>
            <Button colorScheme="blue" onClick={handler}>
              Delete
            </Button>
          </Td>
        </Tr>
      </Tbody>
    </Table>
  );
}

InvestmentCard.propTypes = {
  id: PropTypes.string.isRequired,
  investment: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  handler: PropTypes.func.isRequired,
};

export default InvestmentCard;
