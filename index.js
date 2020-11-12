// GIVEN a command-line application that accepts user input
// WHEN I am prompted for information about my application repository
// THEN a high-quality, professional README.md is generated with the title of my project ands entitled Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions

// WHEN I enter my project title
// THEN this is displayed as the title of the README

// WHEN I enter a description, installation instructions, usage information, contribution guidelines, and test instructions
// THEN this information is added to thes of the README entitled Description, Installation, Usage, Contributing, and Tests

// WHEN I choose a license for my application from a list of options
// THEN a badge for that license is added near the top of the README and a notice is added to the of the README entitled License that explains which license the application is covered under

// WHEN I enter my GitHub username
// THEN this is added to the of the README entitled Questions, with a link to my GitHub profile

// WHEN I enter my email address
// THEN this is added to the of the README entitled Questions, with instructions on how to reach me with additional questions

// WHEN I click on the links in the Table of Contents
// THEN I am taken to the corresponding of the README

const fs = require('fs');
const inquirer = require('inquirer');
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

function renderBadges(license) {
    if (license !== "None"){
        return `![License](https://img.shields.io/badge/license-${license}-yellow.svg)`;
    }
    return ''
}

const promptUser = () =>
    inquirer
        .prompt(
            [
                {
                    type: "input",
                    name: "name",
                    message: "What is your first and last name?",
                },
                {
                    type: "input",
                    name: "date",
                    message: "What is the date?",
                },
                {
                    type: "input",
                    name: "description",
                    message: "What is the description of your project?",
                },
                {
                    type: "input",
                    name: "requirements",
                    message: "What are the requirements/goals of this project?",
                },
                {
                    type: "input",
                    name: "github",
                    message: "Please link your Github repository to deployed project:",
                },
                {
                    type: "input",
                    name: "video",
                    message: "Please provid e alink to walkthrough video.",
                },
                {
                    type: "input",
                    name: "screenshot",
                    message: "Please provide a link to github screenshot.",
                },
                {
                    type: "checkbox",
                    name: "license",
                    message: "what license do you use?",
                    choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "None"]
                },
            ]
        )


const generator = (data) =>
    `
   * ${renderBadges(data.license)}
    
    # ${data.name}

## ${data.date}

---

### Table of contents:
* [License](#license)
* [Description](#description)
* [Requirements](#requirements)
* [Link to Deployed Application](#link-to-deployed-application)
* [Instructional Video](#instructional-video)
* [Screenshot](#screenshot)
---


#### Description:

    ${data.description}
            
***Requirements:***

    ${data.requirements}
        
# Link to Deployed Application:

    ${data.github}

# Instructional Video:

    ${data.video}
        
# Screenshot
    
    ${data.screenshot}
    
[Table of Contents](#table-of-contents)`


const merp = async () => {
    try {
        const data = await promptUser();
        const md = generator(data);

        await writeFileAsync("README.md", md);
        console.log("success");
    }
    catch (err) { console.log(err) }
};

merp();



