def ReportResource(report):
    return dict(
        id=report.id,
        created_at=report.created_at,
        updated=report.updated,
        date=report.date,
        location=report.location,
        room_number=report.room_number,
        geoLat=report.geoLat,
        geoLng=report.geoLng,
        vehicles=map(VehicleResource, report.vehicles),
        people=map(PersonResource, report.people)
    )

def VehicleResource(vehicle):
    return dict(
        id=vehicle.id,
        report_id=vehicle.report_id,
        created_at=vehicle.created_at,
        updated=vehicle.updated,
        make=vehicle.make,
        model=vehicle.model,
        color=vehicle.color
    )

def PersonResource(person):
    return dict(
        id=person.id,
        report_id=person.report_id,
        created_at=person.created_at,
        updated=person.updated,
        name=person.name,
        type=person.type,
        height=person.height,
        weight=person.weight,
        hair_color=person.hair_color,
        hair_length=person.hair_length,
        eye_color=person.eye_color,
        skin=person.skin,
        sex=person.sex
    )
