import { Box, ChakraProvider, Grid, theme } from '@chakra-ui/react';
import api from 'api';
import { AuthContext } from 'context';
import Layout from 'layout';
import { AboutPage, DashboardPage, HomePage, LoginPage } from 'pages';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    (async () => {
      const user = await api.auth.show();
      if (user) {
        setLoggedInUser(user);
      }
    })();
  });

  function toggleUser(user) {
    setLoggedInUser(() => user || null);
  }

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <AuthContext.Provider value={{ loggedInUser, toggleUser }}>
            <Layout>
              <Router>
                <Switch>
                  <Route exact path="/">
                    <HomePage />
                  </Route>
                  <Route exact path="/dashboard">
                    <DashboardPage />
                  </Route>
                  <Route exact path="/about">
                    <AboutPage />
                  </Route>
                  <Route exact path="/login">
                    <LoginPage />
                  </Route>
                </Switch>
              </Router>
            </Layout>
          </AuthContext.Provider>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
