# Introduction

Your task is to write a small API that responds with camera data.

We have supplied a SQLite database with prepopulated data. We expect you to
create the table "users" yourself, and anything you might need in order to keep
track of tokens. We will login with the e-mail address "jane.doe@axis.com" and
password "test".

We have also supplied acceptance tests that will verify that we can:
* connect on port 3000
* login and retrieve a token for further requests
* fetch devices with supplied token

Test your solution by installing npm dependencies, then run: `npm test`.

The application can be written in JavaScript and executed by NodeJS
or in PHP served by the server flag, `php -S 127.0.0.1:3000 index.php`.

Any and all packages are of course allowed.

IMPORTANT NOTE: Even though this is a small assignment with simple tests, we
expect you to think of it as part of a larger project where you use good
practices in order to ease scaling, prevent regressions of bugs and keep a well
formed code base.
Imagine also that the project will be shared with X other developers which need
to understand the code to make changes and additions. Remember that you do this
to show us what you are good at, every detail matters!


# API endpoints to implement

## Login [POST /login]

+ Request

    {
        "email": "jane.doe@axis.com",
        "password": "test"
    }

+ Response 200 OK

    {
        "email": "jane.doe@axis.com",
        "token": "c6d8f431bb564638a699ce605f97f7d70054fcc7981a41ffa167da099bcc28cd"
    }


## Retrieve devices [GET /devices]

+ Request

    + Headers

        Authorization: Bearer c6d8f431bb564638a699ce605f97f7d70054fcc7981a41ffa167da099bcc28cd

+ Response 200 OK

    [
        {
            "id": "d90b2f56-4752-4952-b0b5-b1f77e422615",
            "type": "device",
            "name": "Entrance",
            "model": "M3045",
            "firmware": "9.10",
            "site": "Axis Lund"
        },
        {
            "id": "3ef5e8e6-9ffa-4852-ad97-641c3cba229d",
            "type": "device",
            "name": "Register",
            "model": "Q1005",
            "firmware": "5.50",
            "site": "Axis Lund"
        },
        {
            "id": "26d13d27-1911-44ea-bb8a-0a5af28d5f71",
            "type": "device",
            "name": "Warehouse",
            "model": "P3310",
            "firmware": "9.20",
            "site": "Axis Lund"
        }
    ]

