user_schema = {
    'name': {'type': 'string', 'required': True},
    'email': {'type': 'string', 'required': True},
    'password': {'type': 'string', 'required': True},
    'phone_number': {'type': 'string', 'required': True},
    'role': {'type': 'string', 'required': True}
}

login_schema = {
    'email': {'type': 'string'},
    'password': {'type': 'string'}
}

vehicle_schema = {
    'make': {'type': 'string'},
    'model': {'type': 'string'},
    'color': {'type': 'string'},
    'license_plate': {'type': 'string'}
}

person_schema = {
    'name': {'type': 'string'},
    'category': {'type': 'string', 'allowed': ['suspicious_person', 'victim', 'buyer']},
    'height': {'type': 'string'},
    'weight': {'type': 'string'},
    'hair_color': {'type': 'string'},
    'hair_length': {'type': 'string'},
    'eye_color': {'type': 'string'},
    'skin': {'type': 'string'},
    'sex': {'type': 'string'}
}

base_report_schema = {
    'date': {'type': 'string'},
    'location': {'type': 'string'},
    'room_number': {'type': 'string'},
    'geo_latitude': {'type': 'float'},
    'geo_longitude': {'type': 'float'},
}

report_schema = base_report_schema.update({
    'vehicles': {
        'type': 'list',
        'schema': vehicle_schema
    },
    'people': {
        'type': 'list',
        'schema': person_schema
    }
})

filter_report_schema = {
    'entity': {'type': 'string', 'allowed': ['report']},
    'values': {'type': 'dict', 'schema': base_report_schema}
}

filter_vehicle_schema = {
    'entity': {'type': 'string', 'allowed': ['vehicle']}
}

filters_schema = {
    'type': 'list',
    'schema': {
        'entity': {'type': 'string', 'allowed': ['report', 'vehicle', 'person']},
        'values': {'type': 'dict', 'oneof_schema': [base_report_schema, vehicle_schema, person_schema]}
    }
}
