import { loadSingleProject } from "../services/api.js";
import { authGuard } from "../../utils/helpers/helpers.js";

const container=document.querySelector("#container")

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// auth guard

authGuard();

// renderUi 

const renderUi= async ()=>{
    const project= await loadSingleProject(id);
    console.log(project);
    console.log( project.surveyEngineer); 
}

renderUi();
