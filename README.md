# API

## _? means optional_

<table style="width: 100%">
<tr>
    <th>Method</th>
    <th>Endpoint</th>
    <th>Request</th>
    <th>Response</th>
</tr>
<tr>
    <td>
    GET
    </td>
    <td>
    /job/:id
    </td>
    <td>
        id: UUID <br>
    </td>
<td>


    {
        "id": "084d3991-074e-4369-b85c-012a7a988634",
        "verified": false,
        "premium": false,
        "contact": {
            "email": "test@mail.ru",
            "phone": "+7-999-544-12-32",
            "telegram": "@chebyrash"
        },
        "location": {
            "country": "RUSSIA",
            "city": "MOSCOW"
        },
        "company": {
            "name": "SBERBANK",
            "industry": "FINANCES",
            "website": "sberbank.ru"
        },
        "salary": {
            "min": 50000,
            "max": 75000
        },
        "level": "CTO",
        "spec": "BACKEND",
        "stack": [
            "Java",
            "Docker"
        ],
        "remote": true,
        "description": "..."
    }
</td>
</tr>
<tr>
    <td>
    POST
    </td>
    <td>
    /job/search
    </td>
<td>

    {
        "location?": {
            "country?": "RUSSIA",
            "city?": "MOSCOW"
        },
        "company?": {
            "name?": "SBERBANK",
            "industry?": "FINANCES"
        },
        "salary?": {
            "min?": 50000,
            "max?": 75000
        },
        "level?": "CTO",
        "spec?": "BACKEND",
        "stack?": [
            "Java"
        ],
        "remote?": true,
        "query?": "..."
    }
</td>
<td>

    [
        {
            "id": "084d3991-074e-4369-b85c-012a7a988634",
            "verified": false,
            "premium": false,
            "contact": {
                "email": "test@mail.ru",
                "phone": "+7-999-544-12-32",
                "telegram": "@chebyrash"
            },
            "location": {
                "country": "RUSSIA",
                "city": "MOSCOW"
            },
            "company": {
                "name": "SBERBANK",
                "industry": "FINANCES",
                "website": "sberbank.ru"
            },
            "salary": {
                "min": 50000,
                "max": 75000
            },
            "level": "CTO",
            "spec": "BACKEND",
            "stack": [
                "Java",
                "Docker"
            ],
            "remote": true,
            "description": "..."
        }
    ]
</td>
</tr>

<tr>
    <td>
    POST
    </td>
    <td>
    /job/create
    </td>
<td>

    {
        "contact": {
            "email": "test@mail.ru",
            "phone": "+7-999-544-12-32",
            "telegram": "@chebyrash"
        },
        "location": {
            "country": "RUSSIA",
            "city": "MOSCOW"
        },
        "company": {
            "name": "SBERBANK",
            "industry": "FINANCES",
            "website": "sberbank.ru"
        },
        "salary": {
            "min": 50000,
            "max": 75000
        },
        "level": "CTO",
        "spec": "BACKEND",
        "stack": [
            "Java",
            "Docker"
        ],
        "remote": true,
        "description": "..."
    }
</td>
<td>

    {
        "id": "084d3991-074e-4369-b85c-012a7a988634",
        "verified": false,
        "premium": false,
        "contact": {
            "email": "test@mail.ru",
            "phone": "+7-999-544-12-32",
            "telegram": "@chebyrash"
        },
        "location": {
            "country": "RUSSIA",
            "city": "MOSCOW"
        },
        "company": {
            "name": "SBERBANK",
            "industry": "FINANCES",
            "website": "sberbank.ru"
        },
        "salary": {
            "min": 50000,
            "max": 75000
        },
        "level": "CTO",
        "spec": "BACKEND",
        "stack": [
            "Java",
            "Docker"
        ],
        "remote": true,
        "description": "..."
    }
</td>
</tr>

</table>
