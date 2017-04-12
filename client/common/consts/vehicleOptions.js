export const MAKE_OPTIONS = [
    { value: 'ford', label: 'Ford' },
    { value: 'honda', label: 'Honda' },
    { value: 'subaru', label: 'Subaru' }
]

export const MODEL_OPTIONS = {
    ford: [
        { value: 'f150', label: 'F150' },
        { value: 'pinto', label: 'Pinto' }
    ],
    honda: [
        { value: 'accord', label: 'Accord' },
        { value: 'civic', label: 'Civic' }
    ],
    subaru: [
        { value: 'forester', label: 'Forester'},
        { value: 'outback', label: 'Outback'}
    ]
}

export const ALL_MODEL_OPTIONS = Object.keys(MODEL_OPTIONS).reduce((arr, make) =>
    arr.concat(MODEL_OPTIONS[make].map(model => Object.assign({}, model, { make })))
, [])

export const COLOR_OPTIONS = [
    { value: 'blue', label: 'Blue' },
    { value: 'red', label: 'Red' },
    { value: 'yellow', label: 'Yellow'}
]
