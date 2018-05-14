// Gettign the Newly created Mongoose Model we just created
var UsefullLink = require('../models/usefull-link.model')

_this = this

// Async function to get the To do List
exports.getUsefullLinks = async function(query, page, limit){

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }

    // Try Catch the awaited promise to handle the error

    try {
        var usefull_links = await UsefullLink.paginate(query, options)

        // Return the todod list that was retured by the mongoose promise
        return usefull_links;

    } catch (e) {

        // return a Error message describing the reason
        throw Error('Error while Paginating Usefull links')
    }
}

exports.createUsefullLink = async function(usefull_link){

    // Creating a new Mongoose Object by using the new keyword
    var newUsefullLink = new UsefullLink({
        img: usefull_link.img,
        title: usefull_link.title,
        description: usefull_link.description,
        link: usefull_link.link
    })

    try{

        // Saving the Todo
        var savedUsefullLink = await newUsefullLink.save()

        return savedUsefullLink;
    }catch(e){

        // return a Error message describing the reason
        throw Error("Error while Creating UsefullLink")
    }
}

exports.updateUsefullLink = async function(usefull_link){
    var id = usefull_link.id

    try{
        //Find the old Todo Object by the Id

        var oldUsefullLink = await UsefullLink.findById(id);
    }catch(e){
        throw Error("Error occured while Finding the UsefullLink")
    }

    // If no old Todo Object exists return false
    if(!oldUsefullLink){
        return false;
    }

    console.log(oldUsefullLink)

    //Edit the Todo Object
    oldUsefullLink.title = usefull_link.title
    oldUsefullLink.description = usefull_link.description
    oldUsefullLink.link = usefull_link.link


    console.log(oldUsefullLink)

    try{
        var savedUsefullLink = await oldUsefullLink.save()
        return savedUsefullLink;
    }catch(e){
        throw Error("And Error occured while updating the UsefullLink");
    }
}

exports.deleteUsefullLink = async function(id){

    // Delete the Todo
    try{
        var deleted = await UsefullLink.remove({_id: id})
        if(deleted.result.n === 0){
            throw Error("UsefullLink Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the UsefullLink")
    }
}
