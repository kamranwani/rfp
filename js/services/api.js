// get all projects 
export const loadJsonData= async ()=>{
    const token=localStorage.getItem("login-token");
    try{
        const res=await fetch("https://rfp-be-ltx9.onrender.com/api/projects",{
            method:"GET",
            headers:{
                Authorization:`Bearer ${token}`
            }
            
        });
        if(!res.ok){
                throw new Error("something went wrong");
            }
        const Data=await res.json();
        const rfpdata=Data;
        return rfpdata;
       
    }
    catch(err){
        console.error("wrong",err)
    }
};

// get single project by id 

export const loadSingleProject=async(id)=>{
    const token=localStorage.getItem("login-token");
    try{
        const res=await fetch(`https://rfp-be-ltx9.onrender.com/api/projects/${id}`,{
            method:"GET",
             headers:{
                Authorization:`Bearer ${token}`
            }
        });
        if(!res.ok){
                throw new Error("something went wrong");
            }
      return await res.json();
    }
     catch(err){
        console.error("wrong",err)
    }
}


// login

export const handleLogIn= async (username,password)=>{
     try{
        const res=await fetch(`https://rfp-be-ltx9.onrender.com/api/auth/login`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                email:username,
                password
            })
        });
        const data = await res.json();
        
        if(!res.ok){
                throw new Error(data.message||"Login Failed");
            }

        localStorage.setItem("login-token",data.token);
        localStorage.setItem("login-role",data.role);
        return data;
    
    }
     catch(err){
        throw(err);
    }
}


