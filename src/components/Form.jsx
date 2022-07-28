import { useState, useEffect } from 'react';

import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { LockClosedIcon } from '@heroicons/react/solid';
import { LockOpenIcon } from '@heroicons/react/outline';

function Form({projects, setProjects, project, setProject, success, modal, setModal, generateId}) {
    const [ nameProject, setNameProject ]=useState('');
    const [ nameClient, setNameClient ]=useState('');
    const [ phone, setPhone ]=useState('');
    const [ email, setEmail ]=useState('');
    const [ dateDelivery, setDateDelivery ]=useState('');
    const [ requirements, setRequirements ]=useState('');

    useEffect( () => {
        if(Object.keys(project).length > 0) {
            setNameProject(project.nameProject)
            setNameClient(project.nameClient)
            setPhone(project.phone)
            setEmail(project.email)
            setDateDelivery(project.dateDelivery)    
            setRequirements(project.requirements)
        } 
    }, [project])

    if(modal) {
        let titleModal = ''
        let buttonModal = ''
        if(project.id) {
            titleModal = 'Editar proyecto'
            buttonModal = 'GUARDAR'
        } else {
            titleModal = 'Registrar nuevo proyecto'
            buttonModal = 'REGISTRAR'
        }
        Swal.fire({
            html:
                `<div class="bg-white text-xs">
                    <h2 class="font-bold text-blue-800 text-center uppercase pt-2 pb-1 text-sm sm:text-lg border-b-2">
                        ${titleModal} 
                    </h2>
                    <div class="mb-4 mt-6">
                        <label for="nameClient" class="font-bold block text-start pl-1">
                            Nombre cliente
                        </label>
                        <input
                            type="text"
                            id="nameClient"
                            placeholder="Nombre del cliente"
                            class="outline-none w-full rounded border mt-0.5 px-1 py-1 sm:py-1.5"
                            value='${nameClient}'
                        />
                    </div>
                    <div class="mb-4">
                        <label for="phone" class="font-bold block text-start pl-1">
                            Teléfono
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            placeholder="Teléfono del cliente"
                            class="outline-none w-full rounded border mt-0.5 px-1 py-1 sm:py-1.5"
                            value='${phone}'
                        />
                    </div>
                    <div class="mb-4">
                        <label for="email" class="font-bold block text-start pl-1">
                            E-mail
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="E-mail del cliente"
                            class="outline-none w-full rounded border mt-0.5 px-1 py-1 sm:py-1.5"
                            value='${email}'
                        />
                    </div>
                    <div class="mb-4">
                        <label for="nameProject" class="font-bold block text-start pl-1">
                            Nombre proyecto
                        </label>
                        <input
                            type="text"
                            id="nameProject"
                            placeholder="Nombre del proyecto"
                            class="outline-none w-full rounded border mt-0.5 px-1 py-1 sm:py-1.5"
                            value='${nameProject}'
                        />
                    </div>
                    <div class="mb-4">
                        <label for="dateDelivery" class="font-bold block text-start pl-1">
                            Fecha de entrega del proyecto
                        </label>
                        <input
                            type="date"
                            id="dateDelivery"
                            class="outline-none w-full rounded border mt-0.5 px-1 py-1 sm:py-1.5"
                            value='${dateDelivery}'
                        />
                    </div>
                    <div>
                        <label for="requirements" class="font-bold block text-start pl-1">
                            Requerimientos 
                        </label>
                        <textarea id="requirements" placeholder="Requerimientos del proyecto..." class="h-28 outline-none w-full rounded border mt-0.5 px-1 py-1 sm:py-1.5">${requirements}</textarea>
                    </div>
                </div>`,
            focusConfirm: false,
            allowEscapeKey: false,
            allowOutsideClick: false,
            backdrop: "#808080ea",
            confirmButtonText: buttonModal,
            confirmButtonColor: "#1E40AF",
            showCancelButton: true,
            cancelButtonText: "CANCELAR",   
            buttonsStyling: false, 
            customClass: {
                actions: 'mt-2',
                htmlContainer: 'mx-3 sm:mx-8 mt-2',
                confirmButton: 'bg-blue-800 text-white font-bold py-2 px-7 sm:px-14 rounded hover:bg-blue-600 mr-1 sm:mr-2 text-sm',
                cancelButton: 'bg-gray-600 text-white font-bold py-2 px-7 sm:px-14 rounded hover:bg-gray-500 ml-1 sm:ml-2 text-sm',
                validationMessage: 'text-red-800 font-bold text-sm py-1 bg-white',
            },   
            preConfirm: () => {
                const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                dayjs.locale("es");

                const objPreConfirm = {
                    nameClient: document.getElementById('nameClient').value,
                    phone: document.getElementById('phone').value,
                    email: document.getElementById('email').value,
                    nameProject: document.getElementById('nameProject').value,
                    dateDelivery: document.getElementById('dateDelivery').value,
                    requirements: document.getElementById('requirements').value,
                }

                if(!Object.values(objPreConfirm).every( e => e !== '')) {
                    Swal.showValidationMessage('Todos los campos son obligatorios')
                    setTimeout(() => {
                        Swal.resetValidationMessage()
                    }, 1500)
                    return;
                }

                if(objPreConfirm.email) {
                    if( er.test(objPreConfirm.email) === false ) {
                        Swal.showValidationMessage('Email no válido')
                        setTimeout(() => {
                            Swal.resetValidationMessage()
                        }, 1500)
                        return;
                    };
                }
                saveDates(objPreConfirm);
            }
        })  
        .then( result => {
            if (result.isDismissed) {
                setNameProject('');
                setNameClient('');
                setPhone('');
                setEmail('');
                setDateDelivery('');
                setRequirements('');

                setProject({})
                setModal(false);
            } 
        }) 
    }
    
    function saveDates(objPreConfirm) {
        if(project.id) {
            //Editando un proyecto
            objPreConfirm.id = project.id
            objPreConfirm.creation = project.creation
            const projectUpdate = projects.map( projectEdit => projectEdit.id === project.id ? objPreConfirm : projectEdit )
            setProjects(projectUpdate)
            setProject({})
            success('Proyecto editado correctamente')
        } else {
            //Agregando un proyecto
            objPreConfirm.creation = dayjs().format('DD MMMM-YYYY')
            objPreConfirm.id = generateId()
            setProjects( [...projects, objPreConfirm] );
            success('Proyecto agregado correctamente') 
        }
        
        //Reiniciar el formulario
        setNameProject('');
        setNameClient('');
        setPhone('');
        setEmail('');
        setDateDelivery('');
        setRequirements('');

        setModal(false)
    }; 
    return (
        < >
            <button
                onClick={() => setModal(true)}
                type="button"
                className="group shadow-2xl shadow-black hover:bg-blue-600 ease-in-out duration-500 uppercase text-white text-xs sm:text-sm font-bold w-40 sm:w-52             
                    cursor-pointer -mt-5 bg-blue-800 p-2 rounded-md mx-auto flex justify-evenly items-center gap-1 sm:gap-0">
                agregar proyecto
                <LockClosedIcon className="w-4 sm:w-6 group-hover:hidden" /> 
                <LockOpenIcon className="w-4 sm:w-6 hidden group-hover:block" />
            </button> 
        </ >
    )
};

export default Form;