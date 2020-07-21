const chalk = require('chalk');

const fs =require('fs');
const { title } = require('process');

const addNotes=(title,body)=>{
const notes=loadNotes()
const duplicateNote = notes.find((note)=>{
    return note.title===title;
})
if(!duplicateNote){
    notes.push({
        title:title,
        body:body
    })   
    console.log(chalk.green.inverse('new note is added'))
}
else{
    console.log(chalk.red.inverse("already addded this note"))
}


 saveNotes(notes)
}

const saveNotes = (notes) => {
   const jsonData = JSON.stringify(notes)
   fs.writeFileSync('note.json',jsonData)
}

const loadNotes = ()=> {
 try{  const bufferData = fs.readFileSync('note.json')
const jsonData = bufferData.toString();
 return JSON.parse(jsonData) }
 catch{
     return [];
 }

}



const removeNotes = (title) => {
 const notes=loadNotes();

const match = notes.filter((note) => {
    return note.title !== title;
    
})

if(notes.length > match.length){
   
console.log(chalk.blue('note is removed successfully'))
const jsonData = JSON.stringify(match)
return  fs.writeFileSync('note.json',jsonData)
}
else{
    console.log(chalk.red('not removed'))
}}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.green('list'))
    const list=notes.forEach(element => {
        return element.title
    });
    return list;
}


const readList = (title) => {
    const notes = loadNotes();
    const search = notes.find((note)=> {
        return note.title === title;
    })
    if(search)
    {
        console.log(chalk.green.inverse(search.title))
        console.log(search.body)
    }
    else{
        console.log(chalk.red.inverse("not found"))
    }
}


module.exports =
 {
     addNotes:addNotes,
      removeNotes:removeNotes,
      listNotes:listNotes,
      readList:readList,
    
    };