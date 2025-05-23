﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EduMobile.Server.Migrations
{
    /// <inheritdoc />
    public partial class Mig10 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SemesterStudents_Semesters_SemesterId",
                table: "SemesterStudents");

            migrationBuilder.AddForeignKey(
                name: "FK_SemesterStudents_Semesters_SemesterId",
                table: "SemesterStudents",
                column: "SemesterId",
                principalTable: "Semesters",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SemesterStudents_Semesters_SemesterId",
                table: "SemesterStudents");

            migrationBuilder.AddForeignKey(
                name: "FK_SemesterStudents_Semesters_SemesterId",
                table: "SemesterStudents",
                column: "SemesterId",
                principalTable: "Semesters",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
