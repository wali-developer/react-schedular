import React, { useState } from 'react';
import Link from 'next/link';
import LogoutModal from '../modal/LogoutModal';
import { useRouter } from 'next/router';

const Close = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    )
}

const Aside = ({ showAside, setShowAside }) => {

    const router = useRouter();
    const [selectedItem, setSelectedItem] = useState('');
    const [showNav, setShowNav] = useState(false);
    const [showModal, setModalShow] = useState(false);

    // state for submenu active 
    const [active, setActive] = useState(false);
    const [subMenu, setSubmenu] = useState({})

    const menu = [
        {
            id: 1,
            name: 'Dashboard',
            img: '/images/dashboard.png',
            activeImg: '/images/dashboard-active.png',
            path: '/admin/dashboard',
        },
        {
            id: 2,
            name: 'Product Management',
            img: '/images/cart.svg',
            activeImg: '/images/product-active.png',
            path: '#',
            dropdown: [
                {
                    name: 'All Product',
                    path: '/admin/product_management/all_products',
                },
                {
                    name: 'IVAs',
                    path: '/admin/product_management/ivas',
                },
                {
                    name: 'Ingredients',
                    path: '/admin/product_management/ingredients',
                },
            ]
        },
        {
            id: 3,
            name: 'Actions',
            img: '/images/actions.svg',
            path: '/admin/actions',
            activeImg: '/images/action-active.png',
        },
        {
            id: 4,
            name: 'Insights',
            img: '/images/insights.png',
            activeImg: '/images/insights-active.png',
            path: '/admin/insights',
        },
        {
            id: 5,
            name: 'Sales',
            img: '/images/sales.svg',
            activeImg: '/images/sale-active.png',
            path: '/admin/sale',
        },
        {
            id: 6,
            name: 'User Management',
            img: '/images/user.png',
            activeImg: '/images/user-active.png',
            path: '/admin/user_management',
        },
        {
            id: 7,
            name: 'Configuration View',
            img: '/images/configuration.png',
            activeImg: '/images/configuration-active.png',
            path: '#',
        },
        {
            id: 8,
            name: 'Agenda',
            img: '/images/agenda.svg',
            activeImg: '/images/agenda-active.png',
            path: '/admin/agenda',
        },
        {
            id: 9,
            name: 'Commands',
            img: '/images/command.svg',
            path: '/admin/commands',
            activeImg: '/images/command-active.svg',
        },
        {
            id: 10,
            name: 'Settings',
            img: '/images/settings.svg',
            activeImg: '/images/settings-active.png',
            path: '#',
            dropdown: [
                {
                    name: 'Scale',
                    path: '/admin/settings/scales',
                },
                {
                    name: 'Fiscal Printer',
                    path: '/admin/settings/fiscal_printer',
                },
            ]
        }
    ]
    return (
        <>
            <LogoutModal showModal={showModal} setModalShow={setModalShow} />
            <section className={`w-full md:w-[245px] h-screen top-0 overflow-y-scroll absolute lg:sticky scroll_hide pb-10 bg-white lg:bg-transparent lg:translate-x-0 z-20 transition-all duration-300 ${!showAside ? "translate-x-[-100%]" : "translate-x-[0%]"}`}>
                <div className='flex justify-center mt-3 cursor-pointer'>
                    <div onClick={() => router.push('"/admin/dashboard"')}>
                        <img src='/images/logo1.png' alt='Logo' className='w-[103px] h-[103px]' />
                    </div>
                </div>
                <ul className='mt-10 w-full'>
                    {menu.map((item, index) => !item.dropdown ? (
                        <li
                            className={`h-10 flex my-3 cursor-pointer relative ${router.pathname === item?.path && " w-full"}`} key={index}
                            onClick={() => setSelectedItem(item)}
                        >
                            <div onClick={() => router.push(item.path)}>
                                <div className={`flex flex-row items-center pl-10 ${router.pathname === item?.path && "active_link w-full"}`}>
                                    {router.pathname === item?.path ? (
                                        <img src={item.activeImg} alt='' className='w-[20px]' />
                                    ) : (
                                        <img src={item.img} alt='' className='w-[20px]' />
                                    )}
                                    <span className='ml-4 text-black font-normal text-sm'>{item.name}</span>
                                </div>
                            </div>
                        </li>
                    ) : (
                        <li
                            className={`my-3 cursor-pointer w-full relative`}
                            key={index}
                            onClick={() => setSelectedItem(item)}
                        >
                            <div className={`flex flex-row items-center px-2 w-full h-10 pl-10 ${router.pathname === item?.path && "active_link"}`}
                                onClick={() => setShowNav(!showNav)}
                            >
                                <img src={item.img} alt='' className='w-[20px]' />
                                <span className='ml-4 text-black font-normal text-sm'>{item.name}</span>
                            </div>
                            <ul className="flex flex-col ml-16 my-0 transition-all ease-in-out duration-200"
                                style={showNav && selectedItem?.id === item?.id ? {
                                    height: 30 * item?.dropdown.length,
                                    opacity: 1,
                                    visibility: 'visible'
                                } : {
                                    opacity: 0,
                                    height: "0",
                                    margin: '0',
                                    marginLeft: "28px",
                                    visibility: 'hidden'
                                }}
                            >
                                {item.dropdown.map((sub_menu, index) => (

                                    <li key={index} className="my-1 py-1">
                                        <div onClick={() => router.push(sub_menu.path)}>
                                            <span className='flex'>
                                                <span className={`ml-3 text-black text-sm ${router?.pathname === sub_menu.path && "font-semibold"}`}
                                                >{sub_menu.name}</span>
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <></>
                        </li>
                    )
                    )}
                    <button
                        className='flex flex-row items-center pl-10 h-10 focus:outline-none'
                        onClick={() => setModalShow(true)}
                    >
                        <img src="/images/logout.png" alt='Dashboard' />
                        <span className='ml-4 text-black font-normal text-sm'>Logout</span>
                    </button>
                </ul>
                <button className='absolute top-8 right-5 md:hidden' onClick={() => setShowAside(false)}>
                    <Close />
                </button>
            </section>

        </>
    )
}

export default Aside