import { Navigate } from "react-router-dom";
function UnProtected({ isLoggedIn, children }){
  if (isLoggedIn) {
    return <Navigate to="/faculty" replace />;
  }
  return children;
};
export default UnProtected;