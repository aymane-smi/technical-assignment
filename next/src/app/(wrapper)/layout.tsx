"use client"
import { Button, ChakraProvider } from '@chakra-ui/react'
import "../globals.css"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; 
import { FaCameraRetro } from 'react-icons/fa';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [logged, setLogged] = useState<boolean>(false);
  useEffect(()=>{
    (async()=>{
      if(await Cookies.get("token") != undefined)
        setLogged(true);
    })();
  },[]);
  const handleLogout = ()=>{
    Cookies.remove("token");
    setLogged(false);
  }
  return (
    <html lang="en">
      <head>
        <title>Nextjs Assignement</title>
      </head>
      <body>
        <ChakraProvider>
          <ToastContainer 
            position='top-right'
            autoClose={2000}
            hideProgressBar={false}
            closeOnClick
          />
          <nav className='p-2 shadow-lg flex justify-between items-center w-max-screen'>
            <Link href="/">
              <FaCameraRetro color="#2B6CB0" size={40}/>
            </Link>
            {logged ? 
                      <Button colorScheme='blue' size="md" onClick={handleLogout}>Se deconnecter</Button> 
                    : 
                      <Link href="/login">
                        <Button colorScheme="blue" size="md">Se connecter</Button>
                      </Link>
            }
          </nav>
          {children}
        </ChakraProvider>
      </body>
    </html>
  )
}
