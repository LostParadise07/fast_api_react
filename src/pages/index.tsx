import logo from "./../logo.svg";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { logout, getUser } from "../service/auth";
import * as React from "react";
import { Typography } from "@mui/material";

function Index() {
  const [Auth, setAuth] = React.useState(false);
  const [User, setUser] = React.useState(Object);

  React.useEffect(() => {
    getUser()
      .then((data) => {
        setUser(data);
        setAuth(true);
      })
      .catch((error) => {
        console.warn(error.message);
      });
  }, []);

  const handleLogout = () => {
    logout();
    setAuth(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {Auth ? (
          <div>
            <Typography
              variant="h4"
              gutterBottom
              component="div"
              align="center"
              mt={3}
            >
              Welocome back! {User.username}
            </Typography>
            <Button
              variant="contained"
              size="large"
              color="primary"
              href="/dashboard"
              sx={{ mb: 2 }}
            >
              Search Article
            </Button>
            <Button
              variant="contained"
              size="large"
              color="error"
              onClick={handleLogout}
              sx={{ mb: 2 }}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Stack direction="row" spacing={2} sx={{ my: 1, mb: 2 }}>
            <Button
              variant="contained"
              size="large"
              color="success"
              href="/signin"
            >
              Sign In
            </Button>
          </Stack>
        )}
      </header>
    </div>
  );
}

export default Index;
