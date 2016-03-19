using Dashboard.WebApi.Data;
using Dashboard.WebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Data.Entity;

namespace Dashboard.WebApi.Controllers
{
    public class PatientController : ApiController, IDisposable
    {
        private DashboardContext _dbContext;

        public PatientController()
        {
            _dbContext = new DashboardContext();
            CreateMaps();
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetAsync(int id)
        {
            var patientItem = await _dbContext.Patients.SingleOrDefaultAsync(p => p.Id == id);
            return Ok(AutoMapper.Mapper.Map<PatientModel>(patientItem));
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetAllAsync()
        {
            var patientItems = await _dbContext.Patients.ToListAsync();
            return Ok(AutoMapper.Mapper.Map<List<PatientModel>>(patientItems));
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetByQuery(string query)
        {
            var filteredPatiet = await _dbContext.Patients
                .Where(x => x.LastName.ToLower().StartsWith(query.Trim().ToLower()))
                .ToListAsync();
            return Ok(AutoMapper.Mapper.Map<List<PatientModel>>(filteredPatiet));
        }

        private void CreateMaps()
        {
            AutoMapper.Mapper.CreateMap<Patient, PatientModel>().ReverseMap();
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
