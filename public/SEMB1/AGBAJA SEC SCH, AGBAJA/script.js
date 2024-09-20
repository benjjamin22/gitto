const searchInput = document.getElementById('search');
const productsWrapperEl = document.getElementById('main');
const form = document.getElementById('form')
const checkEls = document.querySelectorAll('.check');
const filtersContainer = document.getElementById('filters-container');
url = '/db'

// Initialize cart item count

getfecth()

// Initialize products
const productsEls = [];



async function getfecth() {
    // Loop over the products and create the product element
    const res = await fetch(url)
    const dataa = await res.json()
    const data = dataa.filter(o => o.School === 'AMARAKU SECONDARY SCHOOL AMARAKU')
        //productsWrapperEl.innerHTML = ''
    data.forEach((product) => {
        const productEl = createProductElement(product);
        productsEls.push(productEl);
        productsWrapperEl.appendChild(productEl);
    });

};
//}

filtersContainer.addEventListener('change', filterProducts);
searchInput.addEventListener('input', filterProducts);

// Create product element
function createProductElement(product) {
    const productEl = document.createElement('div');
    productEl.innerHTML = `<a style="text-decoration:none;" onclick="movieselected('${product.id}')"href="#">
    <div class="movie">
    <img src="${product.picturepath}">
    <div class="movie-info">
  <h3>${product.Aname.Name} ${product.Aname.Mname} ${product.Aname.Surname} </h3>
    </div></div> </a> `
    return productEl;
}

async function filterProducts() {
    const res = await fetch(url)
    const data = await res.json()
        // Get search term
    const searchTerm = searchInput.value.trim().toLowerCase();
    // Get checked categories
    const checkedCategories = Array.from(checkEls)
        .filter((check) => check.checked)
        .map((check) => check.id);

    // Loop over products and check for matches
    productsEls.forEach((productEl, index) => {
        const product = data[index];

        // Check to see if product matches the search or checked items
        const matchesSearchTerm = productEl.innerText.toLowerCase().includes(searchTerm);
        const isInCheckedCategory =
            checkedCategories.length === 0 ||
            checkedCategories.includes(product.YearofAdmin);

        // Show or hide product based on matches
        if (matchesSearchTerm && isInCheckedCategory) {
            productEl.classList.remove('hide');
        } else {
            productEl.classList.add('hide');
        }
    });
}
getmovieee();
async function getmovieee() {
    let objects = document.getElementById("objects");
    const res = await fetch(url)
    const dataa = await res.json()
    const data = dataa.filter(o => o.School === 'COMM SEC SCH MBEKE-OSU')
    let allObject = data.filter((val) => {
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
    const dataa = await res.json()
    const data = dataa.filter(o => o.School === 'COMM SEC SCH MBEKE-OSU')
    let id = data.filter(ids => ids.id === movieId);
    console.log(id)

    const html = id.map(user => {
        const li = document.createElement('li')
        li.innerHTML = `
           <div class="user-profile">
                <div class="profile-top">
                    <img src="${user.picturepath}">
                    <div class="profile-info">
                        <h2 style="color:white;text-align:center;margin-bottom:0px;line-height:2rem;">${user.Aname.Name} ${user.Aname.Mname} ${user.Aname.Surname}</h2>  
                        <h1 style="margin-top:3px;margin-bottom:0px;line-height:1rem;color:yellow;">>>>NIN:${user.NIN}<<<</h1>
                    </div>
                
                </div>
                <div class="profile-bottom" style="margin-bottom:-25px";>
                    <div style="flex-direction:column;margin:-11px 0px;" class="profile-info"> 
                        <h1 style="Font-size:18px;">- NATIONAL UNIVERSITIES OF  -</h1>
                            <h1 style="margin-top:-3px;color:red;font-size:12px;">- ACCOUNTANCY STUDENT ASSOCIATION(IMSU) -</h1>                           
                        </div>
                         <h1 style="font-size:12px;margin-top:20px;text-align:center;padding:0 0rem;">DATE OF BIRTH/PRESENT CLASS</h1>
                         <div style="flex-direction:column;"class="profile-info"> 
                                <h1 style="margin-top:-1.5px;font-size:17px;">- ${user.DateofBirth} -</h1>
                                <h1 style="margin:-5px;color:red;font-size:15px;">-  ${user.Presentclass} -</h1>
                            </div> 
                    </div>
                    <div class="profile-bottom">
                        <div style="display:flex;">
                            <div style="width:31%;margin:0 1px;">
                                <h1 style="font-size:12px;margin-top:-5px;text-align:center;padding:0 1.5rem;">B/G</h1>
                                <div class="profile-info">
                                <h1 style="color:black;padding:0 .8rem;margin-top:-5px;">${user.Bloodgroup}</h1>
                                </div>
                            </div>
                            <div style="width:31%;margin:0 1px;">
                            <h1 style="font-size:12px;margin-top:-5px;text-align:center;padding:0 1rem;">STATUS</h1>
                                <div style="flex-direction:column;"class="profile-info">
                                <h1 style="color:black;padding:0 .8rem;margin-top:-5px;">STUDENT</h1>
                                 <h1 style="margin-top:-3px;color:red;font-size:12px;">- ${user.YearofAdmin} -</h1> 
                                </div>
                            </div>
                            <div style="width:31%;margin:0 1px;">
                                <h1 style="font-size:12px;margin-top:-5px;text-align:center;padding:0 1rem;">GENDER</h1>
                                <div class="profile-info">
                                <h1 style="color:black;padding:0 .8rem;margin-top:-5px;">${user.Gender}</h1>
                               
                                </div>
                            </div>
                        </div>
                        
                        <h1 style="font-size:12px;margin-top:-8px;text-align:center;padding:0 0rem;">STATE OF ORIGIN/HOMETOWN</h1>
                            <div style="flex-direction:column;"class="profile-info"> 
                                <h1 style="margin-top:-1px;margin-bottom:8px;">- ${user.State} -</h1>
                                <h1 style="margin:-5px;color:red;font-size:12px;">- ${user.HometownCommunity} -</h1>
                            </div> 
                            <div style="display:flex;margin:-9px 0px;;justify-content:center;">
                            <div>
                                <h1 style="font-size:12px;margin:0px;text-align:center;">PARENT CONTACT 1:</h1>
                                <div class="profile-info">
                                    <a style="text-decoration: none;" href="Tel:${user.ParentPhoneNo}">
                                        <div style="margin-left: 0px;"class="p1">
                                            <p2 style="margin-left: 0px;">${user.ParentPhoneNo}</p2>
                                        </div>
                                    </a>                   
                                </div>
                            </div>
                            <div>
                                <h1 style="font-size:12px;margin:0px;text-align:center;">PARENT CONTACT 2:</h1>
                                <div class="profile-info">
                                    <a style="text-decoration: none;" href="Tel:${user.ParentPhoneNo2}">
                                        <div style="margin-left: 0px;"class="p2">
                                            <p2 style="margin-left: 0px;">${user.ParentPhoneNo2}</p2>
                                        </div>
                                    </a>                   
                                </div>                           
                            </div>
                        </div>
                            
                           
                    </div>
                       
                    </div>       
                </div>
            </div>`
        facttext.appendChild(li)

    });
}
