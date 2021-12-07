const { Codestain } = require("./dist/Codestain");

const example = `
    const getNumberFromInput = (number) => {
        try {
            if (number.isInteger()) {
                switch (number) {
                    case 1:
                        return 1;
                        break;
                    case 2:
                        return 2;
                        break;
                    case 3:
                        return 3:
                        break;
                    default:
                        return -1;
                        break;
                }
            } else {
                throw Error('Input is not a number.');
            }
        } catch (e) {
            console.error(e);
        } finally () {
            console.log('Done.');
        }
    }
`;

console.log(Codestain("JavaScript", example));
