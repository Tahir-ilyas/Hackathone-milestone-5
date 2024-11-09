// get reference to the form display area
const form = document.getElementById("resume-form") as HTMLFormElement
const resumeDisplayElement = document.getElementById("resume-display") as HTMLDivElement
const shareableLinkContainer = document.getElementById('shareable-link-container') as HTMLDivElement
const shareableLinkElement = document.getElementById('shareable-link') as HTMLAnchorElement
const downloadPdfButton = document.getElementById('download-pdf') as HTMLButtonElement

// handle form submission
form.addEventListener('submit',(event:Event) => {
    event.preventDefault()
// collect input values

const username = (document.getElementById('username') as HTMLInputElement).value
const name = (document.getElementById('name') as HTMLInputElement).value
const email = (document.getElementById('email') as HTMLInputElement).value
const phone = (document.getElementById('phone') as HTMLInputElement).value
const education = (document.getElementById('education') as HTMLTextAreaElement).value
const experience = (document.getElementById('experience') as HTMLTextAreaElement).value
const skills = (document.getElementById('skills') as HTMLTextAreaElement).value

// save from data loacastorage with the username as the key 

const resumeData = {
    name,
    email,
    phone,
    education,
    experience,
    skills
}
localStorage.setItem(username, JSON.stringify(resumeData))

// generate resume content dynamically
const resumeHTML = `
<h2><b>Editable Resume Builder<b><h2>
<h3>Personal Information<h3>
<p><b>Name:</b><span contenteditable ="true">${name}</span></p>
<p><b>Email:</b><span contenteditable ="true">${email}</span></p>
<p><b>Phone:</b><span contenteditable ="true">${phone}</span></p>

<h3>Education</h3>
<p contenteditable ="true>${education}</p>

<h3>Education</h3>
<p contenteditable ="true>${experience}</p>

<h3>Skills</h3>
<p contenteditable ="true>${skills}</p>
`;

// Display generated resume

resumeDisplayElement.innerHTML = resumeHTML;

// generate the sharable URL with the username only 

const shareableURL = `${window.location.origin}?username=${encodeURIComponent(username)}`

// display the sharable link 

shareableLinkContainer.style.display = 'block';
shareableLinkElement.href = shareableURL;
shareableLinkElement.textContent = shareableURL;

})

// handle pdf download 
downloadPdfButton.addEventListener('click',() =>{
    window.print() // this will open the print dialoge and allow the user save as pdf 
})

// Prefill the form base on the username in the url 
window.addEventListener('DOMContentLoaded',() =>{
    const urlprams = new URLSearchParams(window.location.search)
    const username = urlprams.get('username')

    if(username) {
        const saveResumeData = localStorage.getItem(username)

        if(saveResumeData){
            const resumeData = JSON.parse(saveResumeData)
            (document.getElementById('username') as HTMLInputElement).value = username;
            (document.getElementById('name') as HTMLInputElement).value = resumeData.name;
            (document.getElementById('email') as HTMLInputElement).value = resumeData.email;
            (document.getElementById('phone') as HTMLInputElement).value = resumeData.phone;
            (document.getElementById('education') as HTMLTextAreaElement).value = resumeData.education;
            (document.getElementById('experience') as HTMLInputElement).value = resumeData.experience;
            (document.getElementById('skills') as HTMLInputElement).value = resumeData.skills;

        }
    }
});

