type GenerateIDOptions = {
	prefix?: string;
	length?: number;
};

const generateID = ({
	prefix = '',
	length = 8
}: GenerateIDOptions = {}) => {
	const charArray = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
	let randomPart = '';

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * charArray.length);
		randomPart += charArray[randomIndex];
	}

	return prefix + randomPart;
};

export default generateID;
  