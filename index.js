
const fs = require('fs');
const inquirer = require('inquirer');
const util = require('util');
const writeFileAsync = util.promisify(fs.writeFile);

function renderBadges(license) {
    if (license !== 'None'){
        return `![License](https://img.shields.io/badge/license-${license}-yellow.svg)`;
    }
    return ''
}

const promptUser = () =>
    inquirer
        .prompt(
            [
                {
                    type: 'input',
                    name: 'name',
                    message: 'What is your first and last name?',
                },
                {
                    type: 'input',
                    name: 'title',
                    message: 'What is the title?',
                },
                {
                    type: 'input',
                    name: 'date',
                    message: 'What is the date?',
                },
                {
                    type: 'input',
                    name: 'description',
                    message: 'What is the description of your project?',
                },
                {
                    type: 'input',
                    name: 'instructions',
                    message: 'Provide instructions on how to use this project',
                },
                {
                    type: 'input',
                    name: 'usage',
                    message: 'please enter the usage information:',
                },
                {
                    type: 'input',
                    name: 'guidelines',
                    message: 'please enter the contributing guidelines:',
                },
                {
                    type: 'input',
                    name: 'username',
                    message: 'what is your github username?',
                },
                {
                    type: 'input',
                    name: 'github',
                    message: 'Please link your Github repository to deployed project:',
                },
                {
                    type: 'input',
                    name: 'email',
                    message: 'what is your email address?',
                },
                {
                    type: 'input',
                    name: 'additional',
                    message: 'Please provide a brief message on how to contact you with further questions:',
                },
                {
                    type: 'input',
                    name: 'video',
                    message: 'Please provide a link to walkthrough video.',
                },
                {
                    type: 'input',
                    name: 'screenshot',
                    message: 'Please provide a screenshot.',
                },
                {
                    type: 'checkbox',
                    name: 'license',
                    message: 'what license do you use?',
                    choices: ['MIT', 'APACHE 2.0', 'GPL 3.0', 'BSD 3', 'None']
                },
            ]
        )


const generator = (data) =>
    `## ${data.name}

## ${data.date}

# ${data.title}

---

### Table of contents:
- [License](#license)
- [General](#general)
        * [Description](#description)
        * [Instructions](#instructions)
        * [Usage Information](#usage-information)
        * [Constribution Guidelines](#contribution-guidelines)
- [Link to Deployed Application](#link-to-deployed-application)
- [Email](#email)
- [Instructional Video](#instructional-video)
- [Screenshot](#screenshot)


---

# License:

   ${data.license}
   ${renderBadges(data.license)}

### General:

   * Description: ${data.description}
   * Instructions: ${data.instructions}
   * Usage Information: ${data.usage}
   * Contribution Guidelines: ${data.guidelines}
            
### Link to Deployed Application:

    ${data.username}
    ${data.github}

### Email:

    ${data.email}
    ${data.additional}

### Instructional Video:

    ${data.video}
        
### Screenshot
    
    ${data.screenshot}
    
[Table of Contents](#table-of-contents)`


const merp = async () => {
    try {
        const data = await promptUser();
        const md = generator(data);

        await writeFileAsync('README.md', md);
        console.log('success');
    }
    catch (err) { console.log(err) }
};

merp();



