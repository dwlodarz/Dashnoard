using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Dashboard.WebApi.Data
{
    public class DashboardDbInitialization : DropCreateDatabaseIfModelChanges<DashboardContext>
    {
        protected override void Seed(DashboardContext context)
        {
            System.Diagnostics.Debugger.Launch();
            IList<Event> deafaultEvents = new List<Event>();

            deafaultEvents.Add(new Event() { Phone = "555-456", Description = "wizyta kontrolna desc1", StartsAt = DateTime.Now.AddDays(1), EndsAt = DateTime.Now.AddDays(1.1), FirstName = "fName", LastName = "lName", Guid = Guid.NewGuid(), Title = "Wizyta kontrolna1" });
            deafaultEvents.Add(new Event() {Phone="555-123", Description="wizyta kontrolna desc2", StartsAt = DateTime.Now.AddDays(2), EndsAt = DateTime.Now.AddDays(2.1), FirstName="fName", LastName="lName", Guid = Guid.NewGuid(), Title="Wizyta kontrolna2"});

            foreach ( var item in deafaultEvents)
                context.Events.Add(item);

            base.Seed(context);
        }
    }
}