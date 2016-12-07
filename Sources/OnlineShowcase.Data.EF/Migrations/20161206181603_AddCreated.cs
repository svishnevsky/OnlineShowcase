using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace OnlineShowcase.Data.EF.Migrations
{
    public partial class AddCreated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "Created",
                table: "Products",
                nullable: false,
                defaultValueSql: "getutcdate()");

            migrationBuilder.AddColumn<DateTime>(
                name: "Created",
                table: "Categories",
                nullable: false,
                defaultValueSql: "getutcdate()");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Created",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Created",
                table: "Categories");
        }
    }
}
