namespace Dashboard.WebApi.Migrations
{
    using Dashboard.WebApi.Data;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<Dashboard.WebApi.Data.DashboardContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Dashboard.WebApi.Data.DashboardContext context)
        {
            System.Diagnostics.Debugger.Launch();
            IList<Event> deafaultEvents = new List<Event>();

            deafaultEvents.Add(new Event() { Phone = "555-456", Description = "wizyta kontrolna desc1", StartsAt = DateTime.Now.AddDays(1), EndsAt = DateTime.Now.AddDays(1.1), FirstName = "fName", LastName = "lName", Guid = Guid.NewGuid(), Title = "Wizyta kontrolna1" });
            deafaultEvents.Add(new Event() { Phone = "555-123", Description = "wizyta kontrolna desc2", StartsAt = DateTime.Now.AddDays(2), EndsAt = DateTime.Now.AddDays(2.1), FirstName = "fName", LastName = "lName", Guid = Guid.NewGuid(), Title = "Wizyta kontrolna2" });

            foreach (var item in deafaultEvents)
                context.Events.Add(item);

            base.Seed(context);
        }
    }
}
