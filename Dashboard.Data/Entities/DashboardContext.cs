namespace Dashboard.Data.Entities
{
    using System;
    using System.Data.Entity;
    using System.Linq;

    public class DashboardContext : DbContext
    {
        // Your context has been configured to use a 'DashboardContext' connection string from your application's 
        // configuration file (App.config or Web.config). By default, this connection string targets the 
        // 'Dashboard.WebApi.Data.DashboardContext' database on your LocalDb instance. 
        // 
        // If you wish to target a different database and/or database provider, modify the 'DashboardContext' 
        // connection string in the application configuration file.
        public DashboardContext()
            : base("name=DashboardContext")
        {
            this.Configuration.LazyLoadingEnabled = false;
        }

        // Add a DbSet for each entity type that you want to include in your model. For more information 
        // on configuring and using a Code First model, see http://go.microsoft.com/fwlink/?LinkId=390109.

         public virtual DbSet<Event> Events { get; set; }
         public virtual DbSet<Patient> Patients { get; set; }
         protected override void OnModelCreating(DbModelBuilder modelBuilder)
         {
             base.OnModelCreating(modelBuilder);
         }
    }

    //public class MyEntity
    //{
    //    public int Id { get; set; }
    //    public string Name { get; set; }
    //}
}