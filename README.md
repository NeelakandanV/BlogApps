## BlogApps - A simple blog website(Backend)
Description : This is a simple blog site where Users can create blogs,comment on posts and like the posts and get it on their profile implemented using nodejs and express js with tokenized requests and role based authorizations.

## Backend URL - https://blogapps-f06u.onrender.com/
## For more details,Visit my [Postman Docs](https://documenter.getpostman.com/view/26860332/2sAYBd6nQg)

### Features :-
- **Users** can create blogs,comment and like on posts
- Users can get commented and liked posts
- **Admin** only can fetch all users ,also able to delete blogs,delete comments and ban user if there any irrelevant contents.

**bcryptjs** - For Password hashing,your data is safe and secure.<br/>
**JWT** - For tokenized requests and role based authorizations in our website.<br/>
**Nodemailer** - For sending mails for verification and Password Resets.

# API Endpoints:-
### GET - Server Check
https://blogapps-f06u.onrender.com
- For Checking the server status

### POST - Create User
https://blogapps-f06u.onrender.com/api/v1/users/Register
- Allow user to register only if they are not registered yet.

### POST - Login
https://blogapps-f06u.onrender.com/api/v1/users/Login
- Only registered user can able to sign in.

### PUT - Forgot Password
https://blogapps-f06u.onrender.com/api/v1/users/ForgotPassword
- Send a Link to User registered Email to reset Password.

### PUT - Reset Password
https://blogapps-f06u.onrender.com/api/v1/users/ResetPassword/:id/:pin/:token
- On Verifying the link,This will allow User to reset their password. (id - User Id , pin - Reset Pin , token - Token)

### PUT - User Verification Link
https://blogapps-f06u.onrender.com/api/v1/users/UserVerification
- Send a verification link to the registered but not verified users.

## Note: Since I'm deployed the apis in render's free tier, The initial request is taking time, Please wait little longer for initial request
