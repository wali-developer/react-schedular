import React, { useState } from 'react';
import Header from './Header';
import Aside from './Aside';

const index = ({ children }) => {
    const [showAside, setShowAside] = useState(false);
    return (
        <>
            <section className='md:flex flex-row gap-x-10 bg-primaryExtraLight'>
                <Aside showAside={showAside} setShowAside={setShowAside} />
                <div className='flex-1 pr-3 md:pr-5 px-4 lg:px-0 lg:pr-6'>
                    <Header showAside={showAside} setShowAside={setShowAside} />
                    <main className='pt-10'>
                        {children}
                    </main>
                </div>
            </section>
        </>
    )
}

export default index