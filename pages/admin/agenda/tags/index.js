import React, { useEffect, useState } from 'react';
import Layout from '../../../../components/Layout';
import Link from 'next/link';
import Head from 'next/head';

import API from '../../../../API';
import getHeader from '../../../../utils/getHeader';
import Loader from '../../../../components/CustomeLoader';

const Index = () => {

    const header = getHeader();

    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);

    const getTags = async () => {
        setLoading(true);
        try {
            const { data } = await API.get('/api/agenda/tag/', header);
            if (data) {
                setTags(data)
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }

    }

    // handle delete action
    const deleteTag = async (id) => {
        setLoading(true);
        try {
            const { data } = await API.delete(`/api/agenda/tag/${id}/`, header);
            if (data === "") {
                getTags();
                console.log(data);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }

    }

    useEffect(() => {
        getTags();
    }, [])

    return (
        <>
            {loading && <Loader />}
            <Head>
                <title>Bilancia Web</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <section className=''>
                    <div className='flex-1 h-auto bg-white rounded-[32px] px-12 py-10'>
                        <div className='flex justify-between px-0 md:px-10'>
                            <h1 className='font-medium text-xl md:text-[24px]'>Tags</h1>
                            <Link href="/admin/agenda/tags/add_tag">
                                <button
                                    className='w-[150px] h-[44px] md:w-[199px] md:h-[48px] text-sm md:text-base text-white bg-primary rounded-xl font-light'
                                >Add tags</button>
                            </Link>
                        </div>
                        <section className='mt-12 md:mx-0 overflow-x-auto pb-8'>
                            <div className='w-[700px] xl:w-[850px] mx-auto'>
                                <div className='w-full flex items-center px-12'>
                                    <span className='text-sm font-medium flex-1'>Name</span>
                                    <span className='text-sm font-medium flex-1'>Color</span>
                                    <span className='text-sm font-medium'>Action</span>
                                </div>
                                <div className='mt-3'>
                                    {tags?.map((tag, index) => (
                                        <div className={`w-full h-[89px] flex items-center my-2 px-12 ${(index + 1) % 2 == 0 && "bg-primaryExtraLight"}`} key={index}>
                                            <span className='text-sm font-medium flex-1 flex gap-2 items-center'>
                                                <span>{tag?.name}</span>
                                            </span>
                                            <span className='text-xs font-normal flex-1 pl-4'>
                                                {tag?.color}
                                            </span>
                                            <span className=" flex gap-2">
                                                <Link href={`/admin/agenda/tags/edit/${[tag?.id]}`}>
                                                    <img
                                                        src='/images/edit.svg'
                                                        alt='edit'
                                                        className='ml-3 cursor-pointer'
                                                    />
                                                </Link>
                                                <img
                                                    src='/images/delete.svg'
                                                    alt='edit'
                                                    className='ml-3 cursor-pointer'
                                                    onClick={() => deleteTag(tag?.id)}
                                                />
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>
                </section>
            </Layout>
        </>
    )
}

export default Index