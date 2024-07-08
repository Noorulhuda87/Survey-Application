/*
    Project: Tech Titans Survey App
    Class: Comp229 Sec 402
    Authors: 
        Noorulhuda Khamees  – 301291589
        Ronald Hardock      – 301274360
        Amer Ajjawi         – 301319092
        Blake Hewitt        – 301279469
        Gabriel Normand     – 301293488
        Jordi Llobet Ferre  – 301261208

    File Description:
    This file defines functions to perform CRUD operations accessing the back end api endpoints of the Survey App.
*/
const create = async (user) => { 
try {
let response = await fetch('/api/users/', { 
method: 'POST',
headers: {
'Accept': 'application/json',
'Content-Type': 'application/json' 
},
body: JSON.stringify(user) 
})
return await response.json() 
} catch(err) {
console.log(err) 
}
}
const list = async (signal) => { 
try {
let response = await fetch('/api/users/', { 
method: 'GET',

signal: signal, 
})
return await response.json() 
} catch(err) {
console.log(err) 
}
}
const read = async (params, credentials, signal) => { 
try {
let response = await fetch('/api/users/' + params.userId, { 
method: 'GET',
signal: signal, 
headers: {
'Accept': 'application/json',
'Content-Type': 'application/json',
'Authorization': 'Bearer ' + credentials.t 
}
})
return await response.json() 
} catch(err) {
console.log(err) 
}
}
const update = async (params, credentials, user) => { 
try {
let response = await fetch('/api/users/' + params.userId, { 
method: 'PUT',
headers: {
'Accept': 'application/json',
'Content-Type': 'application/json',
'Authorization': 'Bearer ' + credentials.t 
},
body: JSON.stringify(user) 
})
return await response.json() 
} catch(err) {
console.log(err) 
}
}
const remove = async (params, credentials) => { 
try {
let response = await fetch('/api/users/' + params.userId, { 
method: 'DELETE',
headers: {
'Accept': 'application/json',
'Content-Type': 'application/json',
'Authorization': 'Bearer ' + credentials.t 
}
})
return await response.json() 
} catch(err) {
console.log(err) 
}
}
export { create, list, read, update, remove }