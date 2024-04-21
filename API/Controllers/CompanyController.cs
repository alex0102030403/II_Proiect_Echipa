using System.Collections.Generic;
using Application.Companys;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Application.Core;
using API.DTOs;

namespace API.Controllers{

    public class CompanyController : BaseApiController{

        [AllowAnonymous]
        [HttpGet] //api/Company
        public async Task<ActionResult<List<Company>>> GetCompanies()
        {
            Console.WriteLine("CompanyController.cs: GetCompanies()");
            return await Mediator.Send(new List.Query());
        }

        [AllowAnonymous]
        [HttpGet("{id}")] //api/Company/id
        public async Task<ActionResult<Company>> GetCompany(Guid id)
        {
            Console.WriteLine("CompanyController.cs: GetCompany()");
            return await Mediator.Send(new GetCompany.Query{Id = id});
        }

        [AllowAnonymous]
        [HttpPost] //api/Company
        public async Task<IActionResult> CreateCompany(Company company)
        {
            Console.WriteLine("CompanyController.cs: CreateCompany()");
            await Mediator.Send(new Create.Command {Company = company});
            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("{id}/addJob")] //api/Company/id
        public async Task<IActionResult> CreateJob(Guid id,[FromBody] Job job)
        {
            Console.WriteLine("CompanyController.cs: CreateJob()");
            await Mediator.Send(new CreateJob.Command { Id = id,Job = job});
            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("{id}/addEmployee")] //api/Company/id
        public async Task<IActionResult> AddEmployee(Guid id,[FromBody] AppUser appUser)
        {
            Console.WriteLine("CompanyController.cs: AddEmployee()");
            await Mediator.Send(new AddEmployee.Command { Id = id,AppUser = appUser});
            return Ok();
        }

        [AllowAnonymous]
        [HttpDelete("{id}")] //api/Company/id
        public async Task<IActionResult> DeleteCompany(Guid id)
        {
            Console.WriteLine("CompanyController.cs: DeleteCompany()");
            await Mediator.Send(new DeleteCompany.Command {Id = id});
            return NoContent();
        }
        
        

    }

}