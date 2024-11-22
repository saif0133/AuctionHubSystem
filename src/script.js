

const test = localStorage.getItem("authToken")||null;

if(!test){
    const x=document.getElementById("srf");
    x.style.display="flex"
}

const alertPlaceholder = document.getElementById('liveAlertPlaceholder');

const appendAlert = (message, type) => {
  if (alertPlaceholder.querySelector('.alert')) {
    alertPlaceholder.innerHTML = '';
  }

  const wrapper = document.createElement('div');
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('');

  alertPlaceholder.append(wrapper);
};

const alertTrigger = document.getElementById('liveAlertBtn');
if (alertTrigger) {
  alertTrigger.addEventListener('click', () => {
    appendAlert('Login to access all features', 'danger');
  });
}
