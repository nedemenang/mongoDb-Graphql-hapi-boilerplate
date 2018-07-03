import user from '../controllers/user.js';

export default function (server) {
    server.route([{
            method: 'GET',
            path: '/',
            handler: function(req, res) {
                return `<h1>My Api<h1>`;
            }
        },
        {
            method: 'POST',
            path: '/api/v1/users',
            handler: user.create
        },
        {
            method: 'GET',
            path: '/api/v1/users',
            handler: user.list
        }
    ]);
    
}