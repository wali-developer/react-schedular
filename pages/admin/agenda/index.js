import React, { useEffect, useState, useMemo } from 'react'
import Link from 'next/link';
import { Scheduler } from "@aldabil/react-scheduler";
import Head from 'next/head';

import API from '../../../API';
import getHeader from '../../../utils/getHeader';
import Loader from '../../../components/CustomeLoader';
import { EVENTS } from '../../../components/agenda/events';
import { toast } from 'react-toastify';
import CustomeLoader from '../../../components/CustomeLoader';


const index = () => {

    const header = getHeader();
    const [eventsList, setEventsList] = useState([]);
    const [tag, setTag] = useState(null);

    const [loading, setLoading] = useState(false);

    const [tagsOptions, setTagsOptions] = useState([]);
    const [usersList, setUsersList] = useState([]);

    // const loadtagDetails = async (t) => {
    //     try {
    //         const { data } = await API.get(`/api/agenda/tag/${t}/`, header)
    //         return data
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }


    // const getEventsList = async () => {
    //     setLoading(true)
    //     try {
    //         const { data } = await API.get('/api/agenda/event/', header);


    //         Promise.all(data?.map(async (event) => {
    //             let tagDetails = null
    //             if (event?.tag) {
    //                 tagDetails = await loadtagDetails(event?.tag)
    //             }
    //             return {
    //                 event_id: event?.id,
    //                 title: event?.title,
    //                 start: new Date(event?.begin_datetime),
    //                 end: new Date(event?.end_datetime),
    //                 description: event?.description,
    //                 tag: event?.tag,
    //                 color: tagDetails ? tagDetails?.color : null
    //             }
    //         })).then(d => { setEventsList(d) }).catch(e => console.log(e))

    //         // setEventsList(temp)
    //         setLoading(false)
    //     } catch (error) {
    //         setLoading(false)
    //         console.log(error);
    //     }
    // }



    // Edit & Create Event
    // const handleConfirm = async (event, action) => {
    //     if (action === "edit") {
    //         /** PUT event to remote DB */
    //         const payLoad = {
    //             begin_datetime: event?.start,
    //             end_datetime: event?.end,
    //             title: event?.title,
    //             description: event?.description,
    //             participants: event?.participants,
    //             tag: event?.tag
    //         }
    //         try {
    //             const { data } = await API.patch(`/api/agenda/event/${event?.event_id}/`, payLoad, header);

    //             if (data) {
    //                 toast("Event updated successfully")
    //                 getEventsList();
    //             }


    //         } catch (error) {
    //             console.log(error);
    //         }

    //     } else if (action === "create") {
    //         /**POST event to remote DB */

    //         const payLoad = {
    //             begin_datetime: event?.start,
    //             end_datetime: event?.end,
    //             title: event?.title,
    //             description: event?.description,
    //             participants: event?.participants,
    //             tag: event?.tag
    //         }

    //         try {
    //             const { data } = await API.post('/api/agenda/event/', payLoad, header);
    //             if (data) {
    //                 toast("Event schedule successfully")
    //                 getEventsList();
    //             }
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }

    //     return new Promise((res, rej) => {
    //         setTimeout(() => {
    //             res({
    //                 ...event,
    //                 event_id: event.event_id || Math.random()
    //             });
    //         }, 500);
    //     });
    // };

    // const handleDelete = async (deletedId) => {
    //     // Simulate http request: return the deleted id
    //     try {
    //         const { data } = await API.delete(`/api/agenda/event/${deletedId}`, header);
    //         getEventsList();

    //     } catch (error) {
    //         console.log(error);
    //     }
    //     return new Promise((res, rej) => {
    //         setTimeout(() => {
    //             res(deletedId);
    //         }, 1000);
    //     });
    // };

    // const getTags = async () => {
    //     try {
    //         const { data } = await API.get('/api/agenda/tag/', header);

    //         if (data) {
    //             const tempArr = data?.map((item) => {
    //                 return {
    //                     id: item?.id,
    //                     text: item?.name,
    //                     value: item?.id,
    //                 }
    //             })
    //             setTagsOptions(tempArr)
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // const getUsersList = async () => {
    //     try {
    //         const { data } = await API.get('/api/manager/list_users', header);
    //         if (data) {
    //             const users = data.map(user => {
    //                 return {
    //                     id: user?.id,
    //                     text: `${user?.first_name} ${user?.last_name}`,
    //                     value: user?.id,
    //                 }
    //             })
    //             setUsersList(users);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // useEffect(() => {
    //     getTags()
    //     getUsersList();
    // }, [])

    // useEffect(() => {
    //     getEventsList()
    // }, [])



    return (
        <>
            {loading && <Loader />}
            <Head>
                <title>Bilancia Web</title>
                <meta name="description" content="Grocery Login page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
                <section className='flex-1 h-auto min-h-[700px] bg-white rounded-[32px] px-10 py-8 border-2 '>
                    <div className='flex justify-between flex-wrap gap-5 px-3'>
                        <h1 className='font-medium text-xl md:text-[24px]'>All Agendas</h1>
                        <div className='flex gap-5'>
                            <Link href="/admin/agenda/tags">
                                <button
                                    className='w-[100px] h-[44px] md:w-[140px] md:h-[48px] text-sm md:text-base text-white bg-primary rounded-xl font-light ml-auto'
                                >Tags</button>
                            </Link>
                            <Link href="/admin/agenda/add_agenda">
                                <button
                                    className='w-[150px] h-[44px] md:w-[199px] md:h-[48px] text-sm md:text-base text-white bg-primary rounded-xl font-light ml-auto'
                                >New Agenda</button>
                            </Link>
                        </div>
                    </div>
                    <div className='w-full xl:w-[946px] mt-16 mx-auto agenda_schedular'>
                        <Scheduler
                            // remoteEvents={fetchRemote}
                            events={EVENTS}
                            // onConfirm={handleConfirm}
                            // onDelete={handleDelete}
                            view="week"
                            editable={true}
                            deletable={true}
                            week={
                                {
                                    weekDays: [0, 1, 2, 3, 4, 5],
                                    weekStartOn: 6,
                                    startHour: 7,
                                    endHour: 11,
                                    step: 60,
                                }
                            }
                            fields={
                                [
                                    {
                                        name: "description",
                                        type: "input",
                                        config: {
                                            label: "Description", required: true, min: 3, variant: "outlined",
                                        }
                                    },
                                    // {
                                    //     name: "participants",
                                    //     type: "select",
                                    //     config: { label: "Assignee", required: true, multiple: "chips" },
                                    //     options: usersList
                                    // },
                                    // {
                                    //     name: "tag",
                                    //     type: "select",
                                    //     config: { label: "Tag", required: true },
                                    //     options: tagsOptions
                                    // },
                                ]
                            }
                        />
                    </div>
                </section>
            {loading && <div className='z-[999]'>
                <CustomeLoader />
            </div>}
        </>
    )
}


export default index