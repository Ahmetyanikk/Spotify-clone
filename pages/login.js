import {getProviders, signIn} from "next-auth/react";

function Login({ providers }) {
  return (
    <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
     <img className="w-52 mb-5 " src="https://links.papareact.com/9xl" alt=""/>

     {Object.values(providers).map((provider) =>(
  <h1></h1>
      ))}


    </div>
  )
}

export default Login;

export async function getServerSideProps(){
  const providers = await getProviders();

  return{
    props:{
      providers,
    },
  };
}