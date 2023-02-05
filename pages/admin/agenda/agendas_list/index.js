import React, { useState, useEffect } from 'react';
import moment from 'moment/moment';
import Head from 'next/head';

import Layout from '../../../../components/Layout';
import Link from 'next/link';
import ModalBox from '../../../../components/modal';
import API from '../../../../API';
import getHeader from '../../../../utils/getHeader';
import Loader from '../../../../components/CustomeLoader';

const Index = () => {

    const header = getHeader();

    const [showModal, setModalShow] = useState(false);
    const [agendasList, setAgendasList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState(false);
    const [showOption, setShowOption] = useState(false);
    const [selectedAgenda, setSelectedAgenda] = useState({});

    const getAgendasList = async () => {
        setLoading(true)
        try {
            const { data } = await API.get('/api/agenda/event/', header);
            if (data) {
                setLoading(false)
                setAgendasList(data);
            }

        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    const deleteAgenda = async (id) => {
        setLoading(true)
        try {
            const { data } = await API.delete(`/api/agenda/event/${id}`, header);
            if (data === "") {
                setLoading(false)
                setShowOption(false)
                getAgendasList();
            }

        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }


    useEffect(() => {
        getAgendasList();
    }, [])

    return (
        <>
            {loading && <Loader />}
            <Head>
                <title>Bilancia Web</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                {/* Agenda details agenda */}
                <ModalBox open={showModal} close={setModalShow} className="w-full xl:w-[1050px] rounded-xl">
                    <section className='py-10 px-7 md:px-28 md:pt-12 pb-8 flex flex-col items-center lg:w-[920px] mx-auto'>
                        <div className='flex flex-col items-center gap-4 justify-center'>
                            <img src='/images/calendar-green.svg' alt='dollar' />
                            <h1 className='text-[24px] font-medium text-black'>Agenda</h1>
                        </div>
                        <div>
                            <p className='text-base text-[#6C6C6C]'>Title</p>
                            <p className='text-base text-black mt-3 font-medium'>{selectedAgenda?.title}</p>
                            <div className='mt-7'>
                                <p className='text-base text-[#6C6C6C]'>Description</p>
                                <p className='text-base font-medium text-black mt-3'>{selectedAgenda?.description}</p>
                            </div>
                            <div className='mt-7'>
                                <p className='text-base text-[#6C6C6C]'>Date {"&"} time</p>
                                <p className='text-base font-medium text-black mt-3'>{selectedAgenda?.begin_datetime} to {selectedAgenda?.end_datetime}</p>
                            </div>
                            <div className='mt-7'>
                                <p className='text-base text-[#6C6C6C]'>Location</p>
                                <div className='flex justify-between'>
                                    <p className='text-base font-medium text-black mt-3'>{selectedAgenda?.location ? selectedAgenda?.location : "null"}</p>
                                    <p className='text-base font-medium text-black mt-3'>View location</p>
                                </div>
                            </div>
                        </div>
                        <div className='ml-auto mt-12'>
                            <button
                                className='w-[199px] h-[48px] text-base text-white bg-primary rounded-xl font-light'
                                onClick={() => {
                                    setModalShow(false)
                                    setSelectedAgenda({})
                                }}
                            >Done</button>
                        </div>
                    </section>
                </ModalBox>
                <section className='flex-1 h-auto min-h-[450px] bg-white rounded-[32px] px-4 sm:px-10 py-8'>
                    <div className='flex flex-wrap justify-start gap-5 px-3'>
                        <h1 className='font-medium text-xl md:text-[24px]'>List of Agendas</h1>
                        <Link href="/admin/agenda/add_agenda">
                            <button
                                className='w-[150px] h-[44px] md:w-[199px] md:h-[48px] text-sm md:text-base text-white bg-primary rounded-xl font-light mt-4 ml-auto'
                            >Add Agenda</button>
                        </Link>
                    </div>
                    {/* Table data */}
                    <section className='mt-16 w-full overflow-x-auto'>
                        <div className='w-[850px] md:w-full'>
                            <div className='w-full flex items-center px-4'>
                                <span className='text-sm font-medium flex-[2]'>Agenda title</span>
                                <span className='text-sm font-medium flex-1'>Begin datetime</span>
                                <span className='text-sm font-medium flex-1 px-8'>End datetime</span>
                                <span className='text-sm font-medium flex-1'>Location</span>
                                <span className='text-sm font-medium flex-1'>Role</span>
                                <span className='text-sm font-medium'>Action</span>
                            </div>
                            <div className='mt-3'>
                                {agendasList?.map((agenda, index) => {
                                    const eventExpiry = !(moment(agenda?.end_datetime).format("YYYY-MM-DD hh:mm") < moment(new Date).format("YYYY-MM-DD hh:mm"))
                                    return (
                                        <div
                                            className={`w-full h-[89px] flex items-center my-2 px-4 cursor-pointer ${(index + 1) % 2 == 0 && "bg-primaryExtraLight"}`}
                                            key={index}
                                        >
                                            <span
                                                className='text-sm font-medium flex-[2] flex gap-x-5 items-center'
                                                onClick={() => {
                                                    setModalShow(true)
                                                    setSelectedAgenda(agenda);
                                                }}
                                            >
                                                <span className='w-[56px] h-[56px] bg-[#88C488] rounded-full'></span>
                                                <span>{agenda?.title}</span>
                                            </span>
                                            <span className='text-xs font-normal flex-1'>{moment(agenda?.begin_datetime).format("YYYY-MM-DD hh:mm")}</span>
                                            <span className='text-xs font-normal flex-1 px-8'>
                                                <span className=''>{moment(agenda?.end_datetime).format("YYYY-MM-DD hh:mm")}</span>
                                            </span>
                                            <span className='flex-1'>
                                                <span className='text-xs'>
                                                    New York
                                                </span>
                                            </span>
                                            <span className='flex-1'>
                                                <span className={`w-[62px] h-[22px] text-[9px] rounded-full text-white px-6 py-2 ${eventExpiry ? "bg-primary" : "bg-red-500"}`}
                                                >
                                                    {eventExpiry ? "Active" : "Expired"}
                                                </span>
                                            </span>
                                            <span className='text-sm pr-3 relative'>
                                                <span className="flex gap-2">
                                                    <img
                                                        src='/images/edit.svg'
                                                        alt='edit'
                                                        className='ml-3 cursor-pointer'
                                                        onClick={() => {
                                                            setSelectedItem(agenda)
                                                            setShowOption(!showOption)
                                                        }}
                                                    />
                                                </span>
                                                {selectedItem?.id === agenda?.id && showOption && (
                                                    <ul
                                                        className='w-[209px] border border-[#0B102333] rounded-[11px] py-2 list-none text-center absolute top-0 last:top-[-30px] right-full mt-1 bg-white transition-all duration-300'
                                                    >
                                                        <li className='border-b pb-2 cursor-pointer'>
                                                            <Link href={`/admin/agenda/edit_agenda/${agenda?.id}`}>
                                                                <span className='font-medium text-xs'>Edit</span>
                                                            </Link>
                                                        </li>
                                                        <li
                                                            className='cursor-pointer pt-2 text-red-600'
                                                            onClick={() => deleteAgenda(agenda?.id)}
                                                        >
                                                            <span className='font-medium text-xs'>Delete</span>
                                                        </li>
                                                    </ul>
                                                )}
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </section>
                </section>
            </Layout>
        </>
    )
}

export default Index