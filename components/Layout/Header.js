import React, { useState, Fragment, useEffect } from 'react';
import Link from 'next/link';
import EndDayModal from '../modal/EndDayModal';
import LogoutModal from '../modal/LogoutModal';
import { Menu } from '@headlessui/react'
import API from '../../API';
import getHeader from '../../utils/getHeader';
import Loader from '../CustomeLoader';

import { useRouter } from 'next/router';


const Header = ({ showAside, setShowAside }) => {

    const header = getHeader();

    const router = useRouter()

    const [show, setShow] = useState(false);
    const [showEndDayModal, setShowEndDayModal] = useState(false);
    const [showModal, setModalShow] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchData, setSearchData] = useState([]);

    const RESOURCE = "resource"
    const PROCCESS_RESOURCE = "processed resource"
    const CATEGORY = "category"

    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true)
        try {
            const { data } = await API.get(`/api/search?value=${searchText}`, header);
            if (data) {
                console.log(data)
                setLoading(false)
                setSearchData(data);
            }
        } catch (error) {
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        e.preventDefault()
        setSearchText(e.target.value)
    }

    useEffect(() => {
        if (searchText === '' || searchText < 3 || searchText == 'undefined') {
            setSearchData([])
        }
    }, [searchText])

    return (
        <>
            {loading && <Loader />}
            <EndDayModal showEndDayModal={showEndDayModal} setShowEndDayModal={setShowEndDayModal} />
            <LogoutModal showModal={showModal} setModalShow={setModalShow} />
            <section className='w-full min-h-[60px] pt-8 flex gap-y-7 flex-wrap justify-between items-center'>
                <div className='w-[848px] bg-[#EFF3F3] rounded-xl overflow-hidden'>
                    <form className='flex items-center flex-1 pl-5' onSubmit={(e) => {
                        e.preventDefault();
                        handleSearch();
                    }}>
                        <button type='submit'>
                            <img src='/images/search.svg' alt='Search' className='mr-4 cursor-pointer' />
                        </button>
                        <input
                            type="text"
                            className='w-full h-[60px] border-none bg-transparent text-sm text-black placeholder:text-black focus:outline-none'
                            placeholder='Search for products, Catagories etc.'
                            value={searchText}
                            onChange={handleChange}
                        />
                    </form>

                    {/* Search content */}
                    {searchData.length > 1 && searchText && (
                        <div
                            className='w-full md:w-[848px] h-[450px] overflow-y-scroll bg-[#EFF3F3] absolute z-[999] mr-10 rounded-br-xl rounded-bl-xl mt-1 mx-auto py-7 px-5 '
                        >
                            <div className='w-full flex items-center px-0 md:px-4'>
                                <span className='text-sm font-medium flex-1'>Object name</span>
                                <span className='text-sm font-medium flex-1'>Object type</span>

                            </div>
                            <div className='mt-5'>
                                {
                                    searchData?.map((item, index) => (
                                        <div className={`w-full h-[79px] flex items-center my-2 px-1 md:px-4 cursor-pointer border-b-[2px] border-white last:border-none`}
                                            key={index + ''}
                                            onClick={() => {
                                                router.push({
                                                    pathname: item?.object_type == CATEGORY ?
                                                        '/admin/product_management/all_categories' :
                                                        '/admin/product_management/all_products',
                                                    query: { objectPath: item?.object_endpoint, objectId: item?.object_id }
                                                })
                                            }}
                                        >
                                            <span className='text-sm font-medium flex gap-2 items-center flex-1'>
                                                <img src='/images/product.jpg' alt='product' className='w-[56px] h-[56px] rounded-full' />
                                                <span>{item?.object_name}</span>
                                            </span>

                                            <span className='text-xs font-medium flex-1'>
                                                <span className='ml-3'>{item?.object_type}</span>
                                            </span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    )}
                    {/* end */}

                </div>
                <div className='flex-1 flex flex-row items-center gap-x-7 justify-end relative'>
                    <button className='md:hidden mr-auto' onClick={() => setShowAside(true)}>
                        <img src='/images/bar.svg' alt='bar' />
                    </button>
                    <div className='relative'>
                        <Menu>
                            <Menu.Button>
                                <img src='/images/settings.svg' alt='Settings' className='cursor-pointer' />
                            </Menu.Button>

                            <Menu.Items
                                className='w-[150px] outline-none border border-[#0B102333] rounded-[11px] py-2 list-none text-center absolute top-full right-0 mt-1 bg-white flex flex-col'
                            >
                                <Menu.Item className=''>
                                    <Link href="/admin/settings/scales">
                                        <span className='font-medium text-xs my-1 cursor-pointer'>Scales</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item className=''>
                                    <Link href="/admin/settings/fiscal_printer">
                                        <span className='font-medium text-xs my-1 cursor-pointer'>Fiscal Printer</span>
                                    </Link>
                                </Menu.Item>
                            </Menu.Items>
                        </Menu>

                    </div>
                    <button>
                        <img src='/images/notification.svg' alt='Notification' />
                    </button>
                    <div
                        className='flex gap-x-4 cursor-pointer'
                        onClick={() => setShow(!show)}
                    >
                        {/* <img src='/images/user.jpg' alt='Admin' className='w-[35px] h-[35px] rounded-full' /> */}
                        <span className='w-[35px] h-[35px] bg-primary rounded-full'></span>
                        <img src='/images/dropdown.svg' alt='Dropdown' />
                    </div>
                    <ul
                        className='w-[119px] border border-[#0B102333] rounded-[11px] py-2 list-none text-center absolute top-full mt-1 bg-white transition-all duration-300'
                        style={{ opacity: show ? 1 : 0 }}
                    >
                        <li className=''>
                            <Link href="/admin/user_management/edit_profile">
                                <span className='font-medium text-[10px] my-2 cursor-pointer'>Profile setting</span>
                            </Link>
                        </li>
                        <li onClick={() => setShowEndDayModal(true)}>
                            <span className='font-medium text-[10px] my-2 cursor-pointer'>End work day</span>
                        </li>
                        <li onClick={() => setModalShow(true)}>
                            <span className='font-medium text-[10px] my-2 cursor-pointer'>Log out</span>
                        </li>
                    </ul>
                </div>
            </section>
        </>
    )
}

export default Header