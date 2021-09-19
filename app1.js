const btn = document.querySelectorAll("button");
for(let i=0;i<btn.length;i++)
{
    btn[i].addEventListener("click",function(event){
       //  console.log("Clicked!!!");
        let tabcontent,tablinks;
        tabcontent=document.querySelectorAll(".tabcontent");
        for(let i=0;i<tabcontent.length;i++)
        {
            tabcontent[i].style.display="none";
        }
        tablinks=document.querySelectorAll(".tablinks");
        for(let i=0;i<tablinks.length;i++)
        {
            tablinks[i].classList.remove("selected")
        }
       //  console.log(`${btn[i].innerText}`);
        document.querySelector(`#${btn[i].innerText}`).style.display="flex";
        btn[i].classList.add("selected");
        if(btn[i].innerText==="Blogs")
        {
            let invisible = document.querySelectorAll("#Blogs .card");
            for(let i=0;i<invisible.length;i++)
            {
                invisible[i].style.display="none";
            }
        
            let visible = document.querySelectorAll(`#b1`)
            for(let i=0;i<visible.length;i++)
            {
                visible[i].style.display="block";
            }
        }
    })
}
const page = document.querySelectorAll(".page-link");
let page_number=1;
for(let i=0;i<page.length;i++)
{
    page[i].addEventListener("click",function(event){
        event.preventDefault();
        if(page[i].innerText==="Previous"&&page_number!==1)
        {
            page_number=page_number-1;
        }
        else if(page[i].innerText==="Next"&&page_number!==page.length-2)
        {
            page_number=parseInt(page_number)+1;
        }
        else{
            page_number=page[i].innerText;
        }
        if(parseInt(page_number)===1)
        {
            document.querySelector(".previous").classList.add("disabled")
        }
        if(parseInt(page_number)>1&&parseInt(page_number)<(page.length-2))
        {
            document.querySelector(".previous").classList.remove("disabled")
            document.querySelector(".next").classList.remove("disabled")
        }
        if(parseInt(page_number)===(page.length-2))
        {
            document.querySelector(".next").classList.add("disabled")
        }
        console.log(page_number)
        let invisible = document.querySelectorAll("#Blogs .card");
    for(let i=0;i<invisible.length;i++)
    {
        invisible[i].style.display="none";
    }

    let visible = document.querySelectorAll(`#b${page_number}`)
    for(let i=0;i<visible.length;i++)
    {
        visible[i].style.display="block";
    }
    })    
}
for(let i=0;i<btn.length;i++)
{
    btn[i].addEventListener("click",function(event){
        async function fetchData(url){
            const response = await fetch(url);
            var data = await response.json();
            console.log(data)
            let mainCard = document.createElement("div")
            mainCard.classList.add("row","cards","position-relative","justify-content-center","mt-5","flex-wrap","tabcontent","change")
            mainCard.id="Blogs"
            for(let j=0;j<data.length;j++)
            {
                let newCard=document.createElement("div")
                newCard.classList.add("card", "g-0")
                newCard.id="b1"
                let cardImg=document.createElement("div")
                cardImg.classList.add("image")
                let img = document.createElement("img")
                img.src=`${data[j].thumbnail}`
                cardImg.appendChild(img)
                let social=document.createElement("div")
                social.classList.add("social")
                let socialLinks = document.createElement("a")
                socialLinks.classList.add("ms-3", "mt-3")
                socialLinks.href=`${data[j].link}`
                let linkImg=document.createElement("img")
                linkImg.src=`${data[j].thumbnail}`
                socialLinks.appendChild(linkImg)
                social.appendChild(socialLinks)
                cardImg.appendChild(social)
                newCard.appendChild(cardImg)
                let cardBody=document.createElement("div")
                cardBody.classList.add="card-body"
                let cardHeading=document.createElement("div")
                cardHeading.classList.add="card_heading"
                cardHeading.append(`${data[j].name}`)
                cardBody.appendChild(cardHeading)
                let cardText = document.createElement("p")
                cardText.classList.add="card-text"
                cardText.append(`${data[j].description}`)
                cardBody.appendChild(cardText)
                let readMore = document.createElement("div")
                readMore.classList.add("read_more")
                let readLink = document.createElement("a")
                readLink.href=`${data[j].link}`
                readLink.target="_blank"
                readLink.append("Read More")
                readMore.appendChild(readLink)
                cardBody.appendChild(readMore)
                newCard.appendChild(cardBody)
                mainCard.appendChild(newCard)
            }
        }
        
        fetchData("http://startupguidedeveloper.herokuapp.com/api/getBlogs")
        
    })
}
