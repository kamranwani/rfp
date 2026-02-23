import { addNewWorkspace, projectWorkspace, updateDocumentStatus, uploadNewDocument } from "../services/projectWorkspaceServices.js";
import { authGuard } from "../../utils/helpers/helpers.js";
import { loadSingleProject } from "../services/api.js";

const headerProjectName =document.querySelector(".header-project-name");
const clientName=document.querySelector(".client-name");
const submissionDate=document.querySelector(".submission-date");
const remainingPeriodSubmission=document.querySelector(".remaining-period-submission");
const overallProgress=document.querySelector(".overall-progress");
const assignedTeam=document.querySelector(".assigned-team");
const projectManager=document.querySelector(".project-manager");
const priority=document.querySelector(".priority");
const stage=document.querySelector(".stage");
const gridLine=document.querySelector(".grid-line");
const projectDetailsBar=document.querySelector(".project-details-bar");
const newWorkspaceBtn=document.querySelector(".new-workspace-btn");
const uploadBtn=document.querySelector(".upload-btn");
const workspaceForm=document.querySelector("#workspaceForm");
const workspaceProjectId=document.querySelector("#workspaceProjectId");
const closeWorkspace=document.querySelector(".close-workspace");
const modelWorkspace=document.querySelector(".model-workspace");
const closeUploadDocument=document.querySelector(".close-upload-document");
const modelUploadDocument=document.querySelector(".model-upload-documents");
const uploadProjectId=document.querySelector("#uploadProjectId");
const documentworkspaceId=document.querySelector("#documentworkspaceId");
const closeUpdateStatusBtn=document.querySelector(".close-update-status-btn");
const updateUploadDocStatusModel=document.querySelector(".update-upload-doc-status-model");
const updateDocumentStatusForm=document.querySelector("#updateDocumentStatusForm");



const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// console.log(id);

let workspace=null;

let selectedStatus="";

authGuard();

// get single project workspace 

const getProjectWorkspaceDocuments=async(projectId)=>{
    const projectWorkspaceData= await projectWorkspace(projectId);
    const projectName=await loadSingleProject(id);
    console.log("filter",projectWorkspaceData)
    if(!projectWorkspaceData){
        renderNoDocUI(projectName);
        return;
    }
    // console.log(project);
    workspace=projectWorkspaceData;
    renderUI();
};

getProjectWorkspaceDocuments(id);



if (!workspace) {
  uploadBtn.disabled = true;
  uploadBtn.style.backgroundColor="black";
  uploadBtn.innerText="Disabled - add workspace first";
  uploadBtn.style.cursor="auto";

}

workspaceProjectId.value=id;
uploadProjectId.value=id;

const renderUI=()=>{
    if (!workspace) return;

    
    newWorkspaceBtn.disabled = true;
    newWorkspaceBtn.style.backgroundColor="black";
    newWorkspaceBtn.innerText="Disabled - add workspace first";
    newWorkspaceBtn.style.cursor="auto";

    uploadBtn.disabled = false;
  uploadBtn.style.backgroundColor="rgba(0, 0, 255, 0.765)";
  uploadBtn.innerText="Upload Documents";
  uploadBtn.style.cursor="Pointer";
    // console.log(workspace);
    const subDate=workspace.submissionDeadline.slice(0,workspace.submissionDeadline.lastIndexOf('T'));
    const remDays=daysBetween(subDate);
   
    let team=generateTeam(workspace.assignedTeam);
    
    headerProjectName.innerHTML=workspace.client;
    clientName.innerHTML=workspace.client;
    submissionDate.innerHTML=subDate;
    remainingPeriodSubmission.innerHTML=`${remDays} days remaining`;
    overallProgress.innerHTML=workspace.overallProgress;
    assignedTeam.innerHTML=team.join("");
    projectManager.innerHTML=workspace.projectManager;
    priority.innerHTML=workspace.priority;
    stage.innerHTML=workspace.stage;
    let generatedDocuments= generateDocumentRows();
    // console.log(generatedDocuments);
    gridLine.innerHTML+=generatedDocuments;
    document.querySelector(".upload-grid-line").addEventListener("click",handleUploadGridLine);
}



const renderNoDocUI=(project)=>{
    headerProjectName.innerHTML=project.projectName;
}


function daysBetween(d1) {
    const date1 = new Date(d1);
    const date2 = new Date(); // today

    date1.setHours(0,0,0,0);
    date2.setHours(0,0,0,0);

    const diff = Math.abs(date2 - date1);

    return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

const generateTeam=(team)=>{
    return team.map((name)=>`<p>${name}</p>`);
}

const generateDocumentRows=()=>{
   return workspace?.uploads?.map(doc=>{
        return(
            `<ul class="" data-id="${doc._id}>
                <li class="document-name">${doc.documentName}</li>
                <li class= "${doc.format}">${doc.format}</li>
                <li class="document-version">${doc.version}</li>
                <li class="document-uploadedBy">${doc.uploadedBy}</li>
                <li class="document-uploadDate">${doc.uploadDate.slice(0,doc.uploadDate.lastIndexOf("T"))}</li>
                <li class="${doc.status}" data-status="${doc.status}" data-id="${doc._id}">${doc.status}</li>
                <li class="document-actions">h</li>
            </ul>`
        ) 
    }).join("")
}
// ${doc._id}

const handleAddNewWorkspace=()=>{
    console.log("add new workspace");
    modelWorkspace.style.display="flex";
}

const handleUploadDocumentFormBtn=()=>{
    console.log("view model");
    console.log("workspace", workspace);
    documentworkspaceId.value=workspace._id;
    modelUploadDocument.style.display="flex";
}

const handleWorkspaceForm= async (e)=>{
    e.preventDefault();
    const formData= new FormData(workspaceForm);
    const data=Object.fromEntries(formData);
    const response=await addNewWorkspace(data);
    console.log(response,"hi")
    // if()
}

const handleCloseWorkspaceModel=()=>{
    console.log("hey here");
    modelWorkspace.style.display="none";
}

const handleCloseUploadModel= ()=>{
    modelUploadDocument.style.display="none";
}
const handleUploadDocument =async (e)=>{
    e.preventDefault();
    console.log("hey uploading files");
    const formData= new FormData(uploadDocumentsForm);
    const data= Object.fromEntries(formData);
    console.log("data",data);
    const response = await uploadNewDocument(data);
   if(response.success === "true"){
    alert("Document Added Successfully")
   }
   window.location.href=`http://localhost:5500/pages/project-documents-view/project-documents.html?id=${id}`
}

const handleUploadGridLine = (e)=>{
    if(e.target.closest("[data-id]")){
     updateUploadDocStatusModel.style.display="flex";
 
     selectedStatus=e.target.dataset.id;
         console.log(selectedStatus);
    }

    if(e.target.closest("[data-action]"))
        handleCloseUpdateStatusModel();
}

const handleCloseUpdateStatusModel=()=>{
    console.log(updateUploadDocStatusModel);
    updateUploadDocStatusModel.style.display="none";

    // updateUploadDocStatusModel.classList.add("hide-update-status-model");
};

const handleUpdateDocumentStatus= async (e)=>{
    e.preventDefault();
    // console.log(id,selectedStatus,workspace._id);
    const formData=new FormData(updateDocumentStatusForm);
    const updatedStatus= Object.fromEntries(formData);
    // console.log("id",selectedStatus);
    const selectedDocument=workspace.uploads.find((doc)=>doc._id === selectedStatus);
    // console.log(updatedStatus);
    
    // console.log("here",updatedStatus,selectedDocument);
    if(selectedDocument.status === updatedStatus.status){

        alert("same as previous status");
        return;
    }
    let updatedStatusBlock={
        projectId:id,
        workspaceId:workspace._id,
        documentId:selectedDocument._id,
        status:updatedStatus.status
    }
    // console.log(updatedStatusBlock);
    const result= await updateDocumentStatus(updatedStatusBlock);
    window.location.href=`http://localhost:5500/pages/project-documents-view/project-documents.html?id=${id}`

};

uploadBtn.addEventListener("click",handleUploadDocumentFormBtn);
newWorkspaceBtn.addEventListener("click",handleAddNewWorkspace);
workspaceForm.addEventListener("submit",handleWorkspaceForm);
closeWorkspace.addEventListener("click",handleCloseWorkspaceModel);
closeUploadDocument.addEventListener("click",handleCloseUploadModel);
uploadDocumentsForm.addEventListener("submit",handleUploadDocument);
closeUpdateStatusBtn.addEventListener("click",handleCloseUpdateStatusModel);
updateDocumentStatusForm.addEventListener("submit",handleUpdateDocumentStatus);


    