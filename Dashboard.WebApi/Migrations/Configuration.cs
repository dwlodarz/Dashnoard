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
            //System.Diagnostics.Debugger.Launch();
            IList<Event> deafaultEvents = new List<Event>();
            var patient1 = new Patient
            {
                FirstName = "Dominik",
                LastName = "Włodarz",
                PhoneNo = "605573507",
                Guid = Guid.NewGuid(),
                AdditionalInfo = "test lorem ipsum",
            };
            context.Patients.Add(patient1);
            context.SaveChanges();

            deafaultEvents.Add(new Event() { Patient = context.Patients.First(), Description = "wizyta kontrolna desc1", StartsAt = DateTime.Now.AddDays(1), EndsAt = DateTime.Now.AddDays(1.1), Guid = Guid.NewGuid(), Title = "Wizyta kontrolna1" });
            deafaultEvents.Add(new Event() { Patient = context.Patients.First(), Description = "wizyta kontrolna desc2", StartsAt = DateTime.Now.AddDays(2), EndsAt = DateTime.Now.AddDays(2.1), Guid = Guid.NewGuid(), Title = "Wizyta kontrolna2" });

            foreach (var item in deafaultEvents)
                context.Events.Add(item);

            base.Seed(context);
        }
    }
}
