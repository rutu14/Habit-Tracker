const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const passwordRegex =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
function capitializeString( word ){
    return word.charAt(0).toUpperCase() + word.slice(1) 
}
const colorOption = [ 'blue', 'teal', 'red', 'yellow', 'orange' ];
const goalOption = [ 'Everyday', 'Once a week', 'Once a month', 'Once a year' ];
const reminderOption = [ 'Daily', 'Weekly', 'Monthly', 'Yearly', 'Fothnight' ];
const labels = [ 'label1', 'label2', 'label3', 'label4', 'label5' ];
const statusOption = [ 'Active', 'InActive' ];

export { emailRegex,passwordRegex, colorOption, labels, goalOption, reminderOption, statusOption, capitializeString };