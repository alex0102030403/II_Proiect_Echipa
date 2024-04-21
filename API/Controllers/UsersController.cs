using System.Collections.Generic;
using Application.Jobs;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Application.Core;
using Application.Users;


namespace API.Controllers
{
    
    public class UsersController : BaseApiController
    {
        [AllowAnonymous]
        [HttpGet] //api/Users
        public async Task<ActionResult<List<AppUser>>> GetUsers()
        {
            return await Mediator.Send(new ListUsers.Query());
        }

        [AllowAnonymous]
        [HttpGet("{id}")] //api/Users/id
        public async Task<ActionResult<AppUser>> GetUser(Guid id)
        {
            return await Mediator.Send(new GetUser.Query { Id = id });
        }
    }
}