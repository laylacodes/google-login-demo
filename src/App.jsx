import { useAuth0 } from "@auth0/auth0-react";

const NAMESPACE = "https://your-app.example.com";

function App() {
  const {
    isLoading,
    isAuthenticated,
    user,
    error,
    loginWithRedirect,
    logout,
  } = useAuth0();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Authentication error: {error.message}</p>;
  }

  if (!isAuthenticated) {
    return (
      <main>
        <h1>Howdy! 👋</h1>
        <p>You are not signed in.</p>
        <button
          onClick={() =>
            loginWithRedirect({
              authorizationParams: {
                connection: "google-oauth2",
              },
            })
          }
        >
          Sign in with Google
        </button>
      </main>
    );
  }

  const favoriteFramework = user[`${NAMESPACE}/favorite_framework`];

  return (
    <main>
      <h1>You're signed in!</h1>
      {user.picture && (
        <img src={user.picture} alt={user.name} width="80" height="80" />
      )}
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      {favoriteFramework && <p>Favorite framework: {favoriteFramework}</p>}

      <button
        onClick={() =>
          logout({
            logoutParams: {
              returnTo: window.location.origin,
            },
          })
        }
      >
        Log out
      </button>
    </main>
  );
}

export default App;