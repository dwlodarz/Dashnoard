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
    public class EventController : ApiController, IDisposable
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

            await _dbContext.SaveChangesAsync();
            return Request.CreateResponse<EventModel>(System.Net.HttpStatusCode.Created, model);
        }

        [HttpDelete]
        public async Task<HttpResponseMessage> DeleteAsync(int id, [FromBody]EventModel model)
        {
            if (model != null && model.Id.HasValue)
            {
                var eventItem = _dbContext.Events.SingleOrDefault(e => e.Id == model.Id.Value);
                if (eventItem != null)
                {
                    _dbContext.Events.Remove(eventItem);
                    await _dbContext.SaveChangesAsync();
                }
            }
            return Request.CreateResponse<EventModel>(HttpStatusCode.Accepted, model);
        }

        private void CreateMaps()
        {
            AutoMapper.Mapper.CreateMap<Event, EventModel>().ReverseMap();
        }

        public void Dispose()
        {
            if (_dbContext != null)
            {
                _dbContext.Dispose();
            }
        }
    }
}
