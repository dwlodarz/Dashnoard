using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Dashboard.WebApi.Data
{
    public class Patient
    {
        public int? Id { get; set; }
        public Guid Guid { get; set; }

        [Required]
        [MaxLength(255)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(255)]
        public string LastName { get; set; }

        [Required]
        [MaxLength(255)]
        [RegularExpression(@"^[0-9\+]{1,}[0-9\-]{3,15}$")]
        public string PhoneNo { get; set; }

        [MaxLength(500)]
        public string AdditionalInfo { get; set; }
    }
}