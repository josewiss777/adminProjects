import { TrashIcon, PencilAltIcon } from '@heroicons/react/solid';
import { useState } from 'react';

const Updates = ({eUpdate, setUpdate, deleteUpdate, handleDelete}) => {
    const [ confirmDeleteUpdate, setConfirmDeleteUpdate ]=useState(undefined)

    const { dateUpdate, textUpdate, id }=eUpdate

    return (
        <>
            {confirmDeleteUpdate && deleteUpdate(id)}
            
            <div className="shadow-md p-2 text-xs mb-4 rounded-md w-full sm:min-w-[48%] sm:max-w-[48%] break-words">
                <div className='flex justify-between border-b-2 mx-2 py-1'>
                    <p className="font-bold">{dateUpdate}</p>
                    <div className='flex gap-2'>
                        <PencilAltIcon 
                            onClick={ () => setUpdate(eUpdate) }
                            className='w-4 cursor-pointer' 
                        />
                        <TrashIcon 
                            onClick={ async () => setConfirmDeleteUpdate( await handleDelete() ) }
                            className='w-4 cursor-pointer' 
                        />
                    </div>
                </div>
                <p className="px-1 py-3 text-justify">{textUpdate}</p>
            </div>
        </>
    )
};
  
export default Updates;