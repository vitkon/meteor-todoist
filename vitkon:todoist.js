TodoistData = new Meteor.Collection("TodoistData");

var baseUrl = 'https://todoist.com/API/',
    syncUrl = 'https://todoist.com/TodoistSync/v5.3/';

Todoist = function(config) {
    var self = this;

    if (!config.email || !config.password) {
        throw 'Must instantiate Todoist with an email and password';
    }

    this.user = TodoistData.findOne({
        email: config.email
    }) || {};

    // if it's a new user
    if (_.isEmpty(this.user)) {
        var result,
            userData;

        try {
            userData = this._get('login', {
                email: config.email,
                password: config.password
            });

            if (userData.data === 'LOGIN_ERROR') {
                throw 'Incorrect username or password';
            }

            if (userData.data) {
                this.user = userData.data;
                TodoistData.remove({
                    id: userData.data.id,
                    email: userData.data.email
                });
                TodoistData.insert(userData.data);
            }

        } catch (err) {
            console.log(err);
        }

    }

    return this;
};

Todoist.prototype.request = function (endpoint, params) {
    params = params || {};
    endpoint = endpoint.toLowerCase();

    if (!params.hasOwnProperty('token')) {
        params.token = this.user.token;
    }

    return this._get(endpoint, params).data;
};

Todoist.prototype.getSync = function (params) {
    params.seq_no = params.seq_no || 0;
    return this._get('get', params, true);
};

Todoist.prototype._get = function(endpoint, params, isSync) {
    var path,
        response;

    path = (isSync) ? syncUrl : baseUrl;
    path += endpoint;
    console.log(path);

    try {
        response = HTTP.get(path, {
            params: params || {}
        });
        return response;

    } catch (err) {
        return {
            error: err
        };
    }
};