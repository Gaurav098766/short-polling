const express = require('express');
const app = express();

const jobs = {};

app.post('/submit', (req, res) => {
    const jobId = `job:${Date.now()}`;
    jobs[jobId] = 0;
    updateJob(jobId, 0);
    res.end("\n\nJobId: " + jobId + "\n\n"); // Include the jobId in the response
});

app.get('/checkstatus', (req, res) => {
    console.log(jobs[req.query.jobId]);
    res.end("\n\nJobStatus: " + jobs[req.query.jobId] + "%\n\n");
});

app.listen(8080, () => {
    console.log("listening at port 8080");
});

function updateJob(jobId, prg) {
    jobs[jobId] = prg;
    console.log(`Updated ${jobId} to ${prg}`);
    if (prg == 100) return;
    setTimeout(() =>
        updateJob(jobId, prg + 10)
    , 3000);
}
