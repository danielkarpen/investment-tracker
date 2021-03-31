import { Button, Heading } from '@chakra-ui/react';
import api from 'api';
import { ColorModeSwitcher } from 'ColorModeSwitcher';
import { AuthContext } from 'context';
import { useContext } from 'react';

const Header = () => {
  const { loggedInUser, toggleUser } = useContext(AuthContext);

  function handleClick() {
    api.auth
      .delete()
      .catch(error => {
        console.error(error.msg);
      })

      // Fail or not - reset the user
      .finally(() => {
        toggleUser(null);
      });
  }
  return (
    <header className="flex flex-row justify-between">
      <Heading fontSize="xl">Investment Tracker</Heading>
      <div>
        {loggedInUser ? (
          <Button
            colorScheme="orange"
            variant="outline"
            size="sm"
            onClick={handleClick}
            className="justify-self-end"
          >
            Logout
          </Button>
        ) : null}
        <ColorModeSwitcher className="justify-self-end place-content-end" />
      </div>
    </header>
  );
};
export default Header;
