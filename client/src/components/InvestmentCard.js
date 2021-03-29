import { Button, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function InvestmentCard({ investment, value }) {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Investment</Th>
          <Th>Current Value</Th>
          <Th> </Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>{investment}</Td>
          <Td>{value}</Td>
          <Td>
            <Link to="/view">
              <Button colorScheme="blue">View</Button>
            </Link>
          </Td>
        </Tr>
      </Tbody>
    </Table>
  );
}

InvestmentCard.propTypes = {
  investment: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default InvestmentCard;
