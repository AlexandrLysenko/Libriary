// Accessing the Service that we just created

var UsefullLinkService = require('../services/usefull-link.service')
var UsefullLink = require('../models/usefull-link.model')

// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the To do List

exports.getUsefullLinks = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 50;

    try{

        var usefull_links = await UsefullLinkService.getUsefullLinks({}, page, limit)

        // Return the todos list with the appropriate HTTP Status Code and Message.

        return res.status(200).json({status: 200, data: usefull_links, message: "Succesfully Entries Recieved"});

    }catch(e){

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({status: 400, message: e.message});

    }
}

exports.createUsefullLink = async function(req, res, next){

    // Req.Body contains the form submit values.

    var usefull_link = {
        img: req.body.img,
        title: req.body.title,
        description: req.body.description,
        link: req.body.link
    }

    try{

        // Calling the Service function with the new object from the Request Body

        var createdUsefullLink = await UsefullLinkService.createUsefullLink(usefull_link)
        return res.status(201).json({status: 201, data: createdUsefullLink, message: "Succesfully Created UsefullLink"})
    }catch(e){

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({status: 400, message: "UsefullLink Creation was Unsuccesfull"})
    }
}

exports.updateUsefullLink = async function(req, res, next){

    // Id is necessary for the update

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    console.log(req.body)

    var usefull_link = {
        id,
        img: req.body.img ? req.body.img : null,
        title: req.body.title ? req.body.title : null,
        description: req.body.description ? req.body.description : null,
        link: req.body.link ? req.body.link : null,

    }

    try{
        var updatedUsefullLink = await UsefullLinkService.updateUsefullLink(usefull_link)
        return res.status(200).json({status: 200, data: updatedUsefullLink, message: "Succesfully Updated UsefullLink"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.removeUsefullLink = async function(req, res, next){

    var id = req.params.id;
UsefullLink.findByIdAndRemove(req.params.id, (err, todo) => {
    // As always, handle any potential errors:
    if (err) return res.status(500).send(err);
    // We'll create a simple object to send back with a message and the id of the document that was removed
    // You can really do this however you want, though.

    return res.status(200).json({status:200, message: "Succesfully UsefullLink Deleted"});
});

}
