const Advice = require('../models/advice.js');
const uuid = require('uuid');

//******Create and Save a new question******
exports.create = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Advice content can not be empty"
        });
    }

    // Create an question
    const advice = new Advice({
        same: req.body.same || "",
        parentId: uuid.v4(),
        category: req.body.category || "Untitled Advice", 
        content: req.body.content
    });

    // Save question in the database
    advice.save()
    .then(data => {
        res.status(201).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Advice."
        });
    });
};

// Retrieve and return all question from the database.
exports.findAll = (req, res) => {
    Advice.find()
    .then(advice => {
        res.status(200).send(advice);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving advice."
        });
    });
};

// Retrieve and return category based question reply from the database.
exports.findCate = (req, res) => {
    Advice.find({category:{$in:[Id = (req.params.Id)]}})
    .then(advice => {
        res.status(200).send(advice);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving question."
        });
    });
};

// Find a single question with a questionId
exports.findOne = (req, res) => {
    Advice.findById(req.params.questionId)
    .then(advice => {
        if(!advice) {
            return res.status(404).send({
                message: "Advice not found with id " + req.params.questionId
            });            
        }
        res.status(200).send(advice);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Advice not found with id " + req.params.questionId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving advice with id " + req.params.questionId
        });
    });
};


// Update a question identified by the questionId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Find question and update it with the request body
    Advice.findByIdAndUpdate(req.params.questionId, {
        category: req.body.category || "Untitled Advice",
        same: req.body.same,
        content: req.body.content
    }, {new: true})
    .then(advice => {
        if(!advice) {
            return res.status(404).send({
                message: "Advice not found with id " + req.params.questionId
            });
        }
        res.status(200).send(advice);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Advice not found with id " + req.params.questionId
            });                
        }
        return res.status(500).send({
            message: "Error updating advice with id " + req.params.questionId
        });
    });
};


// Update a question samehere value identified by the questionId in the request
exports.updateSame = (req, res) => {
    
    // Find the question and update the 'same' field
    Advice.findByIdAndUpdate(req.params.sameId, {
            $set:{
                same: req.body.same
            }
    })
    .then(advice => {
        if(!advice) {
            return res.status(404).send({
                message: "Advice not found with id " + req.params.sameId
            });
        }
        res.status(200).send(advice);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Advice not found with id " + req.params.sameId
            });                
        }
        return res.status(500).send({
            message: "Error updating advice with id " + req.params.sameId
        });
    });
};




// Delete a question with the specified noteId in the request
exports.delete = (req, res) => {
    Advice.findByIdAndRemove(req.params.questionId)
    .then(advice => {
        if(!advice) {
            return res.status(404).send({
                message: "Advice not found with id " + req.params.questionId
            });
        }
        res.status(200).send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Advice not found with id " + req.params.questionId
            });
        }
        return res.status(500).send({
            message: "Could not delete advice with id " + req.params.questionId
        });
    });
};