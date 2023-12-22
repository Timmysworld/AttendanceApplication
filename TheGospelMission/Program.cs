using System.Security.Claims;
using System.Text;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using TheGospelMission.Configurations;
using TheGospelMission.Data;
using TheGospelMission.Models;
using TheGospelMission.Services;

var builder = WebApplication.CreateBuilder(args);

//Add Service
builder.Services.AddControllers()
    .AddJsonOptions(options => 
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
    });
builder.Services.AddScoped<GroupServices>(); // Use the appropriate scope (e.g., Scoped, Transient, or Singleton) as per your application's requirements
builder.Services.AddScoped<MemberServices>();
builder.Services.AddScoped<UserServices>();
builder.Services.AddScoped<NotificationService>();
builder.Services.AddScoped<ChurchServices>();
builder.Services.AddScoped<AttendanceServices>();



//DI for DbContext
builder.Services.AddDbContext<GospelMissionDbContext>(options =>
{
    options.UseMySql(
        builder.Configuration.GetConnectionString("DbConnection"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DbConnection"))
    );

    options.EnableSensitiveDataLogging(); // Enable query logging
});

// Jwt Authentication
builder.Services.Configure<JwtConfig>(builder.Configuration.GetSection("JwtConfig"));

builder.Services.AddAuthentication(options => 
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    //options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(jwt => 
{
    var key = Encoding.ASCII.GetBytes(builder.Configuration.GetSection("JwtConfig:Secret").Value);

    jwt.SaveToken = true;
    jwt.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateLifetime = true,
        RequireExpirationTime = false,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = true,
        ValidIssuer = builder.Configuration.GetSection("JwtConfig:Issuer").Value,
        ValidateAudience = true,
        ValidAudience = builder.Configuration.GetSection("JwtConfig:Audience").Value,
        RoleClaimType = ClaimTypes.Role,
    };
    jwt.Events = new JwtBearerEvents
    {
        OnAuthenticationFailed = context =>
        {
            Console.WriteLine($"Authentication failed: {context.Exception.Message}");

            var principal = context.Principal;
            if (principal != null)
            {
                Console.WriteLine($"User Claims: {string.Join(", ", principal.Claims.Select(c => $"{c.Type}={c.Value}"))}");
            }

            return Task.CompletedTask;
        }
    };

});

builder.Services.AddDataProtection();
builder.Services.AddIdentity<User, IdentityRole>(options => options.SignIn.RequireConfirmedAccount = false)
    .AddDefaultTokenProviders()
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<GospelMissionDbContext>()
    .AddClaimsPrincipalFactory<UserClaimsPrincipalFactory<User, IdentityRole>>();

    
builder.Services.Configure<IdentityOptions>(options =>
{
    // Default User settings.
    options.User.AllowedUserNameCharacters =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
    options.User.RequireUniqueEmail = false;

});

builder.Services.AddCors(options =>
    {
        options.AddDefaultPolicy(builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS refresh is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

// Exception Handling Middleware
app.Use(async (context, next) =>
{
    //await next.Invoke();
    try
    {
        await next.Invoke();
    }
    catch (Exception e)
    {
        // Log the exception
    Console.WriteLine($"An error occurred: {e.Message}");

    // You can customize the error response here
    context.Response.StatusCode = StatusCodes.Status500InternalServerError;
    await context.Response.WriteAsync($"An error occurred: {e.Message}");
    }
});



// Authentication and Authorization
app.UseRouting();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
app.UseEndpoints(endpoints => { _ = endpoints.MapControllers(); }); // Empty UseEndpoints
app.UseDefaultFiles(); // Serve index.html
app.UseStaticFiles(); // Serve other static files
// Map Controllers
app.MapControllers();

// // Default Route
// app.MapGet("/", () =>
// {
//     // Return your landing page content or redirect to a dedicated landing page controller action
//     return "Hello World!";
// });

using (var scope = app.Services.CreateScope())
{
    var roleManager =
        scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

    var roles = new[] {"Overseer", "Assistant Overseer","Group Leader", "Unit Leader" };
    foreach (var role in roles)
    {
        if (!await roleManager.RoleExistsAsync(role))
            await roleManager.CreateAsync(new IdentityRole(role));
            Console.WriteLine($"Role {role} created.");
    }
}

using (var scope = app.Services.CreateScope())
{
    var userManager =
        scope.ServiceProvider.GetRequiredService<UserManager<User>>();


    string username = "TimmyTurner";
    string firstName = "Timothy";
    string lastName = "Singleton";
    string email = "superadmin@admin.com";
    string gender = "male";
    string password = "Password1!";
    int churchId = 1;


    if (await userManager.FindByEmailAsync(email) == null)
    {
        var user = new User();
        user.UserName = username;
        user.FirstName = firstName;
        user.LastName = lastName;
        user.Email = email;
        user.Gender = gender;
        user.ChurchId = churchId;

        await userManager.CreateAsync(user, password);
        await userManager.AddToRoleAsync(user, "Overseer");

    }
}

app.Run();
