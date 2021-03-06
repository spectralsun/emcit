user_schema = {
    'id': {'type': 'number'},
    'name': {'type': 'string', 'empty': False},
    'username': {'type': 'string', 'required': True, 'empty': False},
    'password': {'type': 'string', 'required': True, 'empty': False},
    'phone_number': {'type': 'string'},
    'role': {'type': 'string', 'required': True, 'empty': False}
}

update_user_schema = user_schema
update_user_schema['password']['required'] = False
update_user_schema['password']['empty'] = True

login_schema = {
    'username': {'type': 'string', 'required': True, 'empty': False},
    'password': {'type': 'string', 'required': True, 'empty': False}
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
    'sex': {'type': 'string'},
    'details': {'type': 'string'}
}

base_report_schema = {
    'date': {'type': 'number'},
    'location': {'type': 'string'},
    'room_number': {'type': 'string'},
    'geo_latitude': {'type': 'float'},
    'geo_longitude': {'type': 'float'},
    'details': {'type': 'string'}
}

report_schema = dict()
report_schema.update(base_report_schema)
report_schema.update({
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
