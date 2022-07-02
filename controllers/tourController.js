const fs = require('fs')

const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json', 'utf-8'))

exports.checkID = (req, res, next, val) => {
    if (req.params.id > tours.length - 1) {
        return res.status(404).json({
            status: 'fail',
            message: 'Tour ID Invalid'
        })
    }
    next()
}

exports.checkBody = (req, res, next) => {
    if(!req.body.name || !req.body.price){
        return res.status(400).json({
            status: 'Fail',
            message: 'Name or Price Missing'
        })
    }
    next()
}

exports.getAllTours = (req, res) => {
    res.status(200).json({
        message: 'success',
        requestedAt: req.resquestTime,
        results: tours.length,
        data: {
            tours
        }
    })
}

exports.addNewTour = (req, res) => {
    const newID = tours[tours.length - 1].id + 1
    const newTour = Object.assign({ id: newID }, req.body)
    tours.push(newTour)
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
        if (err) throw err
        res.status(201).json({
            message: 'success',
            data: {
                tour: newTour
            }
        })
    })
}

exports.getTour = (req, res) => {
    const id = req.params.id * 1
    const singleTour = tours.find(el => el.id === id)
    res.status(201).json({
        message: 'success',
        data: singleTour
    })
}

exports.updateTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated Tour>'
        }
    })
}

exports.deleteTour = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: null
    })
}