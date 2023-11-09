import React from 'react';

export default function LeftProfile() {
    return (
        <div className="w-full h-full p-4 bg-white rounded-lg shadow-md mb-8">
            <div className='text-center'>
                <img src="https://anibalbilisim.com/assets/muharrem-b6b2eb6a.png" className='w-2/5 mb-4 rounded-full m-auto' alt="" />
                <h3 className='font-bold'>Muharrem Önel</h3>
                <span className='font-light'>Öğrenci</span>
                <button className='bg-primary-light text-primary justify-center flex items-center rounded-full px-4 m-auto mt-4 mb-4'>
                       <span className='py-2 text-light text-sm'>Profili Düzenle</span>
                </button>
            </div>
        </div>
    );
};
