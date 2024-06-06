using System.Collections.Generic;
using Application.Jobs;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Application.Core;


namespace API.Controllers
{
    
    public class JobsController : BaseApiController
    {
        
        [AllowAnonymous]
        [HttpGet] //api/Jobs
        public async Task<ActionResult<List<Job>>> GetJobs()
        {
            return await Mediator.Send(new List.Query());
        }

        [AllowAnonymous]
        [HttpGet("{id}")] //api/Jobs/id
        public async Task<ActionResult<Job>> GetJob(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost] //api/Jobs
        public async Task<IActionResult> CreateJob(Job job)
        {
            await Mediator.Send(new Create.Command {Job = job});
            return Ok();
        }

        //[Authorize(Policy = "IsJobHost")]
        [AllowAnonymous]
        [HttpPut("{id}")] //api/Jobs/id
        public async Task<IActionResult> EditJob(Guid id, Job job)
        {
            job.Id = id;
            await Mediator.Send(new Edit.Command {Job = job});
            return NoContent();
        }

        //[Authorize(Policy = "IsJobHost")] //api/Jobs/id
        [AllowAnonymous]
        [HttpDelete("{id}")] //api/Jobs/id
        public async Task<IActionResult> DeleteJob(Guid id)
        {
            await Mediator.Send(new Delete.Command {Id = id});
            return NoContent();
        }

        [HttpPost("{id}/apply")] //api/Jobs/id/apply
        public async Task<IActionResult> Apply(Guid id)
        {
            await Mediator.Send(new UpdateApplications.Command { Id = id.ToString() });
            return NoContent();
        }
    }
}