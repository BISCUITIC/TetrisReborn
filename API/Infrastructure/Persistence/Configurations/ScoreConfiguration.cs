using Domain.Entities;
using Infrastructure.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

internal class ScoreConfiguration : IEntityTypeConfiguration<Score>
{
    public void Configure(EntityTypeBuilder<Score> builder)
    {
        builder.ToTable("Scores");

        builder.HasKey(score => score.Id);

        builder.Property(score => score.UserId)
               .IsRequired();

        builder.Property(score => score.Value)
               .IsRequired();               
        
        builder.Property(score => score.CreatedAt)
               .IsRequired();

        builder.HasIndex(score => score.Value);

        builder.HasOne<ApplicationUser>()
               .WithMany(user => user.Scores)
               .HasForeignKey(score => score.UserId);
    }
}
