#!/usr/bin/env node
const program = require('commander')
const figlet = require('figlet');
const clear = require('clear');
const chalk = require('chalk');
const axios = require('axios')
const FormData = require('form-data');
const { prompt } = require('inquirer');
const open = require('open');
const puppeteer = require('puppeteer');
const mathJs = require('mathjs')
var qr = require('qrcode')
const util = require('util')
const childProcess = require("child_process");
const { performance } = require('perf_hooks');

const helpString = chalk.cyan(`
    Function                Alias           Description
    --version               -v              To check the version of the customer-cli
    --help                  -h              original help
    search                  s               make a google search
    searchopen              sp              make a google search and open
    openWeb                 op              open a website
    open                    o               open application
    inspect                 i               inspect a website
    weather                 w               get weather
    crypto                  cr              get crypto
    math                    mth             Solve a math problem
    QrCode                  qr              Generate QR code with string
    guessNum                gn              guess number from 1 to 100 game
    getRequest              GET             make a get request
    postRequest             POST            make a post request <stringify> can be y or n
    help                    h               custom and recommended help
    clear                   c               clear terminal
`)


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
            return `[${i+1}]  ${chalk.hex('ffa500')(e.link)} - ${chalk.magenta(e.title)}`
        })

        const questionsLength = questionsChoicesValid.length


        const questions = {
            type: "list",
            name: "choice",
            messages: "choose one",
            choices: [
                `[0] close app`,
                ...questionsChoicesValid,
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

async function generateQrCode(query) {

    try{
        console.log("\n\n")
        qr.toString(query,{type:'terminal'}, function (err, url) {
            console.log(url)
          })
        console.log("\n")

        process.exit()

    }
    catch(e){
        console.log(`\n\n ${chalk.red("An Error Occurred")} \n\n`)
        process.exit()

    }

    
    
}

async function openAppFn(name) {

    const warningColor = chalk.bold.hex('#FFA500')

    childProcess.exec(`open -a "${name}"`, function (err, stdout, stderr) {
        if (err) {
        console.error(warningColor(`\n\n Unable to find application named: ${chalk.redBright.bold(name)} \n\n`));
        return;
    }
    console.log(stdout);
    process.exit(0);// exit process once it is opened
    })
}


async function openApp(query) {

//Google Chrome.app
    try{

        async function askAppName() {
    
            const question = {
                type: "input",
                name: "appName",
                messages: "Write the app Name: ",
                default(){
                    return 'Google Chrome.app'
                }
            }
        
            const answer = prompt(question)
        
            return answer
        }

        async function askSelectApp() {

            const appList = {
                Chrome: "Google Chrome.app",
                // systemPreferences: "System Preferenes.app",
                vsCode: "Visual Studio Code.app",
                appStore: "App Store",
                finder: "finder",
                safari: "safari",
                brave: "Brave Browser.app"
            }

            const questionsToAskKeys = Object.keys(appList);

            // const questionsToAsk = questionsToAskKeys.map((e, i) => )

            const questionsToAsk = questionsToAskKeys.map((e, i) => {
                return `${chalk.hex('ffa500')(`[${i+1}]`)} ${e}`
            })
    
            const questions = {
                type: "list",
                name: "appName",
                messages: "Write the app Name: ",
                choices: [
                    `[0] Close app`,
                    ...questionsToAsk
                ]
            }
        
            const answer = prompt(questions).then(answers => {
                return answers
            })

            const data = await answer;
            const finalData = data['appName'];
            const splittet = finalData.split(" ")
            return splittet[1];
        
        }
        

        if(String(query).toLowerCase() == "n" || String(query).toLowerCase() == 'no' || query == false){

        console.log(query)
            
            const greenColor = chalk.rgb(5, 145, 66)

            const answer = await askAppName()
            const appName = answer.appName;

            console.log("\n\n")
            console.log(greenColor(` opening: ${chalk.green(appName)}`))

            await openAppFn(appName)

        }
        else{

            const appList = {
                Chrome: "Google Chrome.app",
                // systemPreferences: "System Preferenes.app",
                vsCode: "Visual Studio Code.app",
                appStore: "App Store",
                finder: "finder",
                safari: "safari",
                brave: "Brave Browser.app"
            }

            const appName = await askSelectApp()

            if (appName.toLowerCase() == "close") {
                console.log(chalk.red(`
                CLOSING APP
                `))

                process.exit()
            }
            else {
                
                const greenColor = chalk.rgb(5, 145, 66)

                console.log("\n\n")

                console.log(greenColor(` opening: ${chalk.green(appName)}`))
                
                console.log("\n")

                await openAppFn(appList[appName])

            }

        }

    }
    catch(e){
        console.log(`\n\n ${chalk.red("An Error Occurred")} \n\n`)
        console.log(e)
        process.exit()

    }
    
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

async function postRequest(stringify, query, data) {


    try{

        if(stringify.toLowerCase() == "n" || stringify.toLowerCase() == 'no' || stringify == false){

            const response = await axios.post(query, data)
            console.log(data)

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

        }
        else{
            const response = await axios.post(query, JSON.stringify(data))

            console.log(data)
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
        }
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

async function guessNum() {

    try{

        async function askNum() {
    
            const question = {
                type: "input",
                name: "num",
                messages: "Guess The Number: "
            }
        
            const answer = prompt(question)
        
            return answer
        }

        const randNum = Math.floor(Math.random()*100)+1;
        let userNum;

        console.log("\n\n")

        console.log(chalk.green(`     GAME STARTS     \n`))
        console.log(chalk.yellow(`     if you want to stop the game type 'c'     `))

        console.log("\n\n")

        while(userNum!=randNum){
            const question = await askNum()
            const userAns = question.num;

            if(userAns == 'c'){

                console.log(chalk.red(`     GAME ENDS     `))

                process.exit()
            }

            userNum = parseInt(userAns);

            if(userNum == randNum){
                console.log("\n\n")
                console.log(chalk.greenBright(`     YOU WON! ${chalk.green(`The number was: ${randNum}`)}       `))
                console.log("\n\n")
                break;
            }
            else{

                if(userNum > randNum){
                    console.log("\n\n")
                    console.log(chalk.blue(`    Your number {${chalk.cyanBright(userNum)}} is BIGGER than the number`))
                    console.log(chalk.blue(`    Your number {${chalk.cyanBright(`${userNum} > x`)}}`))
                    console.log("\n\n")
                }
                else{
                    console.log("\n\n")
                    console.log(chalk.blue(`    Your number {${chalk.cyanBright(userNum)}} is SMALLER than the number`))
                    console.log(chalk.blue(`    Your number {${chalk.cyanBright(`${userNum} < x`)}}`))

                    console.log("\n\n")
                }

            }



        }
        

    }
    catch(e){
        console.log(`\n\n ${chalk.red("An Error Occurred")} \n\n`)
        process.exit()
    }
    
}

async function mathGame() {
    try{

        async function askNum() {
    
            const question = {
                type: "input",
                name: "num",
                messages: "Guess The Number: "
            }
        
            const answer = prompt(question)
        
            return answer
        }

        const signs = ['+', '-']

        const signOne = signs[Math.floor(Math.random()*2)];
        const signTwo = signs[Math.floor(Math.random()*2)];

        console.log(signOne)

        const numOne = Math.floor(Math.random()*100)+1;
        const numTwo = Math.floor(Math.random()*100)+1;
        const numThree = Math.floor(Math.random()*100)+1;
        const numFour = Math.floor(Math.random()*100)+1;

        const finalQuestion = `${numOne}${signOne}${numTwo}${signTwo}${numThree}`;
        const questionAns = parseFloat(mathJs.evaluate(finalQuestion))

        console.log("\n\n")

        console.log(chalk.green(`     GAME STARTS     \n`))
        console.log(chalk.yellow(`     if you want to stop the game type 'c'     \n`))
        console.log(chalk.blue(`     QUESTION: ${chalk.whiteBright(finalQuestion)}`))

        console.log("\n\n")

        var startTime = performance.now()

        const userInp = await askNum();

        var endTime = performance.now()

        const timeUsed = parseInt(endTime-startTime)
        const timeusedSeccods = timeUsed/1000;


        if(userInp == 'c'){

            console.log(chalk.red(`     GAME ENDS     `))

            process.exit()
        }

        const userInpFloat = parseFloat(userInp.num)

        if(userInpFloat == questionAns){
            console.log("\n\n")
            console.log(chalk.greenBright(`     YOU WON! ${chalk.green(`The number was: ${chalk.greenBright.bold(questionAns)}`)}       \n`))
            console.log(`     You answered the question in: ${chalk.green.bold(timeusedSeccods)} secconds`)

            console.log("\n\n")
        }
        else{
            console.log("\n\n")
            console.log(chalk.redBright(`     YOU LOST! ${chalk.green(`The number was: ${questionAns}, and you answered: ${chalk.yellow(userInpFloat)}\n`)}       `))
            console.log(`     You answered the question in: ${chalk.yellowBright.bold(timeusedSeccods)} secconds`)
            console.log("\n\n")
        }
        

    }
    catch(e){
        console.log(`\n\n ${chalk.red("An Error Occurred")} \n\n`)
        process.exit()
    }
}

async function blackjackGame() {
    try{

        async function askContinue() {
    
            const question = {
                type: "confirm",
                name: "continue",
                messages: "Continue or stop? (y-continue, n-stop)"
            }
        
            const answer = prompt(question)
        
            return answer
        }

        let ans = true

        let userNums = [];
        let botNums = [];

        let userSum = 0;
        let botSum = 0;


        console.log("\n\n")

        console.log(chalk.green(`     GAME STARTS     \n`))
        console.log(chalk.yellow(`     if you want to stop the game type 'n'     \n`))
        console.log(chalk.blue(`     To win the game you need to be closer to 21 number \n     but if you go over 21 you loose`))

        console.log("\n")

        console.log(chalk.cyanBright(`     user Numbers: ${userNums}| user sum: ${userSum}`))
        console.log(chalk.cyanBright(`     bot Numbers: ${botNums} | bot sum: ${botSum}\n\n`))

        while(ans){

            if(userSum>21){
                console.log("\n")
                console.log(chalk.cyanBright(`     user Numbers: ${userNums}| user sum: ${userSum}`))
                console.log(chalk.cyanBright(`     bot Numbers: ${botNums} | bot sum: ${botSum}\n\n`))
                console.log(chalk.redBright(`     YOU LOST! `))
                process.exit()
                break;
            }
            if(botSum>21){
                console.log("\n")
                console.log(chalk.cyanBright(`     user Numbers: ${userNums}| user sum: ${userSum}`))
                console.log(chalk.cyanBright(`     bot Numbers: ${botNums} | bot sum: ${botSum}\n\n`))
                console.log(chalk.greenBright(`     YOU Won! `))
                process.exit()
                break;
            }

            const input = await askContinue();
            ans = input.continue

            const userRand = Math.floor(Math.random()*10)+1
            const botRand = Math.floor(Math.random()*10)+1

            userNums.push(userRand)
            userSum = userSum+userRand;

            if(botSum<17){

                botNums.push(botRand)
                botSum = botSum+botRand;

            }


            console.log("\n")
            console.log(chalk.cyanBright(`     user Numbers: ${userNums}| user sum: ${userSum}`))
            console.log(chalk.cyanBright(`     bot Numbers: ${botNums} | bot sum: ${botSum}\n\n`))
        }

        while(botSum<17){

            const botRand = Math.floor(Math.random()*10)+1
            botNums.push(botRand)
            botSum = botSum+botRand;

            console.log("\n")
            console.log(chalk.blue(`     bot is still picking nums\n`))
            console.log(chalk.cyanBright(`     user Numbers: ${userNums}| user sum: ${userSum}`))
            console.log(chalk.cyanBright(`     bot Numbers: ${botNums} | bot sum: ${botSum}\n\n`))
        }
        
        if(userSum<botSum){
            console.log(chalk.redBright(`     YOU LOST! `))
        }
        else if(userSum>botSum){
            console.log(chalk.greenBright(`     YOU Won! `))
        }
        else{
            console.log(chalk.yellowBright(`     YOU DREW! `))
        }

    }
    catch(e){
        console.log(`\n\n ${chalk.red("An Error Occurred")} \n\n`)
        console.log(e)
        process.exit()
    }
}

//program commands

program
    .version("1.0.0")
    .action(() => console.log("usage: \n\n" + helpString))
    // .description("hi this is cli program")
    // .usage("hi")
    .usage(helpString)

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
        

        console.log(helpString)

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
    .command("openWeb <query>")
    .alias("op")
    .description("open a website")
    .action((query) => openWebsite(query))

program
    .command("math <query>")
    .alias("mth")
    .description("Solve a math problem")
    .action((query) => math(query))

program
    .command("QrCode <query>")
    .alias("qr")
    .description("Generate QR code with string")
    .action((query) => generateQrCode(query))

program
    .command("open <query>")
    .alias("o")
    .description("Open an App")
    .action((query) => openApp(query))

program
    .command("getRequest <query>")
    .alias("GET")
    .description("GET request")
    .action((query) => getRequest(query))

program
    .command("postReques <stringify> <query> <data>")
    .alias("POST")
    .description("POST request <stringify: y or n>")
    .action((stringify, query, data) => postRequest(stringify, query, data))

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
    .command("guessNum")
    .alias("gs")
    .description("guess number from 1 to 100 game")
    .action(() => guessNum())

program
    .command("mathGame")
    .alias("mg")
    .description("simple +, -, *, / game")
    .action(() => mathGame())

program
    .command("blackjack")
    .alias("bg")
    .description("simple blackjack game")
    .action(() => blackjackGame())



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