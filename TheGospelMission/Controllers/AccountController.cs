using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using TheGospelMission.Exceptions;
using TheGospelMission.Models;
using TheGospelMission.Services;

namespace TheGospelMission.Controllers;

[Route("api/[controller]")] //api/account
[ApiController]
public class AccountController(
    UserManager<User> userManager,
    RoleManager<IdentityRole> roleManager,
    IConfiguration configuration,
    NotificationService notificationService,
    ChurchServices churchService,
    UserServices userService,
    ILogger<AccountController> logger,
    SignInManager<User> signInManager ) : ControllerBase
{
    private readonly UserManager<User> _userManager = userManager;
    private readonly RoleManager<IdentityRole> _roleManager = roleManager;
    private readonly IConfiguration _configuration = configuration;
    private readonly ILogger<AccountController> _logger = logger;
    private readonly NotificationService _notificationService = notificationService;
    private readonly ChurchServices _churchService = churchService;
    private readonly SignInManager<User> _signInManager = signInManager;
    private readonly UserServices _userService = userService;

    [HttpPost]
    [Route("Register")]
    public async Task<IActionResult> Register([FromBody] RegisterModel register)
    {
        if (!ModelState.IsValid)
        {
            // ModelState is invalid, return detailed validation errors
            return BadRequest(new AuthResult
            {
                Errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)).ToList(),
                Status = "Failed"
            });

        }

        var userExist = await _userManager.FindByEmailAsync(register.Email);
        if (userExist != null)
        {
            // User already exists, throw exception
            throw new UserExistsException(userExist.UserName, userExist.Email)
            {
                ExistingUsername = userExist.UserName,
                ExistingUserEmail = userExist.Email
            };
        }

        // Check if the password and confirm password match
        if (register.Password != register.ConfirmPassword)
        {
            return BadRequest("Passwords must match");
        }

        // Create user
        var newUser = new User
        {
            UserName = register.Username,
            FirstName = register.FirstName,
            LastName = register.LastName,
            Email = register.Email,
            Gender = register.Gender,
            ChurchId = register.Church
        };

        var creationResult = await _userManager.CreateAsync(newUser, register.Password);

        if (creationResult.Succeeded)
        {
            return Ok(new AuthResult
            {
                Status = "Success",
                Message = "User created successfully!"
            });
        }

        // Log the details of the failure
        _logger.LogError($"User registration failed: {string.Join(", ", creationResult.Errors)}");

        return BadRequest(new AuthResult
        {
            Errors = creationResult.Errors.Select(error => error.Description).ToList(),
            Status = "Failed"
        });
    }



    //TODO: NEED TO SET UP REDIRECT TO SUCCESSFUL REGISTER PAGE.
    [HttpPost]
    [Route("Login")]
    public async Task<IActionResult> Login([FromBody]LoginModel login)
    {
        if(ModelState.IsValid)
        {
            var existing_user = await _userManager.FindByNameAsync(login.UserName);
            if(existing_user == null)
                    return BadRequest(new AuthResult()
                        {
                            Status = "Failed",
                            Result = false,
                            Message = "Please Create a user",
                            Errors = new List<string>()
                            {
                                "User doesn't exist"
                            }
                        });
            var result = await _userManager.CheckPasswordAsync(existing_user, login.Password);
            if (result)
                {
                    existing_user.LastLoggedOn = DateTime.UtcNow;
                    await _userManager.UpdateAsync(existing_user);

                    // Log the successful login with ChurchId
                    _logger.LogInformation("User {UserName} successfully logged in with ChurchId {ChurchId}.", existing_user.UserName, existing_user.ChurchId);

                    var jwtToken = GenerateJwtToken(existing_user);

                    // Return a successful response with the JWT token
                    return Ok(new AuthResult()
                    {
                        Token = jwtToken,
                        Result = true,
                        Status = "Success",
                        Message ="Login was Successful;"
                    });
                    
                }
        }
        else
        {
            ModelState.AddModelError(string.Empty, "Invalid login attempt.");
            return BadRequest(new AuthResult()
            {
                Status = "Failed",
                            Result = false,
                            Message = "Login was unsuccessful",
                            Errors = new List<string>()
                            {
                                "Invalid Login Attempt"
                            }
            });
        }
        return BadRequest();
    }

    [HttpPost]
    [Route("Logout")]
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public async Task<IActionResult> Logout()
    {
        try
        {
            _logger.LogInformation("Before calling SignOutAsync");

            if (_signInManager != null)
            {
                await _signInManager.SignOutAsync();
                _logger.LogInformation("SignOutAsync called successfully");
                // ... rest of the code
                return Ok();
            }
            else
            {
                _logger.LogError("_signInManager is null");
                // Log or handle the case where _signInManager is null
                return StatusCode(500, "Internal Server Error");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during logout");
            return StatusCode(500, "Internal Server Error");
        }
    }


    [HttpPost]
    [Route("Forgot-Password")]
    public async Task<IActionResult> ForgotPassword([FromBody] PasswordResetRequest resetRequest)
    {
        var user = await _userManager.FindByEmailAsync(resetRequest.Email);
        if(user == null)
        {   
            return NotFound();
        }
        _notificationService.AddNotification($"User {resetRequest.Email} needs a password reset", "OverSeer");
        return Ok("Password request submitted successfully, Admin will reset in 24hours. ");
    }


    private string GenerateJwtToken(User user)
    {
        try
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim("ChurchId", user.ChurchId.ToString()),
                // new Claim("GroupId", user.GroupId?.ToString() ?? string.Empty),

                // Add other claims as needed
            };
               // Add GroupId claim if it's not null
            if (user.GroupId.HasValue)
            {
                claims.Add(new Claim("GroupId", user.GroupId.Value.ToString()));
            }
            _logger.LogInformation("Claims before token creation: {Claims}", claims);
            // Get user roles claims
            var roleClaims = GetUserRolesClaims(user);

            var JwtTokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.UTF8.GetBytes(_configuration.GetSection("JwtConfig:Secret").Value);

            var configuration = HttpContext.RequestServices.GetRequiredService<IConfiguration>();
            var audience = configuration.GetSection("JwtConfig:Audience").Value;
            var issuer = configuration.GetSection("JwtConfig:Issuer").Value;

            // Token descriptor
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(claims.Union(roleClaims)),
                NotBefore = DateTime.Now,
                Expires = DateTime.Now.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Issuer = issuer,
                Audience = audience,
            };

            var token = JwtTokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = JwtTokenHandler.WriteToken(token);
            return jwtToken.ToString();
        }
        catch (Exception ex)
        {
            // Log the exception for debugging purposes
            _logger.LogError(ex, "Error generating JWT token");
            throw; // Rethrow the exception for higher-level error handling
        }
    }

    private IEnumerable<Claim> GetUserRolesClaims(User user)
    {
        var roles = _userManager.GetRolesAsync(user).Result;
        
        // Convert each role to a claim
        var roleClaims = roles.Select(role => new Claim(ClaimTypes.Role, role));
        
        return roleClaims;
    }



}