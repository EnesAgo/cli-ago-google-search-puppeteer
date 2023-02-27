#!/usr/bin/env node
const program = require('commander')
const figlet = require('figlet');
const chalk = require('chalk');
const clear = require('clear');
const axios = require('axios')
const { prompt } = require('inquirer');
const open = require('open');
const puppeteer = require('puppeteer');
const mathJs = require('mathjs')
const util = require('util')

async function googleSearch(query) {
    try{
        
        console.log("launching")

        const puppeteerBrowser = await puppeteer.launch();
        const page = await puppeteerBrowser.newPage();
        
        await page.goto(`https://google.com`, { waitUntil: 'load', timeout: 0 });

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
        
        // console.log(data)

        const websites = data.map((e, i) => {
            return `[${i}]  ${chalk.hex('ffa500')(e.link)} - ${chalk.magenta(e.title)}`
        })

        console.log("\n\n")

        websites.forEach(e => console.log(e))

        console.log("\n")

        process.exit()

    }
    catch(e){
        console.log("\n\n")
        console.log(chalk.red("An Error Occurred"))
        console.log("\n\n")

        process.exit()
    }

}

async function googleSearchOpen(query) {

    try{
        console.log("launching")

        const puppeteerBrowser = await puppeteer.launch();
        const page = await puppeteerBrowser.newPage();
        
        await page.goto(`https://google.com`, { waitUntil: 'load', timeout: 0 });

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
        
        const questionsChoicesValid = data.map((e, i) => {
            return `[${i}]  ${chalk.hex('ffa500')(e.link)} - ${chalk.magenta(e.title)}`
        })

        const questionsLength = questionsChoicesValid.length


        const questions = {
            type: "list",
            name: "choice",
            messages: "choose one",
            choices: [
                ...questionsChoicesValid,
                `[${questionsLength}] close app`
            ]
        }
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
    catch(e){
        console.log("\n\n")
        console.log(chalk.red("An Error Occurred"))
        console.log("\n\n")

        process.exit()
    }

}

async function inspectWebsite(query) {

    try{
        console.log("launching")

        const puppeteerBrowser = await puppeteer.launch();
        const page = await puppeteerBrowser.newPage();
        
        await page.goto(`${query}`, { waitUntil: 'load', timeout: 0 });
    
    
          const headings = await page.evaluate(() => {
            const hs = Array.from(document.querySelectorAll(`h1, h2, h3, h4, h5`))
            const p = Array.from(document.querySelectorAll(`p`))
    
            const hsContent = hs.map(e => e.textContent.trim())
            const pContent = p.map(e => e.textContent.trim())
    
    
            return {hsContent: hsContent, pContent: pContent};
          })
    
          console.log('\n\n\n')
        //   console.log(chalk.red(headings.hsContent))
          headings.hsContent.forEach(e => console.log(`\n ${chalk.red(e)}`))
          console.log('\n\n')
        //   console.log(chalk.blueBright(headings.pContent))
          headings.pContent.forEach(e => console.log(`\n ${chalk.blueBright(e)}`))
          console.log('\n\n\n')
    
    
    
        await puppeteerBrowser.close()
        process.exit()
    }
    catch(e){
        console.log("\n\n")
        console.log(chalk.red("An Error Occurred"))
        console.log("\n\n")

        process.exit()
    }

}

async function openWebsite(query) {

    try{
        open(query)

        console.log("\n\n")
        console.log(chalk.green("Website Opening"))
        console.log("\n\n")

        process.exit()
    }
    catch(e){
        console.log("\n\n")
        console.log(chalk.red("An Error Occurred"))
        console.log("\n\n")

        process.exit()
    }
    
}

async function math(query) {
    console.log(`\n\n${chalk.yellow(query)} = ${chalk.blueBright(mathJs.evaluate(query))}\n\n`)

    process.exit()
}

async function getRequest(query) {

    try{
        const response = await axios.get(query)


        try{

            console.log(`\n\n`)

            console.info(util.inspect(JSON.parse(response), false, null, true /* enable colors */))

            console.log("\n\n")

        }
        catch(e){

            console.log(`\n\n`)

            console.info(util.inspect(response, false, null, true /* enable colors */))

            console.log("\n\n")
        }

        process.exit()

    }
    catch(e){
        console.log(`\n\n ${chalk.red("An Error Occurred")} \n\n`)
        process.exit()

    }
}

async function getWeather() {

    try{
        
        console.log("launching")

        const puppeteerBrowser = await puppeteer.launch();
        const page = await puppeteerBrowser.newPage();
        
        await page.goto(`https://wttr.in/`, { waitUntil: 'load', timeout: 0 });

        const content = await page.evaluate(() => {
    
            return document.querySelector("pre").textContent;
          })

          console.log(content)
          console.log(chalk.red("Attention! original site: https://wttr.in/ \n"))

        await puppeteerBrowser.close()
        process.exit()

    }
    catch(e){
        console.log("\n\n")
        console.log(chalk.red("An Error Occurred"))
        console.log("\n\n")

        process.exit()
    }
    
}

async function getCrypto() {
    console.log("not ready yet")
    process.exit()
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
    searchopen              sp              make a google search and open
    open                    o               open a website
    inspect                 i               inspect a website
    weather                 w               get weather
    crypto                  cr              get crypto
    math                    mth             Solve a math problem
    getRequest              GET             make a get request
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
        searchopen              sp              make a google search and open
        open                    o               open a website
        inspect                 i               inspect a website
        weather                 w               get weather
        crypto                  cr              get crypto
        math                    mth             Solve a math problem
        getRequest              GET             make a get request
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
    .command("searchopen <query>")
    .alias("sp")
    .description("make a google search and open")
    .action((query) => googleSearchOpen(query))

program
    .command("inspect <query>")
    .alias("i")
    .description("inspect a website")
    .action((query) => inspectWebsite(query))
    
program
    .command("open <query>")
    .alias("o")
    .description("open a website")
    .action((query) => openWebsite(query))

program
    .command("math <query>")
    .alias("mth")
    .description("Solve a math problem")
    .action((query) => math(query))

program
    .command("getRequest <query>")
    .alias("GET")
    .description("GET request")
    .action((query) => getRequest(query))

program
    .command("crypto")
    .alias("cr")
    .description("get weather")
    .action(() => getCrypto())

program
    .command("weather")
    .alias("w")
    .description("get weather")
    .action(() => getWeather())

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
