// get reference to the form display area
var form = document.getElementById("resume-form");
var resumeDisplayElement = document.getElementById("resume-display");
var shareableLinkContainer = document.getElementById('shareable-link-container');
var shareableLinkElement = document.getElementById('shareable-link');
var downloadPdfButton = document.getElementById('download-pdf');
// handle form submission
form.addEventListener('submit', function (event) {
    event.preventDefault();
    // collect input values
    var username = document.getElementById('username').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var experience = document.getElementById('experience').value;
    var skills = document.getElementById('skills').value;
    // save from data loacastorage with the username as the key 
    var resumeData = {
        name: name,
        email: email,
        phone: phone,
        education: education,
        experience: experience,
        skills: skills
    };
    localStorage.setItem(username, JSON.stringify(resumeData));
    // generate resume content dynamically
    var resumeHTML = "\n<h2><b>Editable Resume Builder<b><h2>\n<h3>Personal Information<h3>\n<p><b>Name:</b><span contenteditable =\"true\">".concat(name, "</span></p>\n<p><b>Email:</b><span contenteditable =\"true\">").concat(email, "</span></p>\n<p><b>Phone:</b><span contenteditable =\"true\">").concat(phone, "</span></p>\n\n<h3>Education</h3>\n<p contenteditable =\"true>").concat(education, "</p>\n\n<h3>Education</h3>\n<p contenteditable =\"true>").concat(experience, "</p>\n\n<h3>Skills</h3>\n<p contenteditable =\"true>").concat(skills, "</p>\n");
    // Display generated resume
    resumeDisplayElement.innerHTML = resumeHTML;
    // generate the sharable URL with the username only 
    var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
    // display the sharable link 
    shareableLinkContainer.style.display = 'block';
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
});
// handle pdf download 
downloadPdfButton.addEventListener('click', function () {
    window.print(); // this will open the print dialoge and allow the user save as pdf 
});
// Prefill the form base on the username in the url 
window.addEventListener('DOMContentLoaded', function () {
    var urlprams = new URLSearchParams(window.location.search);
    var username = urlprams.get('username');
    if (username) {
        var saveResumeData = localStorage.getItem(username);
        if (saveResumeData) {
            var resumeData = JSON.parse(saveResumeData)(document.getElementById('username')).value = username;
            document.getElementById('name').value = resumeData.name;
            document.getElementById('email').value = resumeData.email;
            document.getElementById('phone').value = resumeData.phone;
            document.getElementById('education').value = resumeData.education;
            document.getElementById('experience').value = resumeData.experience;
            document.getElementById('skills').value = resumeData.skills;
        }
    }
});
