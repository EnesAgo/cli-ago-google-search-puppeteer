#!/usr/bin/env node
const program = require("commander")
const figlet = require('figlet');
const chalk = require('chalk');
const clear = require('clear');
const axios = require('axios')
const { prompt } = require('inquirer');
const open = require('open');
const puppeteer = require('puppeteer');


async function googleSearch(query) {

    await open('https://google.com');


    console.log("launching")

    const puppeteerBrowser = await puppeteer.launch();
    const page = await puppeteerBrowser.newPage();
    
    await page.goto(`https://google.com`);

    // await page.$eval('input.gLFyf', el => el.value = query);
    console.log("launched")


    await page.type('input.gLFyf', query);

    await page.evaluate(async() => {
        await new Promise(function(resolve) { 
               setTimeout(resolve, 300)
        });
    });

    await page.click("input.gNO89b")

    await page.waitForNavigation();


    let data = await page.evaluate(() => {
        let links = [...document.querySelectorAll('.s6JM6d .yuRUbf > a')];
        let names = [...document.querySelectorAll('.s6JM6d .yuRUbf a h3')];

        const finaldata = names.map((e, i) => {return {title: e.textContent.trim(), link: links[i].getAttribute("href")}})

        return finaldata;

      });

      await page.evaluate(async() => {
        await new Promise(function(resolve) { 
               setTimeout(resolve, 300)
        });
    });

    await puppeteerBrowser.close()
    
    console.log(data)

    const questionsChoicesValid = data.map((e, i) => {
        return `[${i}]  ${chalk.hex('ffa500')(e.link)} - ${chalk.magenta(e.title)}`
    })


    const questions = {
        type: "list",
        name: "choice",
        messages: "choose one",
        choices: [
            ...questionsChoicesValid,
            `[10] close app`
        ]
    }

    // prompt({type:"list", name:"browser", message:"choose one you have/use", choices:["chrome", "firefox", "edge", "close app"]}).then(answerone => {
    //     if(answerone.browser == 'close app') {
    //         console.log(chalk.red(`
    //         CLOSING APP
    //     `))
    //         process.exit()
    //     }
    //     else{
            prompt(questions).then(answers => {
                const splittet = answers.choice.split(" ")
                if (splittet[1] == "close") {
                console.log(chalk.red(`
                CLOSING APP
                `))
                    process.exit()
                } else {
                    // open(data[answers.choice[1]].link, {app: {name: answerone.browser}})
                    open(data[answers.choice[1]].link)
                }
            });
    //     }
    // })
}




program
    .version("1.0.0")
    // .description("hi this is cli program")
    // .usage("hi")
    .usage(chalk.cyan(`
    Function                Alias           Description
    --version               -v              To check the version of the customer-cli
    --help                  -h              original help
    search                  s               make a google search
    help                    h               custom and recommended help
    clear                   c               clear terminal
    `))

    program
    .command("help")
    .alias("h")
    .description("custom and recommended help")
    .action(() => 
        {
            figlet('AGO GOOGLE SEARCH', async function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(chalk.red(data))
    })
    setTimeout(() => {
        

        console.log(chalk.cyan(`
        Function                Alias           Description
        --version               -v              To check the version of the customer-cli
        --help                  -h              original help
        search                  s               make a google search
        help                    h               custom and recommended help
        clear                   c               clear terminal
        `))

    }, 10);
    })

program
    .command("search <query>")
    .alias("s")
    .description("make a google search")
    .action((query) => googleSearch(query))

    program
        .command("clear")
        .alias("c")
        .description("clear terminal")
        .action(() => {
            clear()
            figlet('AGO GOOGLE SEARCH', async function(err, data) {
                if (err) {
                    console.log('Something went wrong...');
                    console.dir(err);
                    return;
                }
                console.log(chalk.red(data))
            })
        })

program.parse(process.argv)
