import { ProxyState } from "../AppState.js"
import { jobsService } from "../Services/JobsService.js"

function _drawJobs() {
  let jobs = ProxyState.jobs
  let template = ''
  jobs.forEach(job => {
    // NOTE Getters FAKE properties as methods
    template += job.Template
  })
  document.getElementById('jobs').innerHTML = template
}


export default class JobsController {
  constructor() {
    ProxyState.on("jobs", _drawJobs)
    _drawJobs();
    this.getJobs();
  }

  getJobs(){
    try {
      jobsService.getJobs()
    } catch (error) {
      console.error(error)
    }
  }

  createJob() {
    window.event.preventDefault();
    let form = window.event.target;
    let newJob = {
      company: form['company'].value,
      jobTitle: form['jobTitle'].value,
      hours: form['hours'].value,
      rate: form['rate'].value,
      description: form['description'].value
    }
    try {
      jobsService.createJob(newJob);
      
    } catch (error) {
      console.error(error);
    }
    // @ts-ignore
    form.reset()
    // @ts-ignore
    $("#new-job-modal").modal('hide');
  }


  deleteJob(id) {
    console.log(id);
    try {
      jobsService.deleteJob(id)
    } catch (error) {
      console.error(error)
    }
  }

  getOne(){
    let id = ProxyState.jobs[0].id
    jobsService.getOne(id)
  }
}