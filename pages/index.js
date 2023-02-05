import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';

import API from '../API';
import CustomeLoader from '../components/CustomeLoader';
import ErrorMessage from '../components/ErrorMessage';
import { USER_DATA_KEY } from '../utils/constants';
import Mail from '../components/SVGS/Mail';
import Password from '../components/SVGS/Password';

export default function Index() {
  const router = useRouter();

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  // Login handler
  const handleLogin = async () => {

    setLoading(true);
    setErrors();

    const payLoad = {
      username: username,
      password: password
    }

    try {
      const { data } = await API.post('/api/auth/login', payLoad);

      if (data) {
        setCookie(USER_DATA_KEY, data);
        toast("You are successfully Logged in")
        router.push('/admin/agenda');
      }
    } catch (error) {
      console.log(error)
      const { data: err } = error?.response;
      setErrors(err);
      if (err?.non_field_errors) toast.error(err?.non_field_errors[0])
    }
    setLoading(false);
  }
  return (
    <>
      {loading && <CustomeLoader />}
      <ToastContainer position="top-center" autoClose={10000} />
      <Head>
        <title>Bilancia Web</title>
        <meta name="description" content="Grocery Login page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='w-full h-full bg-primaryExtraLight py-0 lg:py-28'>
        <section className='container h-full lg:h-[733px] bg-white'>
          <div className='w-full h-full lg:flex gap-5 xl:gap-0 border border-[#D6F1DA] rounded-xl'>
            <div className='w-full h-full lg:w-[434px] bg-primaryLight flex justify-center items-center rounded-xl'>
              <img src='/images/logo.png' alt='Logo' className='w-[150px] h-[150px] md:w-[225px] md:h-[225px]' />
            </div>
            <section className='flex-1 flex items-center px-8 py-10 sm:py-16 lg:py-0 lg:px-0'>
              <div className='w-full md:w-[497px] mx-auto'>
                <h1 className='text-2xl md:text-[28px] font-semibold text-center'>Login Now</h1>
                <form className='mt-9 md:mt-14' onSubmit={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}>
                  <div className='w-full mb-5 md:mb-10'>
                    <label className='text-sm md:text-base text-black'>Email</label>
                    <div className='w-full h-[45px] md:h-[60px] rounded-[14px] border border-primary bg-[#F7F7F7] mt-2 px-5 flex items-center'>
                      <Mail />
                      <input
                        type="text"
                        className="w-full border-none bg-transparent text-base focus:outline-none ml-4"
                        onChange={(e) => setUserName(e.target.value)}
                        value={username}
                      />
                    </div>
                    {errors?.username && <ErrorMessage message={errors?.username?.[0]} />}
                  </div>
                  <div className='w-full'>
                    <label className='text-sm md:text-base text-black'>Password</label>
                    <div className='w-full h-[45px] md:h-[60px] rounded-[14px] border border-primary bg-[#F7F7F7] mt-2 px-5 flex items-center'>
                      <Password />
                      <input
                        type="password"
                        className="w-full border-none bg-transparent text-base focus:outline-none ml-4"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      />
                    </div>
                    {errors?.password && <ErrorMessage message={errors?.password[0]} />}
                  </div>
                  <div className='text-right mt-2'>
                    <Link href='/auth/forget_password'>
                      <span className='text-xs text-black font-[500] cursor-pointer'>
                        Forget password?
                      </span></Link>
                  </div>
                  <div className='mt-9 md:mt-16 flex flex-wrap gap-y-5 justify-between'>
                    <Link href="/auth/register">
                      <div className='w-[130px] h-[40px] md:w-[199px] md:h-[48px] rounded-xl bg-primaryExtraLight text-sm md:text-base border border-primary flex justify-center items-center'>
                        Register
                      </div>
                    </Link>
                    <button
                      className='w-[130px] h-[40px] md:w-[199px] md:h-[48px] rounded-xl bg-primary text-sm md:text-base text-white border border-primary font-light'
                      type='submit'
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </section>
      </main>
    </>
  )
}
