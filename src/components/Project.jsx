import ModalUpdate from './ModalUpdate.jsx'

import { useState, useEffect } from 'react';

import { TrashIcon, PencilAltIcon, PlusCircleIcon } from '@heroicons/react/outline'
import Swal from 'sweetalert2'

function Project({eProject, setProject, deleteProject, setModal, generateId}) {
    // const [updates, setUpdates]=useState(JSON.parse(localStorage.getItem('updates')) ?? []);
    const [updates, setUpdates]=useState([]);
    const [updateModal, setUpdateModal ] = useState(false);
    const [update, setUpdate ] = useState({});
    const [messageDelete, setMessageDelete] = useState(false);
    const [confirmDeleteProject, setConfirmDeleteProject] = useState(undefined)

    // useEffect( ( ) => {  
    //     localStorage.setItem('updates', JSON.stringify(updates));
    // },[updates])

    const { nameProject, nameClient, phone, email, dateDelivery, requirements, creation, id } = eProject;

    const handleDelete = async () => {
        const {value:values} = await Swal.fire({
            html: '<p class="text-lg sm:text-2xl py-1">¿Deseas eliminar este registro?</p>',
            icon: 'warning',
            iconColor: '#C6002A',
            backdrop: "#808080ea",
            color: '#000',
            confirmButtonText: 'CONFIRMAR',
            confirmButtonColor: '#1E40AF',
            showCancelButton: true,
            cancelButtonText: 'CANCELAR',
            focusConfirm: false,
            allowEnterKey: false,
            allowOutsideClick: false,
            width: '25em',
            buttonsStyling: false, 
            customClass: {
                actions: 'mt-2',
                htmlContainer: 'my-0',
                icon: "mt-4 w-16 h-16",
                confirmButton: 'bg-blue-800 text-white font-bold hover:bg-blue-600 rounded py-2 text-xs px-5 sm:px-8 mr-1 sm:mr-2',
                cancelButton: 'bg-gray-600 text-white font-bold hover:bg-gray-500 rounded py-2 text-xs px-5 sm:px-8 ml-1 sm:ml-2',
            },   
        })
        if(values) {
            return values;
        }
    }

    const deleteUpdate = id => {  
        const updateChange = updates.filter( e => e.id !== id );
        setUpdates(updateChange)
        setMessageDelete(true)
        setTimeout(() => {
            setMessageDelete(false)
        }, 1500)
    }

    return (  
        < >
            {confirmDeleteProject && deleteProject(id)}

            { updateModal && <ModalUpdate
                                setUpdateModal={setUpdateModal}
                                generateId={generateId}
                                updates={updates}
                                setUpdates={setUpdates}
                                nameProject={nameProject}
                                setUpdate={setUpdate}
                                update={update}
                                deleteUpdate={deleteUpdate}
                                messageDelete={messageDelete}
                                handleDelete={handleDelete}
                                eProject={eProject}
                            /> 
            }
            <div className="flex text-xs shadow-md shadow-gray-500 rounded-md w-full md:min-w-[48%] md:max-w-[48%]">
                <div className="flex flex-col justify-center gap-6 items-center bg-blue-800 w-9 sm:w-12 rounded-tl-md rounded-bl-md">
                    <PlusCircleIcon 
                        onClick={ () => setUpdateModal(true) }
                        className="w-5 text-white cursor-pointer hover:scale-150 duration-700"
                    />
                    <PencilAltIcon 
                        onClick={ () => {
                            setProject(eProject)
                            setModal(true) 
                            }
                        }
                        className="w-5 text-white cursor-pointer hover:scale-125 duration-700"
                    />
                    <TrashIcon 
                        onClick={ async () => setConfirmDeleteProject( await handleDelete() ) }
                        className="w-5 text-white cursor-pointer hover:scale-125 duration-700"
                    />
                </div>
                <div className="w-full bg-white rounded-tr-md rounded-br-md px-3 sm:px-4 py-2">
                    <p className="text-end font-bold text-blue-800">
                        Creado el: 
                        <span className="font-normal text-black"> {creation}</span>
                    </p> 
                    <div className="break-words">
                        <p className="font-bold text-center border-b-2 text-blue-800 uppercase pb-1 pt-3 text-sm">
                            {nameProject}
                        </p>
                    </div>
                    <div className="break-words">
                        <p className="pb-1.5 pt-4 font-bold">
                            Cliente:
                            <span className="font-normal"> {nameClient}</span>
                        </p>
                    </div>
                    <div>
                        <p className="pb-1.5 font-bold">
                            Teléfono:
                            <span className="font-normal"> {phone}</span>
                        </p>
                    </div>
                    <div className="break-words">
                        <p className="pb-1.5 font-bold">
                            E-mail:
                            <span className="font-normal"> {email}</span>
                        </p>
                    </div>
                    <div>
                        <p className="pb-1.5 font-bold">
                            Fecha de entrega:
                            <span className="font-normal"> {dateDelivery}</span>
                        </p>
                    </div>
                    <div className="break-words">
                        <p className="pb-1.5 font-bold">
                            Requerimientos:
                            <span className="font-normal"> {requirements}</span>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Project;