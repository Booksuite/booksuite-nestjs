const fs = require('node:fs')
const path = require('node:path')

// Map Portuguese categories to FacilityCategory enum values
const categoryMap = {
    Gerais: 'GENERAL',
    'Alimentos e Bebidas': 'FOOD_AND_BEVERAGES',
    'Áreas de lazer': 'LEISURE_AREAS',
    Atividades: 'ACTIVITIES',
    Estrutura: 'STRUCTURE',
    'Idiomas Falados': 'LANGUAGES_SPOKEN',
    Internet: 'INTERNET',
    Serviços: 'SERVICES',
    'Tipos de cama': 'BED_TYPES',
}

function parseCSV(csvContent) {
    const lines = csvContent.split('\n')
    const headers = lines[0].split(',')
    const facilities = []

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim()
        if (!line) continue

        const values = line.split(',')
        const row = {}
        headers.forEach((header, index) => {
            row[header] = values[index]?.trim() || ''
        })

        // Skip header row
        if (row['Tipo'] === 'Tipo') continue

        const type = row['Quarto'] === 'TRUE' ? 'HOUSING_UNIT_TYPE' : 'COMPANY'
        const icon = row['iconName'] !== 'circle-check' ? row['iconName'] : null

        const facility = {
            name: row['Comodidade pt-br'],
            icon,
            type,
            category: categoryMap[row['Tipo']] || 'GENERAL',
        }

        facilities.push(facility)
    }

    return facilities
}

// Read the CSV file
const csvPath = path.join(__dirname, 'facilities.csv')
const csvContent = fs.readFileSync(csvPath, 'utf8')

// Parse and convert the data
const facilities = parseCSV(csvContent)

// Write the facilities to a JSON file
fs.writeFileSync(
    path.join(__dirname, 'facilities.json'),
    JSON.stringify(facilities, null, 2),
)

console.log('Facilities have been converted and saved to facilities.json')
