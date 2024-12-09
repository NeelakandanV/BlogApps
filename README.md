## BlogApps - A simple blog website(Backend)
Description : This is a simple blog site where Users can create blogs,comment on posts and like the posts and get it on their profile implemented using nodejs and express js with tokenized requests and role based authorizations.

## Backend URL - https://blogapps-f06u.onrender.com/
## For more details,Visit my [Postman Docs](https://documenter.getpostman.com/view/26860332/2sAYBd6nQg)

### Features :-
- **Users** can create blogs,comment and like on posts
- Users can get commented and liked posts
- **Admin** only can fetch all users ,also able to delete blogs,delete comments and ban user if there any violating contents.

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
- On Verifying the link,This will allow User to reset their password. **(id - User Id , pin - Reset Pin , token - Token)**

### PUT - User Verification Link
https://blogapps-f06u.onrender.com/api/v1/users/UserVerification
- Send a verification link to the registered but not verified users.

### GET - Verifying User
https://blogapps-f06u.onrender.com/api/v1/users/VerifyUser/:id/:pin/:token
- On verifying the link,Change user status to verified. **(id - User Id , pin - Reset Pin , token - Token)**

### GET - Logout
https://blogapps-f06u.onrender.com/api/v1/users/Logout
- Clear the cookies or token to logout.

### GET - Dashboard
https://blogapps-f06u.onrender.com/api/v1/users/Dashboard
- Fetch Counts of users,blogs and comments

### PUT - Update User Profile
https://blogapps-f06u.onrender.com/api/v1/users/updateUser
- Authenticated user,Only able to update their profile.

### GET - Get Particular User
https://blogapps-f06u.onrender.com/api/v1/users/oneUser/:id
- Users able to get their data only. Admin can get anyone's data **(id - User Id )**

### GET - Get all Users-       Only Admin
https://blogapps-f06u.onrender.com/api/v1/users/allUsers
- This is only for Admin.Fetch data of all users with blogs if any created by them

### DELETE - Delete only user account
https://blogapps-f06u.onrender.com/api/v1/users/deleteUser
- Delete only the user account leaving the likes and comments.

### PUT - Ban User -   Only Admin
https://blogapps-f06u.onrender.com/api/v1/users/banUser/:id
- Admin can able to ban user if any violating contents posted by them. **(id - User Id)**

### POST - Create Blog
https://blogapps-f06u.onrender.com/api/v1/blogs/publishBlog
- Only verified users can able to create blogs

### GET - Get all blogs
https://blogapps-f06u.onrender.com/api/v1/blogs/Blogs/
- Fetch all blogs for displaying purpose with comments and likes count.

### GET - Get One Blog
https://blogapps-f06u.onrender.com/api/v1/blogs/Blogs/:id
- Fetch the full blog with comments and likes. **(id - Blog Id)**

### PUT - Update Blog
https://blogapps-f06u.onrender.com/api/v1/blogs/updateBlog/:id
- Only Authors can able to update their blogs. **(id - Blog Id)**

### DELETE - Delete blog
https://blogapps-f06u.onrender.com/api/v1/blogs/deleteBlog/:id
- Only Admin or Author can delete their blogs. **(id - Blog Id)**

### GET - Find Blogs by Title
https://blogapps-f06u.onrender.com/api/v1/blogs/BlogsByTitle
- Fetch blogs with the given title.

### GET - Find Blogs by Tags
https://blogapps-f06u.onrender.com/api/v1/blogs/BlogsByTags
- Fetch all blogs with the given tags.

### GET - Find Blogs by Author
https://blogapps-f06u.onrender.com/api/v1/blogs/BlogsByAuthor
- Fecth all blogs posted by the author

### POST - Create Comment
https://blogapps-f06u.onrender.com/api/v1/comments/createComment/:id
- Only Verified users can post a comment. **(id - Blog Id)**

### POST - Like a post
https://blogapps-f06u.onrender.com/api/v1/likes/addLike/:id
- Any User can give like to a post. **(id - Blog Id)**

### DELETE - Delete Comment
https://blogapps-f06u.onrender.com/api/v1/comments/comment/:id
- Only Admin or commented user can delete their comments. **(id - Comment Id)**

### DELETE - Dislike post
https://blogapps-f06u.onrender.com/api/v1/likes/Like/:id
- Any user can dislike a blog. **(id - Like Id)**

## Note: Since I'm deployed the apis in render's free tier, The initial request is taking time, Please wait little longer for initial request
