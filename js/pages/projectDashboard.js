import { loadSingleProject,updateProjectStatusState } from "../services/api.js";
import { authGuard } from "../../utils/helpers/helpers.js";

const container=document.querySelector("#container")
const projectStatus=document.querySelector(".project-status")
const updateStatus=document.querySelector(".updateStatus")
const closestatus=document.querySelector(".closestatus")






const params = new URLSearchParams(window.location.search);
const id = params.get("id");
let currentStatus="";
// auth guard

authGuard();

let projectStore=null;

// renderUi 

const renderUi= async ()=>{
    const project= await loadSingleProject(id);
    console.log(project);
    console.log( project.data.status); 
    projectStore=project.data;
    console.log(projectStore)
    projectStatus.innerHTML=`<p data-status=${projectStore.status}>${projectStore.status}</p>`;
}

renderUi();

const updateProjectStatus=(e)=>{
    currentStatus =e.target.dataset.status;
    updateStatus.style.display="block";
    
}

const closeStatus=()=>{
    updateStatus.style.display="none";

}
const handleupdateprojStatus=async (e)=>{
    e.preventDefault();
    const formdata=new FormData(updateStatus);
    const data= Object.fromEntries(formdata);
    console.log(data);  
    if(currentStatus != data.status){
        console.log(data.status,currentStatus);
        const newStatus={
            status:data.status
        }
        await updateProjectStatusState(newStatus,id);
         window.location.href=`http://localhost:5500/pages/projects-dashboard/projects-dashboard.html`;
    }else alert("change");
}

projectStatus.addEventListener("click",updateProjectStatus);
closestatus.addEventListener("click",closeStatus);

updateStatus.addEventListener("submit",handleupdateprojStatus);

// router.put("/:id", updateProject);
