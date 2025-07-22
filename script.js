const selector = document.querySelectorAll(".selector select");
let btn = document.querySelector("form button");
// let input = document.getElementById("myInput").value;
let img = document.getElementsByClassName("flag")[0];
let img2 = document.getElementsByClassName("flag")[1];
let fromCurr="USD";
let toCurr="INR";
let result=document.querySelector(".result");
let amt=1;

for (select of selector) {
  for (currCode in countryList) {
    let newOption = document.createElement("Option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let ctrCode = element.value;
  let contryCode = countryList[ctrCode];
  if(element.name === "from"){
    fromCurr=ctrCode;
  } else {
    toCurr=ctrCode;
  }
  let newFlag = `https://flagsapi.com/${contryCode}/flat/64.png`;
  if (element.name === "from") {
    img.src = newFlag;
  } else if (element.name === "to") {
    img2.src = newFlag;
  }
};

btn.addEventListener("click", (e) => {
  e.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtValue = Number.parseInt(amount.value)
  // let isNotNumber = Number.isNaN(amtValue)

  // if ((amtValue = "" || amtValue < 1)) {
  //   alert("fuck off");
  // }else if(isNotNumber){
  //   alert("Chale ja BSDK....!!!")
  // }else{
  //   console.log("all Ok")
  // }
  
  getData(fromCurr,toCurr,amtValue)
  // console.log(fromCurr, toCurr)
//   const URL=`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_ob8UdLcYQ7mX0zAlmoYTnGY9mRUo8XHKGtWwpE3c&currencies=${toCurr}&base_currency=${fromCurr}`
}
);

async function getData(fromCurr,toCurr,amt) {
  let req=await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_ob8UdLcYQ7mX0zAlmoYTnGY9mRUo8XHKGtWwpE3c&currencies=${toCurr}&base_currency=${fromCurr}`)
  let res=await req.json()
  if(!res.data){
    result.setAttribute('class','red')
    result.innerHTML="Currency data not available"
  } else {
    result.removeAttribute('class','red')
    let resValue=(res.data[toCurr]*amt)
    result.innerHTML=`${amt} ${fromCurr} = ${resValue} ${toCurr}`
  }

}
getData(fromCurr,toCurr,amt)