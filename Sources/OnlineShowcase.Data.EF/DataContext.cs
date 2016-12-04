﻿using System;
using System.Reflection;
using Microsoft.EntityFrameworkCore;
using OnlineShowcase.Data.EF.Configuration;
using System.Linq;

namespace OnlineShowcase.Data.EF
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
            base.ChangeTracker.AutoDetectChangesEnabled = false;
            base.Database.AutoTransactionsEnabled = true;
            base.Database.Migrate();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var mappingTypes =
                this.GetType().GetTypeInfo().Assembly.GetTypes().Where(x => !x.GetTypeInfo().IsAbstract && x.GetInterfaces().Any(y => y == typeof(IEntityMappingConfiguration)));

            foreach (var mapping in mappingTypes.Select(t => Activator.CreateInstance(t, modelBuilder)).Cast<IEntityMappingConfiguration>())
            {
                mapping.Map();
            }
        }
    }
}
