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
import { Link } from 'react-router-dom';

const InvestmentView = () => {
  return (
    <>
      <Link to="/dashboard">
        <Button colorScheme="blue">Return to Dashboard</Button>
      </Link>
      <Table variant="simple">
        <TableCaption>Rental Property</TableCaption>
        <Thead>
          <Tr>
            <Th>Partners</Th>
            <Th>Ownership</Th>
            <Th>Total Equity</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>John</Td>
            <Td>50%</Td>
            <Td>$70,000</Td>
          </Tr>
          <Tr>
            <Td>Jacob</Td>
            <Td>30%</Td>
            <Td>$42,000</Td>
          </Tr>
          <Tr>
            <Td>Jingleheimer</Td>
            <Td>20%</Td>
            <Td>$28,000</Td>
          </Tr>
        </Tbody>
      </Table>
    </>
  );
};

export default InvestmentView;
