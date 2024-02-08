const url = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-FT-WEB-WE/events"
async function getAllParties(){
    try{
        const response = await fetch(url)
        const parties = (await response.json()).data
        console.log(parties)
        addPartiesToPage(parties)
    }catch(error){
        console.log(error)
    }
} 
getAllParties()
function addPartiesToPage(parties){
    document.querySelector("#partyList").innerHTML = ""
parties.forEach(party => {
const html = `
<div id="${party.id}">
<span>name:${party.name}</span>
<span>location:${party.location}</span>
<span>date:${party.date}</span>
<span>description:${party.description}</span>
<span>location:${party.location}</span>
<button class = "delete">Delete</button>
</div>
`
//addEventListener()
document.querySelector("#partyList").insertAdjacentHTML("beforeend", html)
const deleteBtn = document.getElementById(party.id).querySelector("button")
console.log(deleteBtn)
deleteBtn.addEventListener("click", async function(){  
    try{
        const response = await fetch (url + "/" + party.id, {method : "DELETE"})
 getAllParties()
    }catch(error){
        console.log(error)
    }

})
    });
}
console.log(document.getElementById("createNewParty"))
document.getElementById("createNewParty").addEventListener("click", async function(event){
    event.preventDefault()
    try{
        const newParty = {
            name : document.getElementById("name").value, 
            location : document.getElementById("location").value, 
            description : document.getElementById("description").value, 
            date :new Date (document.getElementById("date").value).toISOString()
        }
      // console.log(newParty)
        const response = await fetch (url, {method : "POST", body : JSON.stringify(newParty), headers: {
            "Content-type": "application/json; charset=UTF-8"
        }})
       console.log(response)
 getAllParties()
    }catch(error){
        console.log(error)
    }
})