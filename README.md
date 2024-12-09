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

### GET - Verifying User
https://blogapps-f06u.onrender.com/api/v1/users/VerifyUser/:id/:pin/:token

### GET - Logout
https://blogapps-f06u.onrender.com/api/v1/users/Logout

### GET - Dashboard
https://blogapps-f06u.onrender.com/api/v1/users/Dashboard

### PUT - Update User Profile
https://blogapps-f06u.onrender.com/api/v1/users/updateUser

### GET - Get Particular User
https://blogapps-f06u.onrender.com/api/v1/users/oneUser/:id

### GET - Get all Users-Admin
https://blogapps-f06u.onrender.com/api/v1/users/allUsers

### DELETE - Delete only user account
https://blogapps-f06u.onrender.com/api/v1/users/deleteUser

### PUT - Ban User - Admin
https://blogapps-f06u.onrender.com/api/v1/users/banUser/:id

### POST - Create Blog
https://blogapps-f06u.onrender.com/api/v1/blogs/publishBlog

### GET - Get all blogs
https://blogapps-f06u.onrender.com/api/v1/blogs/Blogs/

### GET - Get One Blog
https://blogapps-f06u.onrender.com/api/v1/blogs/Blogs/:id

### PUT - Update Blog
https://blogapps-f06u.onrender.com/api/v1/blogs/updateBlog/:id

### DELETE - Delete blog
https://blogapps-f06u.onrender.com/api/v1/blogs/deleteBlog/:id

### GET - Find Blogs by Title
https://blogapps-f06u.onrender.com/api/v1/blogs/BlogsByTitle

### GET - Find Blogs by Tags
https://blogapps-f06u.onrender.com/api/v1/blogs/BlogsByTags

### GET - Find Blogs by Author
https://blogapps-f06u.onrender.com/api/v1/blogs/BlogsByAuthor

### POST - Create Comment
https://blogapps-f06u.onrender.com/api/v1/comments/createComment/:id

### POST - Like a post
https://blogapps-f06u.onrender.com/api/v1/likes/addLike/:id

### DELETE - Delete Comment
https://blogapps-f06u.onrender.com/api/v1/comments/comment/:id

### DELETE - Dislike post
https://blogapps-f06u.onrender.com/api/v1/likes/Like/675

## Note: Since I'm deployed the apis in render's free tier, The initial request is taking time, Please wait little longer for initial request
