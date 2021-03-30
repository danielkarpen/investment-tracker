import {
  Button,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function InvestmentView({ investment }) {
  return (
    <>
      <Link to="/dashboard">
        <Button colorScheme="blue">Return to Dashboard</Button>
      </Link>
      <Table variant="simple">
        <TableCaption>{investment.investment}</TableCaption>
        <Thead>
          <Tr>
            <Th>Partners</Th>
            <Th>Ownership</Th>
            <Th>Initial Investment</Th>
          </Tr>
        </Thead>
        {investment.partners.map(({ name, ownership, contribution }, index) => (
          <Tbody key={index}>
            <Tr>
              <Td>{name}</Td>
              <Td>{ownership}%</Td>
              <Td>{contribution}</Td>
            </Tr>
          </Tbody>
        ))}
      </Table>
    </>
  );
}

InvestmentView.propTypes = {
  investment: PropTypes.shape({
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
export default InvestmentView;
