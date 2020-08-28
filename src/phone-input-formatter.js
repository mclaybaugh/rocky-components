document.getElementById('phonenumber').addEventListener('input', formatPhoneInput);

function formatPhoneInput(event) {
    event.target.value = formatPhoneNumber(event.target.value);
}

function formatPhoneNumber(input) {
    v = input.replace(/\D/g,'');
    if (v.length < 7 && v.length > 3) {
        v = '(' + v.slice(0,3) + ') ' + v.slice(3);
    } else if (v.length < 11 && v.length > 6) {
        v = '(' + v.slice(0,3) + ') ' + v.slice(3,6) + '-' + v.slice(6);
    } else if (v.length == 11) {
        v = '+' + v.slice(0, 1) + ' (' + v.slice(1,4)
            + ') ' + v.slice(4, 7) + '-' + v.slice(7);
    } else if (v.length < 13 && v.length > 11) {
        v = '+' + v.slice(0,2) + ' ' + v.slice(2,5)
            + ' ' + v.slice(5,8) + ' ' + v.slice(8);
    } else if (v.length > 12) {
        v = '+' + v.slice(0,3) + ' ' + v.slice(3,6)
            + ' ' + v.slice(6,9) + ' ' + v.slice(9);
    }
    return v;
}