document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('studentForm');
    const statusMessage = document.getElementById('statusMessage');

    if (!form || !statusMessage) return;

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const today = new Date();
        const todayString = [
            today.getFullYear(),
            String(today.getMonth() + 1).padStart(2, '0'),
            String(today.getDate()).padStart(2, '0')
        ].join('-');
        const fields = Array.from(form.querySelectorAll('input, select, textarea'));
        let isValid = true;

        fields.forEach((field) => {
            const isEmpty = !field.value.trim();
            const isInvalidEmail = field.type === 'email' && field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
            const isInvalidPhone = field.type === 'tel' && field.value && !/^[0-9+()\-\s]{7,20}$/.test(field.value.trim());
            const isFutureDate = field.type === 'date' && field.value && field.value > todayString;
            const invalid = isEmpty || isInvalidEmail || isInvalidPhone || isFutureDate;

            field.classList.toggle('input-error', invalid);
            isValid = isValid && !invalid;
        });

        if (!isValid) {
            statusMessage.textContent = 'Please fix the highlighted fields before submitting.';
            statusMessage.className = 'status-message error';
            statusMessage.hidden = false;
            return;
        }

        statusMessage.textContent = 'This GitHub Pages demo does not save registrations. Connect a backend to store submissions.';
        statusMessage.className = 'status-message error';
        statusMessage.hidden = false;
    });
});
