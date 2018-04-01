// Accessing the Service that we just created

var EntryService = require('../services/entry.service')
var Entry = require('../models/entry.model')

// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the To do List

exports.getEntries = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10; 

    try{
    
        var entries = await EntryService.getEntries({}, page, limit)
        
        // Return the todos list with the appropriate HTTP Status Code and Message.
        
        return res.status(200).json({status: 200, data: entries, message: "Succesfully Entries Recieved"});
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
}

exports.createEntry = async function(req, res, next){

    // Req.Body contains the form submit values.

    var entry = {
        img: req.body.img,
        title: req.body.title,
        description: req.body.description
    }

    try{
        
        // Calling the Service function with the new object from the Request Body
    
        var createdEntry = await EntryService.createEntry(entry)
        return res.status(201).json({status: 201, data: createdEntry, message: "Succesfully Created Entry"})
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: "Entry Creation was Unsuccesfull"})
    }
}

exports.updateEntry = async function(req, res, next){

    // Id is necessary for the update

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    console.log(req.body)

    var entry = {
        id,
        img: req.body.img ? req.body.img : null,
        title: req.body.title ? req.body.title : null,
        description: req.body.description ? req.body.description : null
    }

    try{
        var updatedEntry = await EntryService.updateEntry(entry)
        return res.status(200).json({status: 200, data: updatedEntry, message: "Succesfully Updated Entry"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.removeEntry = async function(req, res, next){

    var id = req.params.id;
Entry.findByIdAndRemove(req.params.id, (err, todo) => {  
    // As always, handle any potential errors:
    if (err) return res.status(500).send(err);
    // We'll create a simple object to send back with a message and the id of the document that was removed
    // You can really do this however you want, though.

    return res.status(200).json({status:200, message: "Succesfully Entry Deleted"});
});

}

