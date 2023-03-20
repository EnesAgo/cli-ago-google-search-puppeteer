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
    mathGame                mg              simple +, -, *, / game         
    blackjack               bj              simple blackjack game
    triviaQuestions         tq              find the travia questions
    adviceGenerator         advice          advice generator
    quoteGenerator          quote           quote generator
    dadJoke                 joke            dad joke generator
    hangman                 hm              simple hang man game
    rockPaperScissors       rps             Rock Paper Scissors game
    typingTest              typeT           Typing speed test
    colorGenerator          color           Random hex color generator
    passwordGenerator       password        random password generator
    help                    h               custom and recommended help
    clear                   c               clear terminal
`)

const wait = ms => new Promise(res => setTimeout(res, ms));
const delay = ms => new Promise(res => setTimeout(res, ms));
const sleep = ms => new Promise(res => setTimeout(res, ms));


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

                console.log(chalk.red(`\n     GAME ENDS     \n`))

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
        // console.log(e)
        process.exit()
    }
}

async function triviaQuestions() {
    try{

        async function askQuestion() {
    
            const question = {
                type: "input",
                name: "answer",
                messages: "your answer"
            }
        
            const answer = prompt(question)
        
            return answer
        }

        const response = await axios.get("http://jservice.io/api/random");
        const data = response.data[0];

        console.log("\n\n")

        console.log(chalk.green(`     GAME STARTS     \n`))
        console.log(chalk.yellow(`     if you want to stop the game type 'c'     `))
        console.log(chalk.blue(`     QUESTION: ${chalk.whiteBright(data.question)}`))

        console.log("\n\n")

        const userAns = await askQuestion();

        if(userAns.answer.toLowerCase() == 'c'){

            console.log(chalk.red(`     GAME ENDS     `))

            process.exit()
        }

        if(userAns.answer.toLowerCase() == data.answer.toLowerCase()){

            console.log("\n")
            console.log(chalk.greenBright(`     YOU WON!`))
        }
        else{
            console.log("\n")
            console.log(chalk.redBright(`     YOU LOST!`))
        }

        console.log(chalk.cyanBright(`
        Difficulty: ${chalk.whiteBright(data.value)}
        Category: ${chalk.whiteBright(data.category.title)}
        Question: ${chalk.whiteBright(data.question)}
        Answer: ${chalk.whiteBright(data.answer)}
        Airdate: ${chalk.whiteBright(data.airdate)}
        ID: ${chalk.whiteBright(data.id)}

        `))




    }
    catch(e){
        console.log(`\n\n ${chalk.red("An Error Occurred")} \n\n`)
        process.exit()
    }
}

async function adviceGenerator() {
    try{

        const response = await axios.get("https://api.adviceslip.com/advice")

        console.log("\n\n")
        console.log(chalk.green(`Your Advice: ${chalk.cyanBright(response.data.slip.advice)}`))
        console.log("\n\n")

    }
    catch(e){
        console.log(`\n\n ${chalk.red("An Error Occurred")} \n\n`)
        // console.log(e)
        process.exit()
    }
}

async function quoteGenerator() {
    try{

        const response = await axios.get("https://type.fit/api/quotes")

        const quoteLength = response.data.length-1

        const randNum = Math.floor(Math.random()*quoteLength)

        const randQuote = response.data[randNum]

        const greenColor = chalk.hex("#00e516")

        console.log(randQuote)

        console.log("\n\n")
        console.log(`
        
${greenColor(`"${randQuote.text}"`)}

    - ${chalk.whiteBright(randQuote.author)}
        `)
        console.log("\n\n")

    }
    catch(e){
        console.log(`\n\n ${chalk.red("An Error Occurred")} \n\n`)
        // console.log(e)
        process.exit()
    }
}

async function jokeGenerator() {
    try{

        // const response = await axios.get('https://icanhazdadjoke.com/search?limit=1&page=349');

        // console.log(response.data)

        console.log("still in progress")

    }
    catch(e){
        console.log(`\n\n ${chalk.red("An Error Occurred")} \n\n`)
        console.log(e)
        process.exit()
    }
}

async function hangMan() {
    //https://random-word-api.herokuapp.com/word

    try{

        async function askLetter() {
    
            const question = {
                type: "input",
                name: "userInput",
                messages: "Type a letter (if typed more than 1 letter the first letter will be taken"
            }
        
            const answer = prompt(question)
        
            return answer
        }

        let ans = true

        const randWordResponse = await axios.get("https://random-word-api.herokuapp.com/word")
        const randWord = randWordResponse.data[0];

        const wordLength = randWord.length
        let triesLeft;

        if(wordLength <= 7){
            triesLeft = 5;
        }
        else if((wordLength > 7 && wordLength <= 12)){
            triesLeft = 8;
        }
        else{
            triesLeft = 10;
        }

        let wordArr = new Array(wordLength).fill('_')
        let wordArrCorrect = Array.from(randWord)
        let wordArrStringCompare = wordArr.join("")
        let usedLetters = []

        // console.log(chalk.cyanBright(wordArr.join(" ")))

        console.log("\n\n")

        console.log(chalk.green(`     GAME STARTS     \n`))
        console.log(chalk.yellow(`     if you want to stop the game type '/'     \n`))
        console.log(chalk.cyanBright(`     ${wordArr.join(" ")}   |   ${triesLeft} Tries Left`))

        console.log("\n")

        while(ans){

            if(triesLeft==0){
                console.log("\n\n")
                console.log(chalk.redBright(`     YOU LOST!     \n`))
                console.log(chalk.cyanBright(`     ${wordArr.join(" ")}   |   ${triesLeft} Tries Left   |   used Letters: ${chalk.white(usedLetters.join(", "))} \n`))
                console.log(chalk.green(`     True Word: ${chalk.greenBright(randWord)}`))
                console.log("\n\n")

                process.exit()

            }

            // console.log("\n\n")

            const input = await askLetter();
            ans = input.userInput[0]

            if(ans == '/'){

                console.log(chalk.red(`     GAME ENDS     `))
    
                process.exit()
            }

            if(usedLetters.indexOf(ans) == -1){
                usedLetters.push(ans)
            }

            let isCorrect = false

            wordArrCorrect.forEach((element, index) => {
                if(ans == element){
                    isCorrect=true
                    wordArr[index] = ans
                }
            })

            wordArrStringCompare = wordArr.join("")
            if(wordArrStringCompare == randWord){

                console.log(chalk.greenBright(`     YOU WON! The Word Was "${randWord}"       `))
                console.log(chalk.cyanBright(`     ${wordArr.join(" ")}   |   ${triesLeft} Tries Left   |   used Letters: ${chalk.white(usedLetters.join(", "))}`))
                process.exit()
            }

            if(!isCorrect){
                triesLeft = triesLeft - 1;
                console.log(chalk.red(`\n   Wrong, the letter ${ans} is not in the word \n`))
                console.log(chalk.cyanBright(`     ${wordArr.join(" ")}   |   ${triesLeft} Tries Left   |   used Letters: ${chalk.white(usedLetters.join(", "))}`))
                console.log("\n\n")
            }
            else{
                console.log(chalk.green(`\n     Correct, the letter ${ans} is in the word \n`))
                console.log(chalk.cyanBright(`     ${wordArr.join(" ")}   |   ${triesLeft} Tries Left   |   used Letters: ${chalk.white(usedLetters.join(", "))}`))
                console.log("\n\n")
            }

        }


        process.exit()
    }
    catch(e){
        console.log(`\n\n ${chalk.red("An Error Occurred")} \n\n`)
        // console.log(e)
        process.exit()
    }


}


async function RockPaperScissors() {
    try{

        async function askRockPaperOrScissors() {
    
            const question = {
                type: "list",
                name: "userInput",
                messages: "Choose Rock Paper or Scissors",
                choices: [
                    `[0] Rock`,
                    `[1] Paper`,
                    `[2] Scissors`,
                    `[3] Close App`
                ]
            }
        
            const answer = prompt(question)
        
            return answer
        }

        console.log("\n\n")

        console.log(chalk.green(`     GAME STARTS     \n`))

        console.log("\n\n")

        const userInp = await askRockPaperOrScissors();
        const ans = userInp.userInput[1];

        const botAns = Math.floor(Math.random()*3)


        switch(parseInt(ans)){
            case 0:

                if(botAns == 0){
                    console.log(chalk.yellowBright(`\n     YOU DREW!      `))
                    console.log(chalk.cyanBright(`\n     BOT PICKED ROCK      \n`))
                }
                else if(botAns == 1){
                    console.log(chalk.redBright(`\n     YOU LOST!      `))
                    console.log(chalk.cyanBright(`\n     BOT PICKED PAPER      \n`))
                }
                else{
                    console.log(chalk.greenBright(`\n     YOU WON!      `))
                    console.log(chalk.cyanBright(`\n     BOT PICKED SCISSORS      \n`))
                }

            break;
            case 1:

                if(botAns == 1){
                    console.log(chalk.yellowBright(`\n     YOU DREW!      `))
                    console.log(chalk.cyanBright(`\n     BOT PICKED PAPEr      \n`))
                }
                else if(botAns == 2){
                    console.log(chalk.redBright(`\n     YOU LOST!      `))
                    console.log(chalk.cyanBright(`\n     BOT PICKED SCISSORS      \n`))
                }
                else{
                    console.log(chalk.greenBright(`\n     YOU WON!      `))
                    console.log(chalk.cyanBright(`\n     BOT PICKED ROCK      \n`))
                }

            break;
            case 2:

                if(botAns == 2){
                    console.log(chalk.yellowBright(`\n     YOU DREW!      `))
                    console.log(chalk.cyanBright(`\n     BOT PICKED SCISSORS      \n`))
                }
                else if(botAns == 0){
                    console.log(chalk.redBright(`\n     YOU LOST!      `))
                    console.log(chalk.cyanBright(`\n     BOT PICKED ROCK      \n`))
                }
                else{
                    console.log(chalk.greenBright(`\n     YOU WON!      `))
                    console.log(chalk.cyanBright(`\n     BOT PICKED PAPER      \n`))
                }

            break;
            default:
                console.log(chalk.red(`\n     GAME ENDS     \n`))

            break;
        }

        process.exit()


    }
    catch(e){
        console.log(`\n\n ${chalk.red("An Error Occurred")} \n\n`)
        // console.log(e)
        process.exit()
    }
}



async function typingTest() {

    try{
        async function askWords() {
    
            const question = {
                type: "input",
                name: "userInput",
                messages: "Type the full words given with space (ex: car exam machine)"
            }
        
            const answer = prompt(question)
        
            return answer
        }

        let words = [];
        const wordNum = 15;

        for(let i=0; i<wordNum; i++){
            const randWordResponse = await axios.get("https://random-word-api.herokuapp.com/word")
            const randWord = randWordResponse.data[0];

            words.push(randWord);
        }

        const wordsString = String(words).replace(/,/g, ", ");


        console.log(chalk.green(`     Gmae Starts In: \n`))

        console.log(chalk.yellow(`     3 \n`))
        await delay(1000)

        console.log(chalk.yellow(`     2 \n`))
        await delay(1000)

        console.log(chalk.yellow(`     1 \n`))
        await delay(1000)

        console.log(chalk.cyan(`     STAART \n\n`))

        console.log(chalk.white(`     ${wordsString} \n\n`))

        var startTime = performance.now();

        const userInp = await askWords();

        var endTime = performance.now();

        const timeUsed = parseInt(endTime-startTime)
        const timeUsedSeccods = timeUsed/1000;


        let typeO = 0;


        const userInputWords = userInp.userInput.split(" ")
        
        words.forEach((element, index) => {

            const currentUserWord = userInputWords[index]
            const currentUserWordLetters = currentUserWord.split("")

            element.split("").forEach((elementE, elementI) => {
                if(elementE != currentUserWordLetters[elementI]){
                    typeO++;
                }
            })
        })

        const cpm = Math.round(((userInp.userInput.length / timeUsedSeccods) * 60));

        const wpmLengthDivideByFive = (userInp.userInput.length / 5)

        const wpm = Math.round((wpmLengthDivideByFive / timeUsedSeccods) * 60)

        const correctWpm = Math.round(((wpmLengthDivideByFive - typeO) / timeUsedSeccods) * 60);

        console.log("\n\n")
        console.log(chalk.cyanBright(`    YOUR WORDS PER MINUTE IS: ${chalk.green(`${correctWpm} WPM`)} WITH ${chalk.red(typeO)} TYPEO'S`))
        console.log("\n\n")


    }
    catch(e){
        console.log(`\n\n ${chalk.red("An Error Occurred")} \n\n`)
        // console.log(e)
        process.exit()
    }
    
}


async function colorGenerator() {
    try{
        const RanHexColor = Math.floor(Math.random()*16777215).toString(16);
        const fullHexColor = `#${RanHexColor}`;

        console.log("\n\n")
        console.log(`     ${chalk.bold.hex(fullHexColor)(`${fullHexColor}`)}`)
        console.log("\n\n")

    }
    catch(e){
        console.log(`\n\n ${chalk.red("An Error Occurred")} \n\n`)
        // console.log(e)
        process.exit()
    }
}

async function passwordGenerator() {

    try{
        async function askNumber() {
    
            const question = {
                type: "input",
                name: "userInput",
                messages: "How Manu characters do you want your password to be?"
            }
        
            const answer = prompt(question)
        
            return answer
        }

        console.log("\n\n")
        console.log(chalk.cyanBright(`    How Manu characters do you want your password to be?`))
        console.log("\n\n")


        const userInp = await askNumber();

        const lengthh = parseInt(userInp.userInput);

        let pass = '';
        const char="qw0erty1uQWERTYUIOPASDFGHJKLZXCVBNMiop2asdfg3hjklz4xc5vbn6m7,.@8#!?/:9_-=%*':/!?<>^¡`;\|";
        let l = char.length;
        
        for(let i=0;i<lengthh;i++){
            const random = char[Math.floor(Math.random()*l)];
            
            pass = pass + random;
        }

        console.log("\n\n")
        console.log(chalk.cyanBright(`     YOUR PASSWORD IS: ${chalk.white(pass)}`))
        console.log("\n\n")


    }
    catch(e){
        console.log(`\n\n ${chalk.red("An Error Occurred")} \n\n`)
        // console.log(e)
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
    .alias("bj")
    .description("simple blackjack game")
    .action(() => blackjackGame())

program
    .command("triviaQuestions")
    .alias("tq")
    .description("find the trivia questions")
    .action(() => triviaQuestions())

program
    .command("adviceGenerator")
    .alias("advice")
    .description("advice generator")
    .action(() => adviceGenerator())

program
    .command("quoteGenerator")
    .alias("quote")
    .description("quote generator")
    .action(() => quoteGenerator())

program
    .command("dadJoke")
    .alias("joke")
    .description("dad joke generator")
    .action(() => jokeGenerator())

 program
    .command("hangman")
    .alias("hm")
    .description("hangman game")
    .action(() => hangMan())

program
    .command("rockPaperScissors")
    .alias("rps")
    .description("rock paper scissors game")
    .action(() => RockPaperScissors())

program
    .command("typingTest")
    .alias("typeT")
    .description("Typing speed test")
    .action(() => typingTest())

program
    .command("colorGenerator")
    .alias("color")
    .description("random hex color generator")
    .action(() => colorGenerator())

program
    .command("passwordGenerator")
    .alias("password")
    .description("random password generator")
    .action(() => passwordGenerator())



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