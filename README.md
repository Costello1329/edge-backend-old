# API

<table style="width: 100%">
<tr>
<th>Endpoint</th>
<th>Request</th>
<th>Response</th>
</tr>
<tr>
<td>
/job/search
</td>
<td>
page:  int?    <br>
query: string? <br>
</td>
<td>

    {
        "id": "xxx",
        "verified": true,
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
        "salary": {
        "min": 50000,
        "max": 75000
        },
        "scope": "BACKEND",
        "stack": [
        "Java",
        "Docker"
        ],
        "remote": true,
        "description": "Lorem ipsum..."
    }
</td>
</tr>
</table>
