import chalk from 'chalk';

import deepKeys from 'deep-keys';
import inquirer from 'inquirer';
import merge from 'lodash/merge.js';
import fsExtra from 'fs-extra';

const { accessSync, constants, outputFileSync, readFileSync } = fsExtra;
const { prompt } = inquirer;

// Generate SolidJs Config file questions.

// --- project level questions.

const projectLevelQuestions = [
  {
    type: 'confirm',
    name: 'usesTypeScript',
    message: 'Does this project use TypeScript?',
  },
  {
    type: 'confirm',
    name: 'usesCssModule',
    message: 'Does this project use CSS modules?',
  },
  {
    type: 'list',
    name: 'cssPreprocessor',
    message: 'Does this project use a CSS Preprocessor?',
    choices: ['css', 'scss', 'less', 'styl'],
  },
];

// --- component level questions.

const componentLevelQuestions = [
  {
    type: 'input',
    name: 'component.default.path',
    message: 'Set the default path directory to where your components will be generated in?',
    default: () => 'src/components',
  },
  {
    type: 'confirm',
    name: 'component.default.withStyle',
    message: 'Would you like to create a corresponding stylesheet file with each component you generate?',
  },
  {
    type: 'confirm',
    name: 'component.default.withTest',
    message:
      'Would you like to create a corresponding test file with each component you generate that uses the SolidJs testing library?',
  },
  {
    type: 'confirm',
    name: 'component.default.withModel',
    when: (answers) => answers['usesCssModule'] && answers['usesTypeScript'],
    message: 'Does this project use typed CSS modules and, if so, would you like to generate a model file?',
  },
];

// --- merge all questions together.

const gscConfigQuestions = [...projectLevelQuestions, ...componentLevelQuestions];

async function createCLIConfigFile() {
  try {
    console.log();
    console.log(
      chalk.cyan(
        '--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------'
      )
    );
    console.log(
      chalk.cyan("It looks like this is the first time that you're running generate-solidjs-cli within this project.")
    );
    console.log();
    console.log(
      chalk.cyan(
        'Answer a few questions to customize generate-solidjs-cli for your project needs (this will create a "generate-solidjs-cli.json" config file on the root level of this project).'
      )
    );
    console.log(
      chalk.cyan(
        '--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------'
      )
    );
    console.log();

    const answers = await prompt(gscConfigQuestions);

    outputFileSync('generate-solidjs-cli.json', JSON.stringify(answers, null, 2));

    console.log();
    console.log(
      chalk.cyan(
        'The "generate-solidjs-cli.json" config file has been successfully created on the root level of your project.'
      )
    );

    console.log('');
    console.log(chalk.cyan('You can always go back and update it as needed.'));
    console.log('');
    console.log(chalk.cyan('Happy Hacking!'));
    console.log('');
    console.log('');

    return answers;
  } catch (e) {
    console.error(chalk.red.bold('ERROR: Could not create a "generate-solidjs-cli.json" config file.'));
    return e;
  }
}

async function updateCLIConfigFile(missingConfigQuestions, currentConfigFile) {
  try {
    console.log('');
    console.log(
      chalk.cyan(
        '------------------------------------------------------------------------------------------------------------------------------'
      )
    );
    console.log(
      chalk.cyan(
        'Generate SolidJs CLI has been updated and has a few new features from the last time you ran it within this project.'
      )
    );
    console.log('');
    console.log(chalk.cyan('Please answer a few questions to update the "generate-solidjs-cli.json" config file.'));
    console.log(
      chalk.cyan(
        '------------------------------------------------------------------------------------------------------------------------------'
      )
    );
    console.log('');

    const answers = await prompt(missingConfigQuestions);
    const updatedAnswers = merge({}, currentConfigFile, answers);

    outputFileSync('generate-solidjs-cli.json', JSON.stringify(updatedAnswers, null, 2));

    console.log();
    console.log(chalk.cyan('The ("generate-solidjs-cli.json") has successfully updated for this project.'));

    console.log();
    console.log(chalk.cyan('You can always go back and manually update it as needed.'));
    console.log();
    console.log(chalk.cyan('Happy Hacking!'));
    console.log();
    console.log();

    return updatedAnswers;
  } catch (e) {
    console.error(chalk.red.bold('ERROR: Could not update the "generate-solidjs-cli.json" config file.'));
    return e;
  }
}

export async function getCLIConfigFile() {
  // --- Make sure the cli commands are running from the root level of the project

  try {
    accessSync('./package.json', constants.R_OK);

    // --- Check to see if the config file exists

    try {
      accessSync('./generate-solidjs-cli.json', constants.R_OK);
      const currentConfigFile = JSON.parse(readFileSync('./generate-solidjs-cli.json'));

      /**
       *  Check to see if there's a difference between gscConfigQuestions and the currentConfigFile.
       *  If there is, update the currentConfigFile with the missingConfigQuestions.
       */

      const missingConfigQuestions = gscConfigQuestions.filter(
        (question) =>
          !deepKeys(currentConfigFile).includes(question.name) &&
          (question.when ? question.when(currentConfigFile) : true)
      );

      if (missingConfigQuestions.length) {
        return await updateCLIConfigFile(missingConfigQuestions, currentConfigFile);
      }

      return currentConfigFile;
    } catch (e) {
      return await createCLIConfigFile();
    }
  } catch (error) {
    console.error(
      chalk.red.bold(
        "ERROR: Please make sure that you're running the generate-solidjs-cli commands from the root level of your SolidJs project"
      )
    );
    return process.exit(1);
  }
}
