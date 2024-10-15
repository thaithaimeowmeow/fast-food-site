﻿using System.ComponentModel.DataAnnotations;

namespace APIApp.Dtos.UserRequestDTOs
{
    public class RegisterDTO
    {
        [Required]
        public string? Username { get; set; }

        [Required]
        [EmailAddress]
        public string? Email { get; set; }
        [Required]
        public string? Password { get; set; }


    }
}
