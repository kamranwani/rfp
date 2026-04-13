    import { fetchProjectData, uploadDocument } from "../services/uploaderServices.js";

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    let workspaceId;

    const projectWrapper = document.querySelector(".project-wrapper");
    const documentsWrapper = document.querySelector(".project-documents");

    /* ---------------- INIT ---------------- */
    window.addEventListener("DOMContentLoaded", () => {
        setupFileAutoFill();
        setupGlobalEvents();
        loadData();
    });

    /* ---------------- LOAD DATA ---------------- */
    async function loadData() {
        try {
            console.log("fetch");
            const data = await fetchProjectData(id);

            renderProject(data);
            workspaceId=data._id;
            
            renderDocuments(data.uploads);

        } catch (err) {
            console.error("Error loading project:", err.message);
        }
    }

    function renderProject(data) {
        projectWrapper.innerHTML = `
            <div class="project-header">
                <h2>${data.client}</h2>
                <span class="priority priority-${data.priority}">
                    ${data.priority}
                </span>
            </div>

            <p><strong>Manager:</strong> ${data.projectManager}</p>
            <p><strong>Stage:</strong> ${data.stage}</p>
            <p><strong>Deadline:</strong> ${formatDate(data.submissionDeadline)}</p>
            <p><strong>Team:</strong> ${data.assignedTeam.join(", ")}</p>

            <div class="progress-bar">
                <div class="progress-fill" style="width: ${data.overallProgress}%"></div>
            </div>
        `;
    }

    /* ---------------- FILE AUTO FILL ---------------- */
    function setupFileAutoFill() {
    const fileInput = document.getElementById("fileInput");

    fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const allowedTypes = ["pdf", "docx", "xlsx"];
        const ext = file.name.split(".").pop().toLowerCase();

        if (!allowedTypes.includes(ext)) {
            alert("Only PDF, DOCX, and XLSX files are allowed");

            fileInput.value = ""; // reset
            return;
        }

        document.getElementById("docName").value = file.name.split(".")[0];
        document.getElementById("format").value = ext;
    });
}

    /* ---------------- EVENTS ---------------- */
    function setupGlobalEvents() {
        document.addEventListener("click", async (e) => {

            /* Upload button */
            if (e.target.id === "uploadBtn") {
                openModal();
            }

            /* Back button */
            if (e.target.id === "backBtn") {
                window.location.href = "/pages/uploader-dashboard/uploader-dashboard.html";
            }

            /* Submit upload */
            if (e.target.id === "submitUpload") {
                await handleUpload();
            }

            /* Cancel */
            if (e.target.id === "cancelUpload") {
                closeModal();
            }
        });
    }

    /* ---------------- HANDLE UPLOAD ---------------- */
    async function handleUpload() {
        try {
            console.log(workspaceId);
            console.log("UPLOAD START");

            const file = document.getElementById("fileInput").files[0];

            if (!file) {
                alert("Please select a file");
                return;
            }

            console.log("CALLING API");

            const res = await uploadDocument(workspaceId);

            console.log("UPLOAD SUCCESS:", res);

            resetForm();
            closeModal();
            location.reload();

        } catch (err) {
            console.error("UPLOAD ERROR:", err);
            alert(err.message);
        }
    }

    /* ---------------- RENDER ---------------- */
    function renderDocuments(docs) {
        documentsWrapper.innerHTML = `
            <div class="top-actions">
                <h3 class="section-title">Documents</h3>
                <div>
                    <button class="btn btn-primary" id="uploadBtn">+ Upload</button>
                    <button class="btn btn-secondary" id="backBtn">← Back</button>
                </div>
            </div>

            ${
                !docs || docs.length === 0
                    ? `<p>No documents uploaded</p>`
                    : docs.map(doc => `
                        <div class="doc-card ${doc.status || "pending"}">
                            <h4>${doc.documentName}</h4>
                            <p>${doc.format} • ${doc.version}</p>
                            <p>${doc.uploadedBy}</p>
                        </div>
                    `).join("")
            }
        `;
    }

    /* ---------------- UTIL ---------------- */
    function openModal() {
        document.getElementById("uploadModal").classList.add("active");
        document.getElementById("uploadModal").classList.add("active");

    const currentUser = localStorage.getItem("login-user");

    if (currentUser) {
        document.getElementById("uploadedBy").value = currentUser;
    }
    }

    function closeModal() {
        document.getElementById("uploadModal").classList.remove("active");
    }

    function resetForm() {
        document.getElementById("fileInput").value = "";
        document.getElementById("docName").value = "";
        document.getElementById("format").value = "";
        document.getElementById("version").value = "";
        document.getElementById("remark").value = "";
        document.getElementById("uploadedBy").value = ""; 
    }

    function formatDate(dateStr) {
        return new Date(dateStr).toLocaleDateString();
    }