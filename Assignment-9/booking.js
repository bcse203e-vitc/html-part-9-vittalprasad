document.getElementById('bookingForm').addEventListener('submit', function (event) {
    event.preventDefault();

    let isValid = true;

    // Reset previous errors and hide error messages
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach((element) => {
        element.textContent = '';
    });

    // Validation
    const name = document.getElementById('name').value;
    if (name === '') {
        isValid = false;
        document.getElementById('nameError').textContent = '*Name is required.';
    }

    const email = document.getElementById('email').value;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        isValid = false;
        document.getElementById('emailError').textContent = '*Please enter a valid email address.';
    }

    const phone = document.getElementById('phone').value;
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
        isValid = false;
        document.getElementById('phoneError').textContent = '*Please enter a valid 10-digit phone number.';
    }

    const service = document.getElementById('service').value;
    if (service === 'select') {
        isValid = false;
        document.getElementById('serviceError').textContent = '*Please select a service.';
    }

    const dt = document.getElementById('dt').value;
    if (!dt) {
        isValid = false;
        document.getElementById('dtError').textContent = '*Please select a date and time.';
    }

    const agree = document.getElementById('agree').checked;
    if (!agree) {
        isValid = false;
        document.getElementById('agreeError').textContent = '*You must agree to the terms and conditions.';
    }

    // If the form is valid, process and store the data
    if (isValid) {
        const customerName = name;
        const selectedService = service;
        const appointmentDateTime = dt;
        const status = "Pending";  // Default status

        // Save appointment to localStorage
        let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        appointments.push({ customerName, selectedService, appointmentDateTime, status });
        localStorage.setItem('appointments', JSON.stringify(appointments));

        // Add appointment to table
        addAppointmentToTable({ customerName, selectedService, appointmentDateTime, status });

        // Show confirmation popup
        showConfirmationPopup(customerName, selectedService, appointmentDateTime);

        // Reset form
        document.getElementById('bookingForm').reset();
    }
});

// Add appointment to table
function addAppointmentToTable(appointment) {
    const table = document.getElementById('appointmentsTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    newRow.insertCell(0).textContent = appointment.customerName;
    newRow.insertCell(1).textContent = appointment.selectedService;
    newRow.insertCell(2).textContent = appointment.appointmentDateTime;
    newRow.insertCell(3).textContent = appointment.status;
}

// Show confirmation popup
function showConfirmationPopup(name, service, dateTime) {
    const popup = document.getElementById('confirmationPopup');
    const confirmationMessage = document.getElementById('confirmationMessage');
    confirmationMessage.textContent = `Thank you, ${name}! Your appointment for ${service} on ${dateTime} is confirmed.`;
    popup.style.display = 'block';

    // Close the popup
    document.getElementById('popupClose').onclick = function () {
        popup.style.display = 'none';
    };
}

// Load appointments from localStorage on page load
window.onload = function () {
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointments.forEach(addAppointmentToTable);
};
