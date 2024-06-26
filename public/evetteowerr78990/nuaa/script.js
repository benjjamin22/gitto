const search = document.getElementById('search');
const main = document.getElementById('main');
const form = document.getElementById('form')
url = '/evette'

const listItems = []

getData()

search.addEventListener('input', (e) => filterData(e.target.value));

async function getData() {
    const res = await fetch(url)
    const { nuasa } = await res.json()

    // Clear result
    main.innerHTML = ''

    nuasa.forEach(user => {
        const div = document.createElement('div')
        listItems.push(div)
        div.innerHTML = `<a style="text-decoration:none;" onclick="movieselected('${user.id}')"href="#">
        <div class="movie">
        <img src="${user.picturepath}">
        <div class="movie-info">
      <h3>>${user.Aname.Name}    ${user.Aname.Mname}   ${user.Aname.Surname} </h3>
      <span></span>
        </div></div> </a>
        `
        main.appendChild(div)

    })
}

function filterData(searchTerm) {
    listItems.forEach(item => {
        if (item.innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
            item.classList.remove('hide')
        } else {
            item.classList.add('hide')
        }
    })
}
getmovieee();
async function getmovieee() {
    let objects = document.getElementById("objects");
    const res = await fetch(url)
    const { nuasa } = await res.json()
    let allObject = nuasa.filter((val) => {
        if (typeof val == 'object') {
            return true;
        } else { return false; }
    });
    let objectsLen = allObject.length;
    objects.innerHTML += "" + objectsLen
}


function movieselected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'samplepreview.html';
    return false;

}

async function getmovie() {
    let movieId = sessionStorage.getItem('movieId');
    console.log(movieId)
    const res = await fetch(url)
    const { nuasa } = await res.json()
    let id = nuasa.filter(ids => ids.id === movieId);
    console.log(id)

    const html = id.map(user => {
        const li = document.createElement('li')
        li.innerHTML = `
            <div class="user-profile">
                <div class="profile-top">
                    <img src="${user.picturepath}">
                    <div class="profile-info">
                        <h2 style="color:white;text-align:center;margin-bottom:0px;line-height:2rem;">${user.Aname.Name}  ${user.Aname.Mname}  ${user.Aname.Surname}</h2>  
                        <h1 style="margin-top:3px;margin-bottom:0px;line-height:1rem;">>>>${user.RegNo}
                        <<<</h1>
                    </div>
                
                </div>
                <div class="profile-bottom">
                    <div style="flex-direction:column;margin:-11px 0px;" class="profile-info"> 
                        <h1>- EVETTE INSTITUTE OF -</h1>
                            <h1 style="margin-top:-3px;color:red;font-size:12px;">-  CATERING AND HOTEL MANAGMENT -</h1>
                        </div>
                    </div>
                    <div class="profile-bottom">
                        <div style="display:flex;">
                            <div style="width:25%;margin:0 1px;">
                                <h1 style="font-size:12px;margin-top:-5px;text-align:center;padding:0 1.5rem;">B/G</h1>
                                <div class="profile-info">
                                <h1 style="color:black;padding:0 .8rem;">${user.Bloodgroup}</h1>
                                </div>
                            </div>
                            <div style="width:45%;margin:0 1px;">
                            <h1 style="font-size:12px;margin-top:-5px;text-align:center;padding:0 1rem;">STATUS/VALIDITY</h1>
                                <div style="flex-direction:column;"class="profile-info">
                                <h1 style="color:black;padding:0 .8rem;margin-top:-5px;">STUDENT</h1>
                                <h1 style="margin:0px;color:red;font-size:12px;margin-bottom:0px;line-height:.5rem;">- ${user.Validity} -</h1>
                                </div>
                            </div>
                            <div style="width:25%;margin:0 1px;">
                                <h1 style="font-size:12px;margin-top:-5px;text-align:center;padding:0 1.5rem;">GENDER</h1>
                                <div class="profile-info">
                                <h1 style="color:black;padding:0 .8rem;">${user.Sex}</h1>
                                </div>
                            </div>
                        </div>
                        
                        <h1 style="font-size:12px;margin-top:-8px;text-align:center;padding:0 0rem;">LGA/STATE OF ORIGIN</h1>
                            <div style="flex-direction:column;"class="profile-info"> 
                                <h1 style="margin-top:-1px;">-  -</h1>
                                <h1 style="margin:-5px;color:red;font-size:12px;">-  -</h1>
                            </div> 
                            <div style="display:flex;margin:-9px 0px;;justify-content:center;margin-top:.3rem;">
                                <div>
                                    <h1 style="font-size:12px;margin:0px;text-align:center;">CONTACT:</h1>
                                    <div class="profile-info">
                                        <a style="text-decoration: none;" href="Tel:${user.inparentno}">
                                            <div style="margin-left: 0px;"class="p1">
                                                <p2 style="margin-left: 0px;">-</p2>
                                            </div>
                                        </a>                   
                                    </div>
                                </div>
                                <div>
                                    <h1 style="font-size:12px;margin:0px;text-align:center;">EMERGENCY CONTACT:</h1>
                                    <div class="profile-info">
                                        <a style="text-decoration: none;" href="Tel:${user.inparentno2}">
                                            <div style="margin-left: 0px;"class="p2">
                                                <p2 style="margin-left: 0px;">-</p2>
                                            </div>
                                        </a>                   
                                    </div>                           
                                </div>
                        </div>
                            
                            <ul style="margin-bottom:7rem;margin-top:.5rem;">
                                <li>
                                    <img class="dropDown" src="./facebook.jpg"style="width:60px;height:60px; border-radius:50px;"></span>
                                    <ul style="width:20rem;background-color: aqua;height: 2rem;justify-content: center; text-align: center;">
                                        <li style="justify-content: center;width:26.6rem;background-color: rgb(28, 88, 158);margin-left: -5rem;color:white">facebook:</li>
                                    </ul>
                                </li>
                                <li>
                                <img class="dropDown" src="./instagrame.jpg"style="width:60px;height:60px; border-radius:50px;"></span>
                                    <ul style="width:5rem;background-color: red;height: 2rem;justify-content: center; text-align: center;">
                                        <li style="justify-content: center;width:27rem;background-color: red;margin-left:-10rem;color:white">instagrame:</li>
                                    </ul>
                                </li>
                                <li>
                                <img class="dropDown" src="./tiktok.jpg"style="width:60px;height:60px; border-radius:50px;"></span>
                                    <ul style="width:5rem;background-color: orangered;height: 2rem;justify-content: center; text-align: center;">
                                        <li style="justify-content: center;width:27rem;background-color:#313131;margin-left: -14.8rem;color:white">tiktok:</li>
                                    </ul>
                                </li>
                                <li>
                                <img class="dropDown" src="./twitter.jpg"style="width:60px;height:60px; border-radius:50px;"></span>
                                    <ul style="width:5rem;background-color: tomato;height: 2rem;justify-content: center; text-align: center;">
                                        <li style="justify-content: center;width:27rem;background-color: rgb(28, 88, 158);margin-left: -19.7rem;color:white">twitter:</li>
                                    </ul>
                                </li>
                            </ul>
                    </div>
                       
                    </div>       
                </div>
            </div>`
        facttext.appendChild(li)

    });
}