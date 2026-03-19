// Resume Builder JavaScript

let educationCount = 0;
let experienceCount = 0;
let certificationCount = 0;

function addEducation() {
    const container = document.getElementById('educationContainer');
    const id = educationCount++;
    
    const block = document.createElement('div');
    block.className = 'entry-block';
    block.id = `education-${id}`;
    block.innerHTML = `
        <div class="form-group">
            <label>School/University</label>
            <input type="text" placeholder="University Name" class="edu-school" oninput="updatePreview()">
        </div>
        <div class="form-group">
            <label>Degree</label>
            <input type="text" placeholder="Bachelor of Science" class="edu-degree" oninput="updatePreview()">
        </div>
        <div class="form-group">
            <label>Field of Study</label>
            <input type="text" placeholder="Computer Science" class="edu-field" oninput="updatePreview()">
        </div>
        <div class="form-group">
            <label>Graduation Year</label>
            <input type="text" placeholder="2023" class="edu-year" oninput="updatePreview()">
        </div>
        <button class="btn-remove" onclick="removeEducation(${id})">Remove</button>
    `;
    
    container.appendChild(block);
    updatePreview();
}

function removeEducation(id) {
    const element = document.getElementById(`education-${id}`);
    if (element) {
        element.remove();
        updatePreview();
    }
}

function addExperience() {
    const container = document.getElementById('experienceContainer');
    const id = experienceCount++;
    
    const block = document.createElement('div');
    block.className = 'entry-block';
    block.id = `experience-${id}`;
    block.innerHTML = `
        <div class="form-group">
            <label>Job Title</label>
            <input type="text" placeholder="Software Engineer" class="exp-title" oninput="updatePreview()">
        </div>
        <div class="form-group">
            <label>Company</label>
            <input type="text" placeholder="Company Name" class="exp-company" oninput="updatePreview()">
        </div>
        <div class="form-group">
            <label>Duration (e.g., Jan 2021 - Dec 2022)</label>
            <input type="text" placeholder="Jan 2021 - Dec 2022" class="exp-duration" oninput="updatePreview()">
        </div>
        <div class="form-group">
            <label>Job Description</label>
            <textarea placeholder="Describe your responsibilities and achievements..." class="exp-description" oninput="updatePreview()"></textarea>
        </div>
        <button class="btn-remove" onclick="removeExperience(${id})">Remove</button>
    `;
    
    container.appendChild(block);
    updatePreview();
}

function removeExperience(id) {
    const element = document.getElementById(`experience-${id}`);
    if (element) {
        element.remove();
        updatePreview();
    }
}

function addCertification() {
    const container = document.getElementById('certificationContainer');
    const id = certificationCount++;
    
    const block = document.createElement('div');
    block.className = 'entry-block';
    block.id = `certification-${id}`;
    block.innerHTML = `
        <div class="form-group">
            <label>Certification Name</label>
            <input type="text" placeholder="AWS Solutions Architect" class="cert-name" oninput="updatePreview()">
        </div>
        <div class="form-group">
            <label>Issuing Organization</label>
            <input type="text" placeholder="Amazon Web Services" class="cert-org" oninput="updatePreview()">
        </div>
        <div class="form-group">
            <label>Issue Date</label>
            <input type="text" placeholder="June 2023" class="cert-date" oninput="updatePreview()">
        </div>
        <button class="btn-remove" onclick="removeCertification(${id})">Remove</button>
    `;
    
    container.appendChild(block);
    updatePreview();
}

function removeCertification(id) {
    const element = document.getElementById(`certification-${id}`);
    if (element) {
        element.remove();
        updatePreview();
    }
}

function updatePreview() {
    // Personal Information
    const fullName = document.getElementById('fullName').value || 'Your Name';
    const email = document.getElementById('email').value || 'email@example.com';
    const phone = document.getElementById('phone').value || '+1 (555) 123-4567';
    const location = document.getElementById('location').value || 'City, Country';
    const summary = document.getElementById('summary').value;

    // Update header
    document.getElementById('previewName').textContent = fullName;
    document.getElementById('previewContact').textContent = 
        `${email} | ${phone} | ${location}`;

    // Update summary
    if (summary.trim()) {
        document.getElementById('previewSummary').style.display = 'block';
        document.getElementById('summaryText').textContent = summary;
    } else {
        document.getElementById('previewSummary').style.display = 'none';
    }

    // Update experience
    updateExperiencePreview();

    // Update education
    updateEducationPreview();

    // Update skills
    updateSkillsPreview();

    // Update certifications
    updateCertificationPreview();
}

function updateExperiencePreview() {
    const experiences = document.querySelectorAll('#experienceContainer .entry-block');
    let html = '';

    experiences.forEach(exp => {
        const title = exp.querySelector('.exp-title').value;
        const company = exp.querySelector('.exp-company').value;
        const duration = exp.querySelector('.exp-duration').value;
        const description = exp.querySelector('.exp-description').value;

        if (title || company) {
            html += `
                <div class="resume-entry">
                    <div class="resume-entry-title">${title}</div>
                    <div class="resume-entry-subtitle">${company}${duration ? ' | ' + duration : ''}</div>
                    ${description ? `<div class="resume-entry-description">${description}</div>` : ''}
                </div>
            `;
        }
    });

    const previewExp = document.getElementById('previewExperience');
    if (html.trim()) {
        document.getElementById('experiencePreview').innerHTML = html;
        previewExp.style.display = 'block';
    } else {
        previewExp.style.display = 'none';
    }
}

function updateEducationPreview() {
    const educations = document.querySelectorAll('#educationContainer .entry-block');
    let html = '';

    educations.forEach(edu => {
        const school = edu.querySelector('.edu-school').value;
        const degree = edu.querySelector('.edu-degree').value;
        const field = edu.querySelector('.edu-field').value;
        const year = edu.querySelector('.edu-year').value;

        if (school || degree) {
            html += `
                <div class="resume-entry">
                    <div class="resume-entry-title">${degree}${field ? ' in ' + field : ''}</div>
                    <div class="resume-entry-subtitle">${school}${year ? ' | ' + year : ''}</div>
                </div>
            `;
        }
    });

    const previewEdu = document.getElementById('previewEducation');
    if (html.trim()) {
        document.getElementById('educationPreview').innerHTML = html;
        previewEdu.style.display = 'block';
    } else {
        previewEdu.style.display = 'none';
    }
}

function updateSkillsPreview() {
    const skillsInput = document.getElementById('skillsInput').value;
    const skills = skillsInput.split(',')
        .map(skill => skill.trim())
        .filter(skill => skill.length > 0);

    let html = '';
    skills.forEach(skill => {
        html += `<span class="skill-tag">${skill}</span>`;
    });

    const previewSkills = document.getElementById('previewSkills');
    if (html.trim()) {
        document.getElementById('skillsPreview').innerHTML = html;
        previewSkills.style.display = 'block';
    } else {
        previewSkills.style.display = 'none';
    }
}

function updateCertificationPreview() {
    const certifications = document.querySelectorAll('#certificationContainer .entry-block');
    let html = '';

    certifications.forEach(cert => {
        const name = cert.querySelector('.cert-name').value;
        const org = cert.querySelector('.cert-org').value;
        const date = cert.querySelector('.cert-date').value;

        if (name) {
            html += `
                <div class="resume-entry">
                    <div class="resume-entry-title">${name}</div>
                    <div class="resume-entry-subtitle">${org}${date ? ' | ' + date : ''}</div>
                </div>
            `;
        }
    });

    const previewCert = document.getElementById('previewCertification');
    if (html.trim()) {
        document.getElementById('certificationPreview').innerHTML = html;
        previewCert.style.display = 'block';
    } else {
        previewCert.style.display = 'none';
    }
}

function printResume() {
    window.print();
}

function downloadPDF() {
    const fullName = document.getElementById('fullName').value || 'resume';
    const filename = `${fullName.replace(/\s+/g, '_')}_resume.html`;
    
    const printWindow = window.open('', '', 'width=800,height=600');
    const resumeHTML = document.getElementById('resumePreview').innerHTML;
    
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>${fullName} - Resume</title>
            <style>
                body {
                    font-family: 'Georgia', serif;
                    color: #333;
                    line-height: 1.8;
                    padding: 20px;
                }
                .resume-preview {
                    max-width: 800px;
                    margin: 0 auto;
                }
                .resume-header {
                    text-align: center;
                    margin-bottom: 30px;
                    border-bottom: 2px solid #333;
                    padding-bottom: 15px;
                }
                .resume-name {
                    font-size: 28px;
                    font-weight: bold;
                    margin-bottom: 5px;
                }
                .resume-contact {
                    font-size: 12px;
                    color: #666;
                }
                .resume-section {
                    margin-bottom: 20px;
                }
                .resume-section-title {
                    font-size: 14px;
                    font-weight: bold;
                    margin-top: 20px;
                    margin-bottom: 10px;
                    color: #007bff;
                    border-bottom: 1px solid #007bff;
                    padding-bottom: 5px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .resume-entry {
                    margin-bottom: 12px;
                }
                .resume-entry-title {
                    font-weight: bold;
                    font-size: 13px;
                }
                .resume-entry-subtitle {
                    font-style: italic;
                    color: #666;
                    font-size: 12px;
                }
                .resume-entry-description {
                    font-size: 12px;
                    margin-top: 4px;
                    color: #555;
                }
                .resume-skills {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                }
                .skill-tag {
                    background: #e8f0ff;
                    color: #007bff;
                    padding: 4px 10px;
                    border-radius: 15px;
                    font-size: 11px;
                    font-weight: 600;
                }
                @media print {
                    body { padding: 0; }
                }
            </style>
        </head>
        <body>
            <div class="resume-preview">${resumeHTML}</div>
            <script>
                window.onload = function() {
                    window.print();
                    window.close();
                };
            </script>
        </body>
        </html>
    `);
    printWindow.document.close();
}

// Initialize preview on page load
window.addEventListener('load', updatePreview);
