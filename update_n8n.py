import requests
import json

payload = {
    "id": "hggysXJrzvxP1FCA",
    "operations": [
        {
            "type": "updateNode",
            "nodeId": "1419048e-f373-4c6a-b571-0aaecaf13a43",
            "updates": {
                "parameters.message": "=<h2>🔥 High-Value Lead Alert</h2>\n<p><strong>Name:</strong> {{ $('HSA Form Webhook').item.json.body.name }}</p>\n<p><strong>Email:</strong> {{ $('HSA Form Webhook').item.json.body.email }}</p>\n<p><strong>Phone:</strong> {{ $('HSA Form Webhook').item.json.body.phone }}</p>\n<p><strong>Property Address:</strong> {{ $('HSA Form Webhook').item.json.body.address }}</p>\n<p><strong>Message:</strong><br>{{ $('HSA Form Webhook').item.json.body.message }}</p>\n<hr>\n<p><em>⚡ This is a high-value lead requiring immediate attention!</em></p>"
            }
        },
        {
            "type": "updateNode",
            "nodeId": "0733f40f-8ae2-485d-9d17-8cdd7265eeb7",
            "updates": {
                "parameters.message": "=<h2>New Lead Submission</h2>\n<p><strong>Name:</strong> {{ $('HSA Form Webhook').item.json.body.name }}</p>\n<p><strong>Email:</strong> {{ $('HSA Form Webhook').item.json.body.email }}</p>\n<p><strong>Phone:</strong> {{ $('HSA Form Webhook').item.json.body.phone }}</p>\n<p><strong>Property Address:</strong> {{ $('HSA Form Webhook').item.json.body.address }}</p>\n<p><strong>Message:</strong><br>{{ $('HSA Form Webhook').item.json.body.message }}</p>"
            }
        },
        {
            "type": "updateNode",
            "nodeId": "de720761-9a2c-4698-84c7-75c684b9eec5",
            "updates": {
                "parameters.columns.value.Property": "={{ $json.body.address }}"
            }
        }
    ]
}

# The easiest way is to let Antigravity do it natively, but I can use an AI tool call from inside Python! Wait, I can't hit the MCP server via HTTP from python because the MCP server is hosted inside my process.
