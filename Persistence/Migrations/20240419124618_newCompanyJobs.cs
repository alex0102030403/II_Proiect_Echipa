using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class newCompanyJobs : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CompanyJobs_Companies_JobId",
                table: "CompanyJobs");

            migrationBuilder.DropForeignKey(
                name: "FK_CompanyJobs_Jobs_JobId1",
                table: "CompanyJobs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CompanyJobs",
                table: "CompanyJobs");

            migrationBuilder.RenameColumn(
                name: "JobId1",
                table: "CompanyJobs",
                newName: "CompanyJobId");

            migrationBuilder.RenameIndex(
                name: "IX_CompanyJobs_JobId1",
                table: "CompanyJobs",
                newName: "IX_CompanyJobs_CompanyJobId");

            migrationBuilder.AlterColumn<Guid>(
                name: "JobId",
                table: "CompanyJobs",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "TEXT");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CompanyJobs",
                table: "CompanyJobs",
                columns: new[] { "CompanyId", "CompanyJobId" });

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyJobs_Companies_CompanyJobId",
                table: "CompanyJobs",
                column: "CompanyJobId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyJobs_Jobs_JobId",
                table: "CompanyJobs",
                column: "JobId",
                principalTable: "Jobs",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CompanyJobs_Companies_CompanyJobId",
                table: "CompanyJobs");

            migrationBuilder.DropForeignKey(
                name: "FK_CompanyJobs_Jobs_JobId",
                table: "CompanyJobs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CompanyJobs",
                table: "CompanyJobs");

            migrationBuilder.RenameColumn(
                name: "CompanyJobId",
                table: "CompanyJobs",
                newName: "JobId1");

            migrationBuilder.RenameIndex(
                name: "IX_CompanyJobs_CompanyJobId",
                table: "CompanyJobs",
                newName: "IX_CompanyJobs_JobId1");

            migrationBuilder.AlterColumn<Guid>(
                name: "JobId",
                table: "CompanyJobs",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_CompanyJobs",
                table: "CompanyJobs",
                columns: new[] { "CompanyId", "JobId" });

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyJobs_Companies_JobId",
                table: "CompanyJobs",
                column: "JobId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyJobs_Jobs_JobId1",
                table: "CompanyJobs",
                column: "JobId1",
                principalTable: "Jobs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
