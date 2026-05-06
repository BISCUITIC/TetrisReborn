using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitScore : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Scores_UserId",
                table: "Scores",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Scores_Value",
                table: "Scores",
                column: "Value");

            migrationBuilder.AddForeignKey(
                name: "FK_Scores_AspNetUsers_UserId",
                table: "Scores",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Scores_AspNetUsers_UserId",
                table: "Scores");

            migrationBuilder.DropIndex(
                name: "IX_Scores_UserId",
                table: "Scores");

            migrationBuilder.DropIndex(
                name: "IX_Scores_Value",
                table: "Scores");
        }
    }
}
