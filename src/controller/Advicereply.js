const Advicereply = require('../models/advicereply.js');

//******Create and Save a new Advice reply******
exports.create = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Advice reply content can not be empty"
        });
    }

    // Create an Advice reply
    const advicereply = new Advicereply({
        parentId: req.body.parentId || '',
        content: req.body.content
    });

    // Save Advice reply in the database
    advicereply.save()
    .then(data => {
        res.status(201).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Advicereply."
        });
    });
};

// Retrieve and return all advicereply from the database.
exports.findAll = (req, res) => {
    Advicereply.find()
    .then(advicereply => {
        res.status(200).send(advicereply);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving advicereply."
        });
    });
};

// Find a single advicereply with a adviceId
exports.findOne = (req, res) => {
    Advicereply.findById(req.params.adviceId)
    .then(advicereply => {
        if(!advicereply) {
            return res.status(404).send({
                message: "Advicereply not found with id " + req.params.adviceId
            });            
        }
        res.status(200).send(advicereply);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Advicereply not found with id " + req.params.adviceId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving advicereply with id " + req.params.adviceId
        });
    });
};


// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Find advicereply and update it with the request body
    Advicereply.findByIdAndUpdate(req.params.adviceId, {
        category: req.body.category || "Untitled Advicereply",
        content: req.body.content
    }, {new: true})
    .then(advicereply => {
        if(!advicereply) {
            return res.status(404).send({
                message: "Advicereply not found with id " + req.params.adviceId
            });
        }
        res.status(200).send(advicereply);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Advicereply not found with id " + req.params.adviceId
            });                
        }
        return res.status(500).send({
            message: "Error updating advicereply with id " + req.params.adviceId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Advicereply.findByIdAndRemove(req.params.adviceId)
    .then(advicereply => {
        if(!advicereply) {
            return res.status(404).send({
                message: "Advicereply not found with id " + req.params.adviceId
            });
        }
        res.status(200).send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Advicereply not found with id " + req.params.adviceId
            });
        }
        return res.status(500).send({
            message: "Could not delete advicereply with id " + req.params.adviceId
        });
    });
};