using Dashboard.WebApi.Data;
using Dashboard.WebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Dashboard.WebApi.Controllers
{
    public class EventController : ApiController
    {
        private DashboardContext _dbContext;

        public EventController()
        {
            _dbContext = new DashboardContext();
            CreateMaps();
        }

        public async Task<IHttpActionResult> GetAsync(int id)
        {
            var eventItem = _dbContext.Events.SingleOrDefault(e => e.Id == id);
            return Ok(AutoMapper.Mapper.Map<EventModel>(eventItem));
        }

        public async Task<IHttpActionResult> GetAllAsync()
        {
            var eventItems = _dbContext.Events.ToList();
            return Ok(AutoMapper.Mapper.Map<List<EventModel>>(eventItems));
        }

        public async Task<HttpResponseMessage> PostAsync(EventModel model)
        {
            if (model != null && model.Id.HasValue)
            {
                var eventItem = _dbContext.Events.SingleOrDefault(e => e.Id == model.Id.Value);
                eventItem = AutoMapper.Mapper.Map<Event>(model);
            }
            else
            {
                _dbContext.Events.Add(AutoMapper.Mapper.Map<Event>(model));
            }

            _dbContext.SaveChanges();
            return Request.CreateResponse<EventModel>(System.Net.HttpStatusCode.Created, model);
        }

        private void CreateMaps()
        {
            AutoMapper.Mapper.CreateMap<Event, EventModel>().ReverseMap();
        }
    }
}
