import { Navigate } from "react-router-dom";

function Protected({ isSignedIn, children }) {
  // Redirect to the home page if not signed in
  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default Protected;
