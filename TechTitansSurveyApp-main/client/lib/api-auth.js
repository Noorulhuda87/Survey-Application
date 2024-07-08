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
    This file defines functions that access the back end to authenticate users of the Survey App when sign in is attempted.

*/
const signin = async (user) => { 
try {
let response = await fetch('/auth/signin/', { 
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
const signout = async () => { 
try {
let response = await fetch('/auth/signout/', { method: 'GET' }) 
return await response.json()
} catch(err) { 
console.log(err)
} 
}
export { signin, signout }
