var common = require('./common');

module.exports = {
    "advertiser": {
        "id": "/advertiser",
        "type": "object",
        "properties": {
            "minimize_multi_ads": {
                "id": "/advertiser/data/minimize_multi_ads",
                "type": "boolean"
            },
            "frequency_type": {
                "id": "/advertiser/data/frequency_type",
                "enum": [
                    "asap",
                    "even",
                    "no-limit"
                ]
            },
            "frequency_interval": {
                "id": "/advertiser/data/frequency_interval",
                "enum": [
                    "hour",
                    "day",
                    "week",
                    "month",
                    "not-applicable"
                ]
            },
            "status": {
                "id": "/advertiser/data/status",
                "type": "boolean"
            },
            "dmp_enabled": {
                "id": "/advertiser/data/dmp_enabled",
                "type": "string"
            },
            "agency_id": {
                "id": "/advertiser/data/agency_id",
                "type": "integer"
            },
            "allow_x_strat_optimization": {
                "id": "/advertiser/data/allow_x_strat_optimization",
                "type": "boolean"
            },
            "domain": {
                "id": "/advertiser/data/domain",
                "type": "string"
            },
            "ad_server_id": {
                "id": "/advertiser/data/ad_server_id",
                "type": "integer"
            },
            "updated_on": {
                "id": "/advertiser/data/updated_on",
                "type": "string",
                "readonly": true
            },
            "vertical_id": {
                "id": "/advertiser/data/vertical_id",
                "type": "integer"
            },
            "created_on": {
                "id": "/advertiser/data/created_on",
                "type": "string",
                "readonly": true
            }
        },
        "required": [
            "ad_server_id",
            "agency_id",
            "domain",
            "vertical_id"
        ]
    },
    "allOf": [
        common.entity,
        {
            "$ref": "#/advertiser"
        }
    ]
};
