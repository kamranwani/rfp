const BASE_URL = "https://rfp-be-ltx9.onrender.com/api";

/* ---------------- COMMON FETCH HELPER ---------------- */
async function apiRequest(url, options = {}) {
    const token = localStorage.getItem("login-token");

    if (!token) {
        throw new Error("User not authenticated");
    }

    const res = await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            ...(options.headers || {})
        }
    });

    let data = null;

    try {
        data = await res.json();
    } catch {
        data = null;
    }

    if (!res.ok) {
        throw new Error(data?.message || "Something went wrong");
    }

    return data;
}

/* ---------------- GET PROJECT ---------------- */
export async function fetchProjectData(id) {
    if (!id) throw new Error("Project ID is required");

    return await apiRequest(`${BASE_URL}/workspace/${id}`, {
        method: "GET"
    });
}

/* ---------------- UPLOAD DOCUMENT ---------------- */
export async function uploadDocument(id) {
    console.log(id);
    if (!id) throw new Error("Project ID is required");

    const file = document.getElementById("fileInput").files[0];

    if (!file) {
        throw new Error("Please select a file");
    }

    const body = {
        documentName: document.getElementById("docName").value,
        format: document.getElementById("format").value,
        version: document.getElementById("version").value,
        remark: document.getElementById("remark").value,
         uploadedBy: document.getElementById("uploadedBy").value,
        fileName: file.name
    };

    return await apiRequest(`${BASE_URL}/workspace/${id}/upload`, {
        method: "POST",
        body: JSON.stringify(body)
    });
}