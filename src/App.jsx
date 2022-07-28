import Header from "./components/Header.jsx";
import Form from "./components/Form.jsx";
import ProjectsList from "./components/ProjectsList.jsx";

import { useState, useEffect } from 'react';

import Swal from 'sweetalert2';

function App() {
    const [ projects, setProjects ]=useState( JSON.parse(localStorage.getItem('projects')) ?? [] );
    const [ project, setProject ]=useState({});
    const [ modal, setModal ]=useState(false);

    useEffect(() => {
        localStorage.setItem('projects', JSON.stringify(projects));
    }, [projects])
    
    const deleteProject = id => {
        const projectUpdate = projects.filter( eProject => eProject.id !== id );
        setProjects(projectUpdate);
        success('Proyecto eliminado correctamente');
    }

    const success = text => {
        Swal.fire({
            titleText: text,
            icon: 'success',
            position: 'top-end',
            color: '#000',
            iconColor: '#139206',
            showConfirmButton: false,
            toast: true,
            timerProgressBar: true,
            timer: 1500,
        })
    };

    const generateId = () => {
        const random = Math.random().toString(36).substring(2);
        const date = Date.now().toString(36);
        return random + date;
    };

    return (
        < >
            <Header />
            <Form 
                projects={projects}
                setProjects={setProjects}
                project={project}
                setProject={setProject}
                success={success}
                modal={modal}
                setModal={setModal}
                generateId={generateId}
            />
            <ProjectsList
                projects = {projects}
                setProject = {setProject}
                deleteProject={deleteProject}
                setModal={setModal}
                generateId={generateId}
            />
        </>
    )
}

export default App;