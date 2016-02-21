using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Dashboard.WebApi.Data
{
    public class Event
    {
        public int? Id { get; set; }
        public Guid Guid { get; set; }
        public string Title { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Description { get; set; }
        public DateTime StartsAt { get; set; }
        public DateTime EndsAt { get; set; }
    }
}