import Swal from 'sweetalert2';

export function see(message, status = 0) {
    let icon = 'info';
    if (status >= 400) {
        icon = 'error';
    } else if (status >= 300) {
        icon = 'warning';
    } else if (status >= 200) {
        icon = 'success';
    } else if (status >= 100) {
        icon = 'question';
    }

    let text = message;
    if (typeof message === 'object') {
        if (message.message) {
            text = message.message;
        } else {
            text = JSON.stringify(message);
        }
    }
    return Swal.fire(text, undefined, icon);
}

export function sure(message) {
    return Swal.fire({
        title: message,
        type: 'question',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
    });
}

export function enter(message, value = '') {
    return Swal.fire({
        title: message,
        input: 'text',
        inputValue: value,
        showCancelButton: true
    });
}
