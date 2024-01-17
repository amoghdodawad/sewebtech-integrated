import { Navigate } from "react-router-dom";
// import { toast } from "react-toastify";
import toast from "react-hot-toast";
function Protected({ isLoggedIn, children, next }){
  if (!isLoggedIn) {
    return <Navigate to={{
      pathname : '/login',
      search : '?next='+next
    }} replace />;
  }
  if(next === 'admin' && localStorage.getItem('role') !== 'admin'){
    toast.error('You are not logged in as admin', {
      duration : 2000
    });
    return <Navigate to={`/faculty`} replace/>
  }
  return children;
};
export default Protected;