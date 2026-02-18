// Doctor profiles data
const doctorProfiles = {
    'sarah-johnson': {
        name: 'Dr. Sarah Johnson',
        specialty: 'Cardiologist',
        experience: '15 years',
        education: 'MD from Harvard Medical School',
        about: 'Dr. Johnson specializes in preventive cardiology and has extensive experience treating heart disease. She is passionate about helping patients maintain heart health through lifestyle changes and evidence-based medicine.',
        languages: 'English, Spanish',
        availability: 'Mon-Fri, 9 AM - 5 PM'
    },
    'michael-chen': {
        name: 'Dr. Michael Chen',
        specialty: 'General Practitioner',
        experience: '10 years',
        education: 'MD from Stanford University',
        about: 'Dr. Chen provides comprehensive primary care for patients of all ages. He focuses on building long-term relationships with his patients and emphasizing preventive care.',
        languages: 'English, Mandarin, Cantonese',
        availability: 'Mon-Sat, 8 AM - 6 PM'
    },
    'emily-rodriguez': {
        name: 'Dr. Emily Rodriguez',
        specialty: 'Pediatrician',
        experience: '12 years',
        education: 'MD from Johns Hopkins University',
        about: 'Dr. Rodriguez is dedicated to providing compassionate care for children from infancy through adolescence. She specializes in developmental pediatrics and childhood nutrition.',
        languages: 'English, Spanish, Portuguese',
        availability: 'Mon-Fri, 8 AM - 4 PM'
    },
    'james-wilson': {
        name: 'Dr. James Wilson',
        specialty: 'Dermatologist',
        experience: '8 years',
        education: 'MD from Yale School of Medicine',
        about: 'Dr. Wilson specializes in both medical and cosmetic dermatology. He has expertise in treating skin conditions ranging from acne to skin cancer.',
        languages: 'English, French',
        availability: 'Tue-Sat, 10 AM - 6 PM'
    },
    'priya-patel': {
        name: 'Dr. Priya Patel',
        specialty: 'Psychiatrist',
        experience: '18 years',
        education: 'MD from Columbia University',
        about: 'Dr. Patel specializes in treating anxiety, depression, and mood disorders. She uses a holistic approach combining therapy and medication management.',
        languages: 'English, Hindi, Gujarati',
        availability: 'Mon-Thu, 9 AM - 7 PM'
    },
    'robert-kim': {
        name: 'Dr. Robert Kim',
        specialty: 'Orthopedic Surgeon',
        experience: '20 years',
        education: 'MD from University of Pennsylvania',
        about: 'Dr. Kim is an expert in joint replacement and sports medicine. He has performed over 2,000 successful surgeries and focuses on minimally invasive techniques.',
        languages: 'English, Korean',
        availability: 'Mon-Fri, 7 AM - 3 PM'
    }
};

// Book a consultation
function bookConsult(doctorName) {
    alert(`Booking consultation with ${doctorName}...\n\nYou will be redirected to the scheduling page.`);
    // In a real application, this would redirect to a booking page or open a booking form
    console.log(`Initiating booking for ${doctorName}`);
}

// View doctor profile
function viewProfile(doctorId) {
    const doctor = doctorProfiles[doctorId];
    if (!doctor) {
        alert('Doctor profile not found.');
        return;
    }

    const profileHTML = `
        <h2>${doctor.name}</h2>
        <p class="profile-specialty">${doctor.specialty}</p>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #ccc;">
        
        <p><strong>Experience:</strong> ${doctor.experience}</p>
        <p><strong>Education:</strong> ${doctor.education}</p>
        <p><strong>Languages:</strong> ${doctor.languages}</p>
        <p><strong>Availability:</strong> ${doctor.availability}</p>
        
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #ccc;">
        
        <p><strong>About:</strong></p>
        <p>${doctor.about}</p>
        
        <button class="consult-btn" onclick="bookConsult('${doctor.name}'); closeModal();" style="margin-top: 20px;">
            Book Consultation
        </button>
    `;

    document.getElementById('profileDetails').innerHTML = profileHTML;
    document.getElementById('profileModal').style.display = 'block';
}

// Close modal
function closeModal() {
    document.getElementById('profileModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('profileModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});
