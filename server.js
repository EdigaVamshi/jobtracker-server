require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const JobApplication = require('./models/JobApplication')

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(
    () => console.log('Database connected')
).catch(
    (err) => console.error('Unable to connect to the database', err)
);

app.get('/applied-jobs', async (req, res) => {
    try {
        const jobs = await JobApplication.find({});
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/applied-jobs', async (req, res) => {
    try {
        const job = new JobApplication({
            company: req.body.company,
            role: req.body.role,
            status: req.body.status,
            appliedDate: req.body.appliedDate,
            link: req.body.link,
        })
        const newJob=await job.save();
        res.status(201).json(newJob);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});

app.patch('/appplied-jobs/:id', async (req, res) => {
    try {
        const job = await JobApplication.findOne({ _id: req.params.id });
        if (!job) return res.status(404).json({ message: 'Job application not found' });

        if (req.body.company) job.company = req.body.company;
        if (req.body.role) job.role = req.body.role;
        if (req.body.status) job.status = req.body.status;
        if (req.body.applicationDate) job.applicationDate = req.body.applicationDate;
        if (req.body.link) job.link = req.body.link;

        const modifiedJob=await job.save();
        res.json(modifiedJob);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/applied-jobs/:id', async (req, res) => {
    try {
        const job = await JobApplication.findOneAndDelete({ _id: req.params.id });
        if (!job) return res.status(404).json({ message: 'Job application not found' });
        res.json({ message: 'Deleted job application' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const PORT = process.env.PORT;
app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`));