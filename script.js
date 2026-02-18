// Doctor profiles data
const doctorProfiles = {
    'meetali-bidaye': {
        name: 'Dr. Meetali Bidaye',
        specialty: 'Nephrologist',
        experience: '13 years',
        education: 'MBBS, MRCP (London), MRCP (Nephrology)',
        about: 'Dr. Meetali Bidaye is a UK-trained Nephrologist with over 13 years of experience as a Consultant Nephrologist in Pune. After completing her specialist training in Nephrology in England, she returned to India to bring global best practices to local care. She is the founder of Nivarak (nivarak.com), a preventive eldercare startup focused on proactive, coordinated health support for seniors, and co-founder of the I-SHARE Foundation, an NGO dedicated to improving access to medical care for underserved communities. Outside of medicine, Dr. Bidaye is an avid tennis player and a passionate dog lover.',
        languages: 'English, Marathi, Hindi',
        availability: 'By appointment'
    },
    'placeholder-2': {
        name: 'Lorem Ipsum',
        specialty: 'Speciality',
        experience: 'Coming soon',
        education: 'Lorem ipsum dolor sit amet',
        about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
        languages: 'Lorem, Ipsum',
        availability: 'Coming soon'
    },
    'placeholder-3': {
        name: 'Lorem Ipsum',
        specialty: 'Speciality',
        experience: 'Coming soon',
        education: 'Lorem ipsum dolor sit amet',
        about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
        languages: 'Lorem, Ipsum',
        availability: 'Coming soon'
    }
};

// Book a consultation
function bookConsult(doctorName) {
    alert(`Booking consultation with ${doctorName}...\n\nYou will be redirected to the scheduling page.`);
    // In a real application, this would redirect to a booking page or open a booking form
    console.log(`Initiating booking for ${doctorName}`);
}

// View doctor profile — opens right-hand drawer
function viewProfile(doctorId) {
    const doctor = doctorProfiles[doctorId];
    if (!doctor) return;

    const profileHTML = `
        <h2>${doctor.name}</h2>
        <span class="profile-specialty">${doctor.specialty}</span>

        <div class="profile-meta">
            <p><strong>Experience:</strong> ${doctor.experience}</p>
            <p><strong>Credentials:</strong> ${doctor.education}</p>
            <p><strong>Languages:</strong> ${doctor.languages}</p>
            <p><strong>Availability:</strong> ${doctor.availability}</p>
        </div>

        <div class="profile-about">
            <p>${doctor.about}</p>
        </div>

        <button class="consult-btn" onclick="bookConsult('${doctor.name}'); closeDrawer();" style="width:100%;">
            Book Consultation
        </button>
    `;

    document.getElementById('profileDetails').innerHTML = profileHTML;
    document.getElementById('profileDrawer').classList.add('open');
    document.getElementById('drawerOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
}

// Close drawer
function closeDrawer() {
    document.getElementById('profileDrawer').classList.remove('open');
    document.getElementById('drawerOverlay').classList.remove('open');
    document.body.style.overflow = '';
}

// Close drawer with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeDrawer();
    }
});
