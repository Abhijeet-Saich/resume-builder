import React from 'react';
import { FaChevronRight } from 'react-icons/fa6';
import {GoogleAuthProvider,GithubAuthProvider, signInWithRedirect} from 'firebase/auth';
import { auth } from '../config/firebase.config';


const AuthButton = ({Icon,label,provider}) => {

  const googleAuthProvider = new GoogleAuthProvider();
  const githubAuthProvider = new GithubAuthProvider();



  const handleClick = async() =>{
    switch(provider){
      case "GoogleAuthProvider" : {
        await signInWithRedirect(auth,googleAuthProvider)
                            .then((result)=>{console.log(result)})
                            .catch((err) => console.log(`Error  : ${err.message}`));
        break;
      }
        
      case "GithubAuthProvider" : {
        await signInWithRedirect(auth,githubAuthProvider)
                            .then((result)=>{console.log(result)})
                            .catch((err) => console.log(`Error  : ${err.message}`));
        break;
      }
      default  : {
        await signInWithRedirect(auth,googleAuthProvider)
                            .then((result)=>{console.log(result)})
                            .catch((err) => console.log(`Error  : ${err.message}`));
        break;
    }
  }
}

  return (
    <div onClick={handleClick} className='w-full px-4 py-3 flex items-center justify-between rounded-md cursor-pointer
                    border-2 border-blue-700 active:scale-95 duration-150 hover:shadow-md hover:bg-blue-700'>
        <Icon className="text-xl"/>
        <p className='text-lg'>
          {label}
        </p>
        <FaChevronRight />
    </div>
  )
}

export default AuthButton