const mongoose = require('mongoose');
const Task = require('../models/task')
const taskController = {
    create: async function (req, res) {
        const {title, desc} = req.body;
    
        if (!title || !desc) {
            return res.json({
                error: true,
                body: {},
                msg: 'all fields are mandatory'
            });
        }

        try {
            const isTaskExist = await Task.findOne({title});
            if (isTaskExist) {
                return res.json({
                    error: true,
                    body: {},
                    msg: 'task already exist'
                });
            }
            const response = await Task.create(req.body);
            return res.json({
                error: false,
                body: response,
                msg: 'task successfully created'
            });
        } catch (err) {
            return res.json({
                error: true,
                body: {},
                msg: 'task creation failed'
            });
        }   
    },
    listing: async function (req, res) {
        try {
            let recordPerPage = 2;
            let pageNo = 1;
            const {page} = req.query;
            
            if (page) {
                pageNo = page;
            }
            if (page < 1) {
                return res.json({
                    error: true,
                    body: {},
                    msg: 'valid page number!. page start from 1'
                }); 
            }
            const start = (pageNo - 1) * recordPerPage;
            let search = {};
            
            const response = await Task.find(search).skip(start).limit(recordPerPage);
            const totalPagesResponse = await Task.find({});

            const totalRecords = totalPagesResponse.length;
            const totalPages = Math.ceil(totalRecords/recordPerPage);

            return res.json({
                error: false,
                body: response,
                msg: 'tasks successfully get',
                pagination: {
                    pageNo,
                    totalRecords,
                    totalPages
                }
            });
        } catch (err) {
            return res.json({
                error: true,
                body: [],
                msg: 'fail to fetch tasks'
            });
        }
    },
    listingSearch: async function (req, res) {
        try {
            
            let recordPerPage = 2;
            let pageNo = 1;
            const {page} = req.query;
            console.log(req.param)
            const {title} = req.params;
            console.log(title);
            if (page) {
                pageNo = page;
            }
            if (page < 1) {
                return res.json({
                    error: true,
                    body: {},
                    msg: 'valid page number!. page start from 1'
                }); 
            }
            const start = (pageNo - 1) * recordPerPage;
            let search = {};
            if (title) {
                search.title = {
                    '$regex': `^${title}`
                }
            }
            console.log(search)
            const response = await Task.find(search).skip(start).limit(recordPerPage);
            const totalPagesResponse = await Task.find(search);

            const totalRecords = totalPagesResponse.length;
            const totalPages = Math.ceil(totalRecords/recordPerPage);

            return res.json({
                error: false,
                body: response,
                msg: 'tasks successfully get',
                pagination: {
                    pageNo,
                    totalRecords,
                    totalPages
                }
            });
        } catch (err) {
            return res.json({
                error: true,
                body: [],
                msg: 'fail to fetch tasks'
            });
        }
    },
    viewSingleTask: async function (req, res) {
        try {
            const {id} = req.params;
            if (!id) {
                return res.json({
                    error: true,
                    body: {},
                    msg: 'please provide task id'
                });
            }

            const response = await Task.findOne({_id: id});

            response.isMarked = true;
            const response1 = await response.save();
            return res.json({
                error: false,
                body: response1,
                msg: 'successfully fetch'
            });
            
        } catch (err) {
            return res.json({
                error: true,
                body: {},
                msg: err.message
            });
        }

    }   
}
module.exports = taskController;