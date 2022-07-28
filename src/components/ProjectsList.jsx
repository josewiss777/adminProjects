import Project from "./Project.jsx";

function ProjectsList({projects, setProject, deleteProject, setModal, generateId}) {  

    return (
        <div className="mx-auto py-12 w-11/12">
            { projects.length > 0 ? (
                < >
                    <div className="flex flex-wrap gap-y-8 sm:gap-y-10 justify-between">
                        {projects.map( eProject => {
                            return(
                                <Project 
                                key = {eProject.id}
                                eProject = {eProject}
                                setProject = {setProject}
                                deleteProject={deleteProject}
                                setModal={setModal}
                                generateId={generateId}
                                />
                            )
                        })}
                    </div>          
                </>
                ): (
                    <div className="flex justify-center items-center h-80 sm:h-96">
                        <h2 className="text-center mb-4 text-base animate-bounce">
                            Aún no tienes proyectos
                            <span className="font-bold text-blue-800 text-lg sm:text-xl"> comienza agregando uno</span>
                        </h2>
                    </div>
                ) 
            }     
        </div>
    )
};
  
export default ProjectsList;