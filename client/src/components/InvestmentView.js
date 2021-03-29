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

function InvestmentView({ investment, value, partners }) {
  return (
    <>
      <Link to="/dashboard">
        <Button colorScheme="blue">Return to Dashboard</Button>
      </Link>
      <Table variant="simple">
        <TableCaption>{investment}</TableCaption>
        <Thead>
          <Tr>
            <Th>Partners</Th>
            <Th>Ownership</Th>
            <Th>Initial Investment</Th>
          </Tr>
        </Thead>
        {partners.map(({ id, name, ownership, contribution }) => (
          <Tbody key={id}>
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
  investment: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  partners: PropTypes.array.isRequired,
  pname: PropTypes.string.isRequired,
};
export default InvestmentView;
