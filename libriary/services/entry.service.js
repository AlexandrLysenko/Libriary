// Gettign the Newly created Mongoose Model we just created 
var Entry = require('../models/entry.model')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the To do List
exports.getEntries = async function(query, page, limit){

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    
    // Try Catch the awaited promise to handle the error 
    
    try {
        var entries = await Entry.paginate(query, options)
        
        // Return the todod list that was retured by the mongoose promise
        return entries;

    } catch (e) {

        // return a Error message describing the reason 
        throw Error('Error while Paginating Entries')
    }
}

exports.createEntry = async function(entry){
    
    // Creating a new Mongoose Object by using the new keyword
    var newEntry = new Entry({
        img: entry.img,
        title: entry.title,
        description: entry.description,
        date: new Date(),
    })

    try{

        // Saving the Todo 
        var savedEntry = await newEntry.save()

        return savedEntry;
    }catch(e){
      
        // return a Error message describing the reason     
        throw Error("Error while Creating Entry")
    }
}

exports.updateEntry = async function(entry){
    var id = entry.id

    try{
        //Find the old Todo Object by the Id
    
        var oldEntry = await Entry.findById(id);
    }catch(e){
        throw Error("Error occured while Finding the Entry")
    }

    // If no old Todo Object exists return false
    if(!oldEntry){
        return false;
    }

    console.log(oldEntry)

    //Edit the Todo Object
    oldEntry.title = entry.title
    oldEntry.description = entry.description


    console.log(oldEntry)

    try{
        var savedEntry = await oldEntry.save()
        return savedEntry;
    }catch(e){
        throw Error("And Error occured while updating the Entry");
    }
}

exports.deleteEntry = async function(id){
    
    // Delete the Todo
    try{
        var deleted = await Entry.remove({_id: id})
        if(deleted.result.n === 0){
            throw Error("Entry Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the Entry")
    }
}