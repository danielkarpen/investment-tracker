import {
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

function InvestmentView({ investment }) {
  return (
    <>
      <h1>{investment.investment}</h1>
      <h2>Value: ${investment.value}</h2>

      <Table variant="simple">
        <TableCaption></TableCaption>
        <Thead>
          <Tr>
            <Th>Partners</Th>
            <Th>Ownership</Th>
            <Th>Initial Investment</Th>
            <Th>Current Value</Th>
          </Tr>
        </Thead>
        {investment.partners.map(({ name, ownership, contribution }, index) => (
          <Tbody key={index}>
            <Tr>
              <Td>{name}</Td>
              <Td>{ownership}%</Td>
              <Td>${contribution}</Td>
              <Td>${investment.value * (ownership * 0.01)}</Td>
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
