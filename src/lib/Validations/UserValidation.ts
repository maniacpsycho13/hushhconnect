import * as z from "zod";


export const UserValidation = z.object({
    profile_photo: z.string().url().nonempty(),
    name: z
      .string()
      .min(3, { message: "Minimum 3 characters." })
      .max(30, { message: "Maximum 30 caracters." }),
    username: z
      .string()
      .min(3, { message: "Minimum 3 characters." })
      .max(30, { message: "Maximum 30 caracters." }),
    bio: z
      .string()
      .min(3, { message: "Minimum 3 characters." })
      .max(1000, { message: "Maximum 1000 caracters." }),
  });

  export const UsernameValidation=z.object({
    username: z
      .string()
      .min(3, { message: "Minimum 3 characters." })
      .max(30, { message: "Maximum 30 caracters." }),
  })

  export const BasicDetailsValidation = z.object({
    name: z
      .string()
      .min(3, { message: "Minimum 3 characters." })
      .max(30, { message: "Maximum 30 caracters." }),
    dob: z
      .date({
        required_error: "Date of Birth is required",
      }),
    gender: z
      .string()
      .min(3, { message: "Minimum 3 characters." })
      .max(30, { message: "Maximum 30 caracters." }),
  })

  export const ProfilePicValidation = z.object({
    profile_photo: z.string().url(),
    bio: z
      .string()
      .min(3, { message: "Minimum 3 characters." })
      .max(1000, { message: "Maximum 1000 caracters." }),
  })