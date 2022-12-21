const select=document.querySelectorAll('select'),

from_note=document.querySelector('#from-note'),

to_note=document.querySelector('#to-note'),

from=document.querySelector("#from"),
to=document.querySelector("#to"),
exchange=document.querySelector("#exchange"),
from_mic=document.querySelector('#from-mic'),
to_mic=document.querySelector('#to-mic'),
btn=document.querySelector('#button');


select.forEach((tag,id)=>{
for(const key in country){

    let selected;
    if(id==0 && key=="en-US"){
        selected="selected";
    }
    else if(id==1 && key=="hi-IN")
    {
        selected="selected";
    }
    // console.log(country[key]);
let option=`<option value="${key}">${country[key]}</option>`;
tag.insertAdjacentHTML("beforeend",option);//adding tags in select tag
}
});

btn.addEventListener("click",()=>{
let text=from.value,
translatefrom=select[0].value,
translateto=select[1].value;
// console.log(text,translatefrom,translateto);

// my memory api texhnical spsecification
//get api usage limit

if(!text) return;
to.setAttribute("placeholder","translating....");
let ApiUrl=`https://api.mymemory.translated.net/get?q=${text}&langpair=${translatefrom}|${translateto}`;
fetch(ApiUrl).then(res=>res.json()).then(data=>{
    // console.log(data);
    to.value=data.responseData.translatedText;
})
});



//exchnage button
exchange.addEventListener("click",()=>{
let temptext=from.value;
templang=select[0].value;
from.value=to.value;
select[0].value=select[1].value;
to.value=temptext;
select[1].value=templang;
});

//mic of bith side
to_mic.addEventListener("click",()=>{
    let utterance=new SpeechSynthesisUtterance(to.value);
utterance.lang=select[1].value;
});

from_mic.addEventListener("click",()=>{
    let utterance=new SpeechSynthesisUtterance(from.value);
utterance.lang=select[0].value;
    });


    //copy button

from_note.addEventListener("click",()=>{
    alert("copied succcessfully");
navigator.clipboard.writeText(from.value);

});

to_note.addEventListener("click",()=>{
    alert("copied succcessfully");
    navigator.clipboard.writeText(from.value);
});

form