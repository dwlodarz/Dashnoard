using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Dashboard.WebApi.Models
{
    public class EventModel
    {
        public int? Id { get; set; }

        [Required]
        public Guid Guid { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public DateTime StartsAt { get; set; }

        [Required]
        public DateTime EndsAt { get; set; }

        [Required]
        public PatientModel Patient { get; set; }
    }
}