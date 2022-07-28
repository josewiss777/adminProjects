import Updates from './Updates.jsx';
import Success from './Success.jsx';

import { Fragment, useState, useEffect } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import { CogIcon } from '@heroicons/react/outline'
import { ArrowRightIcon, XIcon } from '@heroicons/react/solid'
import dayjs from 'dayjs';
import 'dayjs/locale/es';

function ModalUpdate({setUpdateModal, generateId, updates, setUpdates, nameProject, setUpdate, 
                        update, deleteUpdate, messageDelete, handleDelete,eProject}) {
    const [open, setOpen] = useState(true)
    const [textUpdate, setTextUpdate] = useState('')
    const [errorBorder, setErrorBorder] = useState(false)
    const [messageAdd, setMessageAdd] = useState(false)
    const [messageEdit, setMessageEdit] = useState(false)

    useEffect( ( ) => {
        if( Object.keys(update).length > 0 ) {
            setTextUpdate(update.textUpdate)
        }
    }, [update])

    const validateFormUpdate = () => {
        dayjs.locale("es");
        if(textUpdate === '') {
            setErrorBorder(true)
            setTimeout(() => {
                setErrorBorder(false)
            }, 1500)
            return;
        }
        const objUpdate = {
            textUpdate
        }

        if(update.id) {
            //Editando actualización
            objUpdate.id = update.id
            objUpdate.dateUpdate = update.dateUpdate
            objUpdate.idContainer = update.idContainer
            const updateActual = updates.map( e => e.id === update.id ? objUpdate : e )
            setUpdates(updateActual)  
            setUpdate({}) 
            setMessageEdit(true)
            setTimeout(() => {
                setMessageEdit(false)
            }, 1500)
        } else {
            //Agregando actualización
            objUpdate.id = generateId() 
            objUpdate.dateUpdate = dayjs().format('DD MMMM-YYYY')
            objUpdate.idContainer = eProject.id
            setUpdates([...updates, objUpdate]);
            setMessageAdd(true)
            setTimeout(() => {
                setMessageAdd(false)
            }, 1500)
        }
        setTextUpdate('')
        setUpdate({})
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-90 transition-opacity" />
                </Transition.Child>

                <div className="fixed z-10 inset-0">
                    <div className="flex items-center justify-center min-h-full p-4 text-center sm:p-0 h-screen">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="bg-white py-0 sm:py-2 px-2 sm:px-4 rounded-md w-full sm:w-11/12 md:w-5/6 lg:w-3/5 h-full sm:h-5/6">
                                <div className='h-1/3'>
                                    <div className="flex justify-between px-1 py-2 gap-0 sm:gap-2">
                                        {messageAdd &&  <Success message="Agregado correctamente" />}
                                        {messageEdit &&  <Success message="Editado correctamente" />}
                                        {messageDelete &&  <Success message="Eliminado correctamente" />}
                                        <XIcon
                                            onClick={ () => {
                                                setTextUpdate('')
                                                setUpdate({})
                                                setUpdateModal(false)
                                                }
                                            }
                                            className='w-6 cursor-pointer mr-0 ml-auto'
                                        />
                                    </div>
                                    <h2 className='font-bold uppercase text-sm mb-1'>
                                        {nameProject}
                                    </h2>
                                    <textarea 
                                        id="update" 
                                        value={textUpdate}
                                        onChange = { e => setTextUpdate( e.target.value ) } 
                                        placeholder="Escribe aquí las nuevas actualizaciones para este proyecto..." 
                                        className={errorBorder ? 
                                                    "border-red-500 border-2 h-20 sm:h-16 outline-none w-full sm:w-4/5 rounded p-1.5 text-xs" 
                                                    : 
                                                    "h-20 sm:h-16 outline-none w-full sm:w-4/5 rounded border p-1.5 text-xs"
                                                }></textarea>
                                    <div className='mt-1 flex justify-center gap-4 font-bold text-xs text-white uppercase'>
                                        <button
                                            onClick={validateFormUpdate}
                                            type="button"
                                            className="group shadow-lg shadow-neutral-500 bg-blue-800 hover:bg-blue-600 duration-700 flex items-center justify-center gap-1 py-2 rounded-md w-1/2 sm:w-1/4"
                                        >
                                            < CogIcon className='w-5 group-hover:animate-spin' />
                                            {update.id ? "Editar" : "Agregar"}
                                            <ArrowRightIcon
                                                className='w-4 group-hover:translate-x-4 duration-1000'
                                            />
                                        </button>
                                        {update.id && <button
                                            onClick={() => {
                                                setTextUpdate('')
                                                setUpdate({})
                                            }}  
                                            type="button"
                                            className='bg-gray-700 shadow-lg shadow-neutral-500 hover:bg-gray-600 duration-700 rounded-md w-1/2 sm:w-1/4'
                                        >
                                            Cancelar
                                        </button>}
                                    </div>
                                </div>
                                <div className='h-2/3 overflow-y-auto py-5 px-2'>
                                    { updates.length > 0 ? (
                                        <div className='h-full'>
                                            <div className='flex justify-between flex-wrap gap-y-1 sm:gap-y-6'>
                                                {updates.map( eUpdate => {
                                                    return(
                                                        <Updates 
                                                            key={eUpdate.id}
                                                            eUpdate={eUpdate}
                                                            setUpdate={setUpdate}
                                                            deleteUpdate={deleteUpdate}
                                                            handleDelete={handleDelete}
                                                        />
                                                    )
                                                })}
                                            </div>        
                                        </div>
                                    ) : (
                                        <div className="flex justify-center items-end pb-2 h-44">
                                            <p className="text-center animate-bounce font-bold text-blue-800">
                                                Este proyecto no tiene actualizaciones
                                            </p>
                                        </div>
                                    )
                                    }
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ModalUpdate;