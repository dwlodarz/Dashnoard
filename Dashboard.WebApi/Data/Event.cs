using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Dashboard.WebApi.Data
{
    public class Event
    {
        public int? Id { get; set; }

        [Required]
        public int PatientId { get; set; }

        [Required]
        public Guid Guid { get; set; }

        [Required]
        public string Title { get; set; }

        [MaxLength(500)]
        public string Description { get; set; }

        [Required]
        public DateTime StartsAt { get; set; }

        [Required]
        public DateTime EndsAt { get; set; }

        public virtual Patient Patient { get; set; }
    }
}