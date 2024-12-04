const fs = require('fs');
const path = require('path');

function validateSubdomains() {
	const subdomainsPath = path.join(__dirname, '..', 'subdomains.json');
	const subdomains = JSON.parse(fs.readFileSync(subdomainsPath, 'utf8'));

	const errors = [];

	// Validate unique subdomains
	const subdomanKeys = Object.keys(subdomains);
	const uniqueKeys = new Set(subdomanKeys);

	if (uniqueKeys.size !== subdomanKeys.length) {
		errors.push('Duplicate subdomains found');
	}

	// Basic URL validation
	subdomanKeys.forEach(key => {
		const url = subdomains[key];
		if (!url.match(/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/.*)?$/)) {
			errors.push(`Invalid URL for ${key}: ${url}`);
		}
	});

	if (errors.length > 0) {
		console.error('Validation Errors:', errors);
		process.exit(1);
	}

	console.log('Subdomains validation successful');
}

validateSubdomains();
