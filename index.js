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
   
    const getElementById=document.getElementById("no-found")
    if (arrayValue === 0) {
    getElementById.classList.remove("d-none")
    }
    else{
        getElementById.classList.add("d-none")
    }
    for (const news of allNews) {
        // console.log(news)
        const { rating, title, author, thumbnail_url, image_url, details, _id: id } = news
        const { name, published_date, img } = author
        const { number: ratingNumber } = rating
      
        const createElement = document.createElement("div")

        createElement.classList.add("col")
        createElement.innerHTML = `
        <div class="card mb-3">
  <div class="row g-0">
    <div class="col-md-4">
      <img  src="${thumbnail_url}" class="w-100 h-100 rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${details.slice(0, 300)}</p>
        <p class="card-text">${details.slice(300, 1000)}</p>
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
                <img style="width:3rem ; height:3rem" class="" src="img/icons8-eyes-64.png" alt="">
                <span class="fs-2 ms-2">${ratingNumber}M</span>
            <div>
            <button onclick="toggleBtn('${id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            more
            </button>
            
        </div>
    </div>
  </div>
</div>
       
    `
        getOutputFuild.appendChild(createElement)

    }

}

const toggleBtn = async (newsId) => {
    const respons = await fetch(`https://openapi.programming-hero.com/api/news/${newsId}`)
    const datas = await respons.json()
    console.log(datas.data[0])
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
        <button class="rounded  p-2 bg-info text-white form-control" onclick="loadDatas('${category_id}')">${category_name}</button>
        `
        getCatagoriFuild.appendChild(createElement)

    });
}
catagoriFunction()

loadDatas("01")