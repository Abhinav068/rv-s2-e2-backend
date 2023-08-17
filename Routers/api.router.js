const { Router } = require('express');
const { TravelModel } = require('../models/travel.model');

const apiRouter = Router();

// apiRouter.get('/travel/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         res.send({ res: 'sent' });
//     } catch (error) {
//         console.log(error);
//     }
// })

// apiRouter.get('/travel', async (req, res) => {
//     try {
//         let data = await TravelModel.find();
//         res.send({ data });
//     } catch (error) {
//         console.log(error);
//     }
// })

apiRouter.get('/travel', async (req, res) => {
    try {
        let { dest, order } = req.query;
        if (dest && order) {
            let data = await TravelModel.aggregate([
                {
                    '$match': {
                        'destination': dest
                    }
                }, {
                    '$sort': {
                        'Budget_Per_Person': +order
                    }
                }
            ]);
            res.send({ data });
        }
        else if(order) {
            let data = await TravelModel.aggregate([
                {
                  '$sort': {
                    'Budget_Per_Person': +order
                  }
                }
              ]);
            res.send({ data });            
        }
        else {
            let data = await TravelModel.find();
            res.send({ data });            
        }

    } catch (error) {
        console.log(error);
    }
})
apiRouter.delete('/travel/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await TravelModel.findByIdAndDelete(id);
        res.send({ response: 'Data has been deleted' });
    } catch (error) {
        console.log(error);
    }
})



apiRouter.post('/travel', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, destination, no_of_travelers, Budget_Per_Person } = req.body;
        let travel = new TravelModel({ name, email, destination, no_of_travelers, Budget_Per_Person })
        await travel.save();
        res.send({ result: 'data saved' });
    } catch (error) {
        console.log(error);
    }
})

module.exports = { apiRouter };