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
import { Bar } from 'react-chartjs-2';

function InvestmentView({ investment }) {
  const labels = investment?.partners.map(_ => {
    return _.name;
  });
  const ownershipData = investment?.partners.map(_ => {
    return _.ownership;
  });
  var demoData = {
    labels: labels,
    datasets: [
      {
        label: 'Ownership %',
        data: ownershipData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
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
        {investment?.partners.map(
          ({ name, ownership, contribution }, index) => (
            <Tbody key={index}>
              <Tr>
                <Td>{name}</Td>
                <Td>{ownership}%</Td>
                <Td>${contribution}</Td>
                <Td>${investment.value * (ownership * 0.01)}</Td>
              </Tr>
            </Tbody>
          )
        )}
      </Table>
      <Bar data={demoData} width={100} height={50} options={options} />
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
