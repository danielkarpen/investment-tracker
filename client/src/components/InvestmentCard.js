import { Button, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function InvestmentCard({ userInvestments, handler }) {
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
      {userInvestments?.map(
        ({ _id: id, investment: investmentName, value }, index) => (
          <Tbody key={index}>
            <Tr data-name={investmentName}>
              <Td>{investmentName}</Td>
              <Td>${value}</Td>
              <Td>
                <Link to={`/${id}`}>
                  <Button colorScheme="blue" variant="outline">
                    View
                  </Button>
                </Link>
              </Td>
              <Td>
                <Button colorScheme="red" variant="outline" onClick={handler}>
                  Delete
                </Button>
              </Td>
            </Tr>
          </Tbody>
        )
      )}
    </Table>
  );
}

InvestmentCard.propTypes = {
  userInvestments: PropTypes.array.isRequired,
  handler: PropTypes.func.isRequired,
};

export default InvestmentCard;
