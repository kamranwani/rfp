export async function projectWorkspace(projectId){
    const token=localStorage.getItem("login-token");
    console.log(token);
    try{
        const response=await fetch(`https://rfp-be-ltx9.onrender.com/api/workspace/${projectId}`,{
        method:"GET",
        headers:{
                Authorization:`Bearer ${token}`
            }
    })
    if (response.status === 404) {
      return null;
    }
    if(!response.ok) return;

    const data=await response.json();
    return data;
    }
    catch(err){
        throw(err);
    }

} ;

export async function addNewWorkspace(formdata){
    const token=localStorage.getItem("login-token");
    const workspace={
        projectId:formdata.workspaceProjectId,
        client:formdata.clientName,
        submissionDeadline:formdata.submissionDeadline,
        overallProgress:formdata.overallProgress,
        assignedTeam:formdata.assignedTeam.split(",").map(name => name.trim()),
        projectManager:formdata.projectManager,
        priority:formdata.priority,
        stage:formdata.stage
    }
    // console.log(workspace);
    try{
            const res =await fetch("https://rfp-be-ltx9.onrender.com/api/workspace",{
            method:"POST",
            
            headers:{
                "Content-Type": "application/json",
                Authorization:`Bearer ${token}`
            },
            body:JSON.stringify(workspace)
        })
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Request failed");
        }
        const data = await res.json();
        return {
                success: true,
                message: "Workspace added successfully",
                data
            }
    }
    catch(err){
        throw(err.message)
    }
}

export async function uploadNewDocument(formData){
    console.log("rec",formData);
    const token=localStorage.getItem("login-token");
    const newDoc={
        documentName: formData.documentName,
        format:formData.format,
        version:formData.documentVersion,
        status:formData.status,
        uploadedBy:formData.uploadedBy
    }
    try{
        const res= await fetch(`https://rfp-be-ltx9.onrender.com/api/workspace/${formData.documentworkspaceId}/upload`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(newDoc)
    })

    if(!res.ok){
        const errorData = await res.json();
        throw new Error(errorData.message || "Request failed");
    }
    const data = await res.json();
        return {
                success: true,
                message: "document added successfully",
                data
            }

    }
    catch(err){
        throw(err.message)
    }

}

export async function updateDocumentStatus(formData){
    const token=localStorage.getItem("login-token");
    console.log(JSON.stringify(formData.status))
    try{
            const res=await fetch(`https://rfp-be-ltx9.onrender.com/api/workspace/${formData.workspaceId}/upload/${formData.documentId}`,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            },
            body:JSON.stringify({
                status:formData.status
            })
        });
        console.log(res);

    if (!res.ok) {
                const errorData = await res.json();
            throw new Error(errorData.message || "Request failed");
        };
        const data= await res.json();

        const response={
            success:true,
            data
        }   
        return {
    success: true,
    data
};
    }
    catch(err){
        throw(err.message);
    }

}



