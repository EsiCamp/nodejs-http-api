# Node.js User Data Server

This Node.js server allows you to manage user data through HTTP requests. It provides endpoints for creating and retrieving user information.

## Testing the Server

To test the server, you can use the following `curl` command:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"username":"","email":""}' http://127.0.0.1:8000/user -vv
curl http://localhost:8000/users
