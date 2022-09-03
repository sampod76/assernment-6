// data load 

const loadDatas = async (catagorisID) => {

    const respons = await fetch(`https://openapi.programming-hero.com/api/news/category/${catagorisID}`)
    const datas = await respons.json()
    displayNews(datas.data)
}

const displayNews = (allNews) => {
    const getOutputFuild = document.getElementById("display-fuild")
    getOutputFuild.innerHTML = ''
    arrayValue = allNews.length
   

    // no list 
    const getNoOfList=document.getElementById("list-Number")
    getNoOfList.innerHTML=`
    <h1 class="catagoriesColor p-3 rounded-3 my-2">Total this categories  : ${arrayValue} News</h2>
    `


    const getElementById=document.getElementById("no-found")
    if (arrayValue === 0) {
    getElementById.classList.remove("d-none")
    }
    else{
        getElementById.classList.add("d-none")
    }

    // add sort function 
   const sortFunction=(isTrue)=>{
    if(isTrue===true){
        allNews.sort((a,b)=>{
            if(a.total_view<b.total_view){
                return 1
            }
            else{
                return -1
            }
        })
    }
    else(
        allNews.sort((a,b)=>{
            if(a.total_view>b.total_view){
                return 1
            }
            else{
                return -1
            }
        })
    )
   }
//    default call sort 
   sortFunction(true)


    for (const news of allNews) {
        // console.log(news)
        const { rating, title, author, thumbnail_url, image_url, details, _id: id,total_view } = news
        const { name, published_date, img } = author
        const { number: ratingNumber } = rating
      
        const createElement = document.createElement("div")

        createElement.classList.add("col")
        createElement.innerHTML = `
        <div class="card mb-3">
  <div class="row g-0">
    <div class="col-md-4 p-4">
      <img  src="${thumbnail_url}" class="w-100 h-100 rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${title} </h5>
        <h4 class='text-info'><span>Total view : ${total_view?total_view:"no found" }</span></h4>
        <p class="card-text">${details.length>300?details.slice(0,299):details}</p>
        <p class="card-text">${details.slice(299,600).length>300?details.slice(299,500)+"...":details.slice(299,600)}</p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </div>
      <!-- img -->
        <div class="d-flex justify-content-between">
            <div class="d-flex">
               <div>
                   <img style="width:3rem" class="rounded-circle" src="${img}" alt="">
               </div>
             <div class="ms-2">
              <p>${name?name:"No found"}</p>
              <p>${published_date}</p>
             </div>
           </div> 
          <div> <span class="material-symbols-outlined">
          visibility ${ratingNumber}M</div>
          
           <div> <button onclick="toggleBtn('${id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
           more
           </button></div>
            
        </div>
    </div>
  </div>
</div>
       
    `
        getOutputFuild.appendChild(createElement)

    }

    // spainner of because data load after 
    spainner(false)

}

const toggleBtn = async (newsId) => {
    const respons = await fetch(`https://openapi.programming-hero.com/api/news/${newsId}`)
    const datas = await respons.json()
    displayModal(datas.data[0])
}

const displayModal = (modalDetails) => {

    const getModalBody = document.getElementById("modal-body")
    const { total_view, author, image_url } = modalDetails
    const { name, published_date, img } = author
    getModalBody.innerHTML = `
 <img class="img-fluid" src="${image_url}" alt="">
 <img style="width:3rem" class="rounded-circle mt-2" src="${img}" alt="">
 <h5>Total view :${total_view ? total_view : "No found"}</h5>
 <h5>Author: ${name?name:"no found"}</h5>
 <h5>Published Date :${published_date}</h5>
 
 `

}


//-------------------catagoris to click load data --start----------------

const catagoriFunction = async () => {

    const respons = await fetch(`https://openapi.programming-hero.com/api/news/categories`)
    const catagorisDatas = await respons.json()
    displayCatagori(catagorisDatas.data.news_category)
}

const displayCatagori = (catagorisLink) => {
    const getCatagoriFuild = document.getElementById("catagoriId")
   
    catagorisLink.forEach(catagori => {
        const { category_id, category_name } = catagori
        const createElement = document.createElement("a")
        createElement.innerHTML = `
        <button class="rounded  p-2 btn-color text-white form-control" onclick="loadDatas('${category_id}'); spainner(true)">${category_name}</button>
        `
        
        getCatagoriFuild.appendChild(createElement)


    });
    
}
//-------------------catagoris to click load data --end----------------

//    spainner function
const spainner=(isTrue)=>{
    const getElementById=document.getElementById("spinnerId")
    if(isTrue===true){
        getElementById.classList.remove("d-none")
    }
    else{
        getElementById.classList.add("d-none")
    }
}


catagoriFunction()

loadDatas("01")