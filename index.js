const fs = require('fs');
const inquirer = require('inquirer');
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

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
                    type: "checkbox",
                    name: "languages",
                    message: "what languages do you use?",
                    choices: [ "javascript", "node", "html", "css", "json", "inquirer", "fs"]
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
            ]
        )

const tech = () => (
for(var i = 0; i < data.languages.length; i ++){
    console.log()
})
const generator = (data) =>
    `# ${data.name}

## ${data.date}

#### Description:

    ${data.description}
            
***Requirements/Goals:***

    ${data.requirements}

# Tehcnologies Used:

   * ${data.languages[0]}
   * ${data.languages[1]}
   * ${data.languages[2]}
   * ${data.languages[3]}
   * ${data.languages[4]}
   * ${data.languages[5]}
   * ${data.languages[6]}
        
# Link to Deployed Application:
nod
    ${data.github}

# Instructional Video:

    ${data.video}
        
# Screenshot
    
    ${data.screenshot}`


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