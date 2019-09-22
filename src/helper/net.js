export function read(file, callback) {
    const reader = new FileReader();
    reader.onload = event => {
        callback(event.target.result);
    };
    reader.onerror = error => {
        alert(error);
    };
    reader.readAsText(file);
}

export function download(name, data) {
    let json;
    if (typeof data === 'string') {
        json = data;
    } else {
        json = JSON.stringify(data);
    }
    // console.log(json)
    const blob = new Blob([json], { type: 'application/json' });
    const link = document.createElement('a');
    link.download = name;
    link.href = URL.createObjectURL(blob);
    link.style = 'display: none';
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(link.href);
}
