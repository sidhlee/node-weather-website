# Weather Website

A Node Express project that serves a webpage to the client where the user can fetch the weather information from the same server.

- [Live Demo](https://toypiano-node-weather-website.herokuapp.com/)

## Setting up SSH Keys

SSH is the protocol used to securely transfer code between your machine and GitHub/Heroku.

### Creating SSH Keys

Windows users won’t have access to the necessary SSH commands from the command prompt. Make sure to use Git Bash for the following commands.
SSH uses an SSH key pair to secure the connection between your machine and the machine you’re communicating with. You can check if you already have an SSH key pair with the following command. You have a key pair if you see `id_rsa` and `id_rsa.pub` in the output.

```bash
ls -a -l ~/.ssh
```

You can create a new key pair using the following command. Make sure to swap out the
email for your email address.

```bash
ssh-keygen -t rsa -b 4096 -C "youremail@domain.com"
```

The SSH key needs to be configured to be used for new SSH connections. First, ensure
that the SSH agent is running. You can do that using the command below.

```bash
eval "$(ssh-agent -s)"
```

Next, add the new SSH private key file to the SSH agent. The following command is for
macOS users.

```bash
ssh-add -K ~/.ssh/id_rsa
```

The command below is for Linux users and Windows users.

```bash
ssh-add ~/.ssh/id_rsa
```

## Deploying Node.js to Heroku

### Add `start` script in `package.json`

This is how Heroku runs your app in the cloud.

```json
{
  "scripts": {
    "start": "node src/app.js"
  }
}
```

### Use process.env.PORT for your port address

Heroku will provide port number through the environment variable

```js
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
```

### Remove origin from client side JavaScript

Remove origin from the fetch url address.

```js
 fetch(
    // removed http://localhost:5000
    `/weather?address=${encodeURIComponent(address)}`
  ).then((res) => { ...
```

### Deploy Your Application

Run `heroku create your-app-name` from your application root to create a new application. This will create the new application and set up a new heroku Git remote. Push your code to that remote to deploy the application!
You can run `git push heroku master` to deploy. From there, run `heroku open` to open your application in the browser.
