// export function useSignIn(){
//     return async function(next){
//         const response = await fetch('http://localhost:8080/api/auth/login',{
//                 method : 'POST',
//                 body : JSON.stringify({
//                 email : email.current.value,
//                 password : password.current.value
//             }),
//             headers : {
//                 'Content-Type' : 'application/json; charset=UTF-8'
//             }
//         })
//         if(response.status === 200){
//             const token = response.headers.get('token');
//             localStorage.setItem('token',token);
//             changeStatus(true);
//             localStorage.setItem('isLoggedIn','true')
//             next ? navigate(`/${next}`) : navigate('/profile');
//         } else if(response.status === 400 || response.status === 401) {
//             const message = await response.json();
//             setErrorMessage(message);
//         }
//     }
// }