namespace Dashboard.WebApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class PatientMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Patients",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Guid = c.Guid(nullable: false),
                        FirstName = c.String(nullable: false, maxLength: 255),
                        LastName = c.String(nullable: false, maxLength: 255),
                        PhoneNo = c.String(nullable: false, maxLength: 255),
                        AdditionalInfo = c.String(maxLength: 500),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.Events", "PatientId", c => c.Int(nullable: false));
            AddColumn("dbo.Events", "Description", c => c.String(maxLength: 500));
            AlterColumn("dbo.Events", "Title", c => c.String(nullable: false));
            CreateIndex("dbo.Events", "PatientId");
            AddForeignKey("dbo.Events", "PatientId", "dbo.Patients", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            AddColumn("dbo.Events", "LastName", c => c.String());
            AddColumn("dbo.Events", "FirstName", c => c.String());
            DropForeignKey("dbo.Events", "PatientId", "dbo.Patients");
            DropIndex("dbo.Events", new[] { "PatientId" });
            AlterColumn("dbo.Events", "Title", c => c.String());
            DropColumn("dbo.Events", "Description");
            DropColumn("dbo.Events", "PatientId");
            DropTable("dbo.Patients");
        }
    }
}
