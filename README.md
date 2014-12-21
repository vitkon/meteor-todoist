# Todoist package for Meteor
Todoist package allows you to easily expose todoist API methods on Meteor server and cache user data in MongoDB.

## Installation
```sh
meteor add vitkon:todoist
```

## Usage
server.js example:
```js
var client = new Todoist({
        email: 'your@email.com',
        password: 'Your_Todoist_Password'
    });

// assuming you have a project with id = 124469099
var project = client.request('getProject', {project_id: 124469099});
console.log(project);
```

[All Todoist API methods](http://todoist.com/API/#/API/)

## License

Released under the MIT License.