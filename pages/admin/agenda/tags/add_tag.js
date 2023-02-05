import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Link from 'next/link';
import Head from 'next/head';

import Layout from '../../../../components/Layout';
import Loader from '../../../../components/CustomeLoader';
import getHeader from '../../../../utils/getHeader';
import API from '../../../../API';
import ErrorMessage from '../../../../components/ErrorMessage';

const Index = () => {

    const header = getHeader();

    const [name, setName] = useState('');
    const [color, setColor] = useState('');

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    // Adding tag  
    const addTag = async () => {
        setLoading(true);
        setErrors([]);

        const payLoad = {
            name: name,
            color: color,
        }

        try {
            const { data } = await API.post('api/agenda/tag/', payLoad, header);
            if (data) {
                toast(`Tag ${data?.name} has successfully Created :)`);
            }
            setLoading(false);
            setName('');
            setColor('');
        } catch (error) {
            setLoading(false);
            console.log(error)
            const err = error?.response?.data;
            setErrors(err);
            if (err?.non_field_errors) toast.error(err?.non_field_errors[0])
        }
    }

    return (
        <>
            {loading && <Loader />}
            <ToastContainer position="top-center" autoClose={5000} />
            <Head>
                <title>Bilancia Web</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <section className='flex-1 h-auto min-h-[450px] bg-white rounded-[32px] px-8 py-8'>
                    <div className='flex justify-between px-0 md:px-10'>
                        <h1 className='font-medium text-xl md:text-[24px]'>Add Tag</h1>
                        <Link href="/admin/agenda/tags">
                            <button
                                className='w-[140px] h-[44px] md:w-[170px] md:h-[48px] text-sm md:text-base text-white bg-primary rounded-xl font-light mt-4'
                            >All Tags</button>
                        </Link>
                    </div>
                    <div className='w-full xl:w-[822px] mt-10 px-6 md:px-10'>
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            addTag();
                        }}>
                            <div className='w-full mb-6'>
                                <label className='text-base text-black'>Name
                                    <span> *</span>
                                </label>
                                <div className='w-full h-[48px] rounded-[14px] border border-[#C6F5CF] bg-[#F7F7F7] mt-2 px-5 flex items-center'>
                                    <input
                                        type="text"
                                        className="w-full border-none bg-transparent text-sm focus:outline-none ml-4"
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                    />
                                </div>
                                {errors?.name && <ErrorMessage message={errors?.name[0]} />}
                            </div>
                            <div className='w-full mb-6'>
                                <label className='text-base text-black'>Color
                                    <span> *</span>
                                </label>
                                <div className='w-full h-[48px] rounded-[14px] border border-[#C6F5CF] bg-[#F7F7F7] mt-2 px-5 flex items-center'>
                                    <input
                                        type="text"
                                        className="w-full border-none bg-transparent text-sm focus:outline-none ml-4"
                                        onChange={(e) => setColor(e.target.value)}
                                        value={color}
                                    />
                                </div>
                                {errors?.color && <ErrorMessage message={errors?.color[0]} />}
                            </div>
                            <button
                                type='submit'
                                className='w-[170px] h-[48px] text-base text-white bg-primary rounded-xl font-light mt-4'
                            >Add Tag</button>
                        </form>
                    </div>
                </section>
            </Layout>
        </>
    )
}

export default Index