def UserAdministrationResource(user):
    return dict(
        id=user.id,
        email=user.email
        # TODO ...
    )
