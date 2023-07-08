const form = document.querySelector('form');
const result = document.querySelector(".result");
const abc = document.querySelector(".abc")
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    getWordInfo(form.elements[0].value);
})

const getWordInfo = async (word) =>{
    try {
    result.innerHTML = "Fetching data ..."
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    // const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    // const data = await response.json();
    const data = await fetch(url).then(response => response.json())
    console.log(data);
    let definition = data[0].meanings[0].definitions[0];
    result.innerHTML =
     `
     <h2><strong>Word: </strong>${data[0].word}</h2>    
     <p class="part">${data[0].meanings[0].partOfSpeech}<p>
     <p><strong>Meaning: </strong>${definition.definition === undefined? "Not Found" : definition.definition }<p>
     <p><strong>Example: </strong>${definition.example === undefined? "Not Found " : definition.example}<p>
     <p class="abc"><strong>Antonyms: </strong></p>
     `;

     if(definition.antonyms.length===0 )
     {
         result.innerHTML += `<span>Not Found</span>`
     } else {
         for (let i = 0; i< definition.antonyms.length;i++)
         { 
             result.innerHTML+= `<li>${definition.antonyms[i]}</li>`
         }
     }
     if(definition.synonyms.length===0 )
     {  
         result.innerHTML += `
         <p><strong>Synonyms: </strong></p>
         <span>Not Found</span>`
     } else {
         result.innerHTML += `<p><strong>Synonyms: </strong></p>`
         for (let i = 0; i< definition.synonyms.length;i++)
         {  
             result.innerHTML+= `<li>${definition.synonyms[i]}</li>`
         }
     }
     result.innerHTML += `<div><a href="${data[0].sourceUrls}" target=_blank>Read More</a></div>`
}
catch (error) {
    result.innerHTML = `<p>No word found</p>`        
}}