document.querySelector("#myform").addEventListener("submit",Formsubmit)

function Formsubmit(e){
    e.preventDefault()
    

    let name = document.querySelector("#NM").value
    let age = document.querySelector("#AG").value
    age = Number(age)
    let place = document.querySelector("#PL").value
    let batch_name = document.querySelector("#batch").value
    let profession = document.querySelector("#profession").value
   

    let obj = {
        name,age,place,batch_name,profession
    }

   RegisterUser(obj)
}

async function RegisterUser(data){
    let response =await fetch("https://mock-02.onrender.com/users",{
        method:"POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({
       ...data
        })

    }).then((res)=>{
        return  res.status ==201? alert("Registeration Successful"):alert("something went wrong try again")
      })
  
}