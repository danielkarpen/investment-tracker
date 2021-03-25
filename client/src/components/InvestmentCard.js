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

const InvestmentCard = () => {
  return (
    <Table variant="simple">
      <TableCaption>Investments</TableCaption>
      <Thead>
        <Tr>
          <Th>Investment</Th>
          <Th>Investment Amount</Th>
          <Th>Current Value</Th>
          <Th> </Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>Bitcoin</Td>
          <Td>$3500</Td>
          <Td>$54,000</Td>
          <Td>
            <Link to="/view">
              <Button colorScheme="blue">View</Button>
            </Link>
          </Td>
        </Tr>
        <Tr>
          <Td>Rental Property</Td>
          <Td>$120,000</Td>
          <Td>$140,000</Td>
          <Td>
            <Link to="/view">
              <Button colorScheme="blue">View</Button>
            </Link>
          </Td>
        </Tr>
        <Tr>
          <Td>Creative Apparel LLC</Td>
          <Td>$4500</Td>
          <Td>$15,000</Td>
          <Td>
            <Link to="/view">
              <Button colorScheme="blue">View</Button>
            </Link>
          </Td>
        </Tr>
      </Tbody>
    </Table>
  );
};

export default InvestmentCard;
