 //const validator = require('validator')
 const chalk = require('chalk') 
 const notes = require('./notes.js');
const yargs = require('yargs');
//  console.log(getNotes());

//  //console.log(validator.isURL('https://www.sat.com'))
// console.log(chalk.red.inverse.bold('succejhjhss'))
// onsole.log(process.argv[2])
// const command=process.argv[2];
// console.log(process.argv)
// if (command==='add')
// {
//   console.log('adding notes..')
// }
// else if(command=c=='remove'){
//   console.log('removing notes..')
// }

yargs.command({
    command:'add',
   describe:'adding notes',
   builder:{
     title:{
      describe:"note title",
      demandOption:true,
      type:'string'
     },
     body:{
        describe:"notes body",
        demandOption:true,
        type:'string'
     }
   },
    handler:(argv)=>{
        notes.addNotes(argv.title,argv.body)
    }

})

yargs.command({
    command:'remove',
   describe:'remove notes',
   builder:{
    title:{
     describe:"note title",
     demandOption:true,
     type:'string'
    },

  },
    handler:(argv)=>{
        notes.removeNotes(argv.title)
    }

})


yargs.command({
    command:'list',
   describe:'listing notes',
    handler:(argv)=>{
    notes.listNotes(argv.title)
    }
})



yargs.command({
    command:'read',
   describe:'reading notes',
   builder:{
    title:{
     describe:"note title",
     demandOption:true,
     type:'string'
    }},
    handler:(argv)=>{
    notes.listNotes(argv.title)
    }
})


 yargs.parse();



