const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const passwordRegex =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const colorOption = [ 'blue', 'teal', 'red', 'yellow', 'orange' ];
const goalOption = [ 'Everyday', 'Once a week', 'Once a month', 'Once a year' ];
const reminderOption = [ 'Daily', 'Weekly', 'Monthly', 'Yearly', 'Fothnight' ];
const statusOption = [ 'Active', 'InActive' ];
const errorMessage = 'Error occured, try again after some time.';

const token = localStorage.getItem("token");
const config = { headers: { 'authorization': token } };

function capitializeString( word ){
    return word.charAt(0).toUpperCase() + word.slice(1) 
}

function greetingWord () {
    const greetings = ['Greetings','Bonjour', 'Hola', 'Hello', 'Hey', 'Hi'];
    return greetings[Math.floor((Math.random()*greetings.length))];
}

const dateisToday = (dateToBeVerified,dateLabel) => {
    let today = new Date(Date.now());   
    const date = new Date(dateToBeVerified);
    const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
    const [month1, day1, year1] = [today.getMonth(), today.getDate(), today.getFullYear()];
    if (day1 === day){
        if(month === month1){
            if(year === year1){
                if(dateLabel === 'end'){
                    date.setHours(23,59,0,0);
                    return date
                }
                if(dateLabel === 'start'){
                    date.setTime(today.getTime());
                    return date
                }
            }else{
                return date;
            } 
        }else{
            return date;
        } 
    }else{
        return date;
    }  
}
  
export { emailRegex,passwordRegex, colorOption, goalOption, reminderOption, statusOption, errorMessage, config, greetingWord, capitializeString, dateisToday };