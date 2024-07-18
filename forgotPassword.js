const formInputFP = document.getElementById('formInputFP');
const emailFp = document.getElementById('emailFp');
const btnFP = document.getElementById('btnFP');
const fomrFP = document.getElementById('fomrFP');
const formSC = document.getElementById('formSC');
const emailSc = document.getElementById('emailSc');
const formNP = document.getElementById('formNP');


function getValueInput() {
    if (emailFp.value) {
        document.getElementById('btnFP').style.background = 'red';
        formInputFP.addEventListener('submit', function (e) {
            e.preventDefault();
            fomrFP.style.display = 'none';
            formSC.style.display = 'grid';
        });
    }
    else {
        document.getElementById('btnFP').style.background = 'rgba(208, 210, 213, 1)';
    }
}
function getValueInputSc() {
    if (emailSc.value) {
        document.getElementById('btnSC').style.background = 'red';
        formInputFP.addEventListener('submit', function (e) {
            e.preventDefault();
            formSC.style.display = 'none';
            formNP.style.display = 'grid';
        });
    }
    else {
        document.getElementById('btnSC').style.background = 'rgba(208, 210, 213, 1)';
    }
}
