import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { toast, ToastContainer } from 'react-toastify';

import Layout from '../../../../components/Layout';
import getHeader from '../../../../utils/getHeader';
import API from '../../../../API';
import ErrorMessage from '../../../../components/ErrorMessage';
import Loader from '../../../../components/CustomeLoader'
import Link from 'next/link';


const Index = () => {

    const header = getHeader();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [participants, setParticipants] = useState([]);
    const [tag, setTag] = useState({});

    const [tagsOptions, setTagsOptions] = useState([]);
    const [usersList, setUsersList] = useState([]);

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const addAgenda = async () => {
        setLoading(true);
        setErrors();
        const participantsIdsArray = participants.map(item => item?.value)

        const payLoad = {
            begin_datetime: startTime,
            end_datetime: endTime,
            title: title,
            description: description,
            participants: participantsIdsArray,
            tag: tag
        }

        try {
            const { data } = await API.post('/api/agenda/event/', payLoad, header);
            if (data) {
                toast(`${data?.title} event has successfully scheduled :)`);
                setTitle('')
                setDescription('')
                setStartTime('')
                setEndTime('')
                setParticipants('')
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error)
            const err = error?.response?.data;
            setErrors(err);
            if (err?.non_field_errors) toast.error(err?.non_field_errors[0])
        }
    }

    const getTags = async () => {
        try {
            const { data } = await API.get('/api/agenda/tag/', header);
            if (data) {
                setTagsOptions(data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getUsersList = async () => {
        try {
            const { data } = await API.get('/api/manager/list_users', header);
            if (data) {
                const users = data.map(user => {
                    return {
                        label: `${user?.first_name} ${user?.last_name}`,
                        value: user?.id,
                        email: user?.email
                    }
                })
                setUsersList(users);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getTags()
        getUsersList();
    }, [])

    const animatedComponent = makeAnimated();
    return (
        <>
            {loading && <Loader />}
            <ToastContainer position="top-center" autoClose={5000} />
            <Head>
                <title>Bilancia Web</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <section className='flex-1 h-auto bg-white rounded-[32px] px-7 sm:px-16 py-8'>
                    <div className='flex flex-wrap gap-y-3 justify-between'>
                        <h1 className='font-medium text-xl md:text-[24px]'>Add Agenda</h1>
                        <Link href="/admin/agenda/agendas_list">
                            <button
                                className='w-[150px] h-[44px] md:w-[199px] md:h-[48px] text-sm md:text-base text-white bg-primary rounded-xl font-light'
                            >All Agenda</button>
                        </Link>
                    </div>
                    <div className='w-full xl:w-[822px] mt-10'>
                        <form className=''>
                            <div className='w-full mb-10'>
                                <label className='text-base text-black'>Title of agenda</label>
                                <div className='w-full h-[60px] rounded-[14px] border border-primary bg-[#F7F7F7] mt-2 px-5 '>
                                    <input
                                        type="text"
                                        className="w-full h-full border-none bg-transparent text-base focus:outline-none ml-4"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                {errors?.title && <ErrorMessage message={errors?.title[0]} />}
                            </div>
                            <div className='w-full mb-10'>
                                <label className='text-base text-black'>Description of agenda</label>
                                <div className='w-full h-full rounded-[14px] border border-primary bg-[#F7F7F7] mt-2 px-5 flex items-center'>
                                    <textarea
                                        rows={5}
                                        className="w-full border-none bg-transparent text-base focus:outline-none ml-4 py-4 resize-none"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                                {errors?.description && <ErrorMessage message={errors?.description[0]} />}
                            </div>
                            <div className='w-full mb-10'>
                                <label className='text-base text-black'>Begin datetime</label>
                                <div className='w-full h-[60px] rounded-[14px] border border-primary bg-[#F7F7F7] mt-2 px-5 flex items-center'>
                                    <input
                                        type="datetime-local"
                                        className="w-full h-full border-none bg-transparent text-base focus:outline-none ml-4"
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                    />
                                </div>
                                {errors?.begin_datetime && <ErrorMessage message={errors?.begin_datetime[0]} />}
                            </div>
                            <div className='w-full mb-10'>
                                <label className='text-base text-black'>End datetime</label>
                                <div className='w-full h-[60px] rounded-[14px] border border-primary bg-[#F7F7F7] mt-2 px-5 flex items-center'>
                                    <input
                                        type="datetime-local"
                                        className="w-full h-full border-none bg-transparent text-base focus:outline-none ml-4"
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                    />
                                </div>
                                {errors?.end_datetime && <ErrorMessage message={errors?.end_datetime[0]} />}
                            </div>
                            {/* <div className='w-full mb-10'>
                                <label className='text-base text-black'>Participants</label>
                                <div className='w-full h-[60px] rounded-[14px] border border-primary bg-[#F7F7F7] mt-2 px-5 flex items-center'>
                                    <input
                                        type="array"
                                        className="w-full h-full border-none bg-transparent text-base focus:outline-none ml-4"
                                        // value={participants}
                                        onChange={(e) => setParticipants([...participants, e.target.value])}
                                    />
                                </div>
                                {errors?.participants && <ErrorMessage message={errors?.participants[0]} />}
                            </div> */}
                            <div className='select_wrapper mb-10'>
                                <label className='text-black text-base'>
                                    Participants
                                    <span className='text-red-500'> *</span>
                                    <br />
                                    <div className='w-full h-[60px] rounded-[14px] border border-primary bg-[#F7F7F7] mt-2 px-5'>
                                        <Select
                                            onChange={setParticipants}
                                            options={usersList}
                                            isMulti
                                            isClearable={false}
                                            components={animatedComponent}
                                            placeholder="Select participants"
                                        />
                                    </div>
                                    {errors?.participants && <ErrorMessage message={errors?.participants[0]} />}
                                </label>
                            </div>
                            {tagsOptions && (
                                <div className='w-full mb-10'>
                                    <label className='text-base text-black'>Select tag</label>
                                    <div className='w-full h-[60px] rounded-[14px] border border-primary bg-[#F7F7F7] mt-2 flex items-center relative'>
                                        <select
                                            className="w-full h-full border-none bg-transparent text-base focus:outline-none ml-4 px-5 appearance-none"
                                            onChange={(e) => {
                                                setTag(e.target.value);
                                            }}
                                        >
                                            <option defaultChecked disabled >Select a tag</option>
                                            {tagsOptions?.map((tag, index) => (
                                                <option
                                                    value={tag?.id}
                                                    key={index + ""}
                                                >{tag?.name}</option>
                                            ))}
                                        </select>
                                        <img src='/images/dropdown.svg' alt='Dropdown' className='absolute top-1/2 right-6 -translate-y-1/2' />
                                    </div>
                                    {errors?.tag && <ErrorMessage message={errors?.tag[0]} />}
                                </div>
                            )}
                            <div className='text-right'>
                                <button
                                    className='w-[199px] h-[48px] text-base text-white bg-primary rounded-xl font-light mt-10'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        addAgenda();
                                    }}
                                >Add</button>
                            </div>
                        </form>
                    </div>
                </section>
            </Layout>
        </>
    )
}

export default Index