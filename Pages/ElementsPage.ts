import { expect } from "@playwright/test";
import { Page } from "playwright-core";

export class TeamQAElementPage {
    private page: Page;
    constructor(page: Page) {
        this.page = page
    }

    //Locators
    elements = async () => this.page.$('h5:has-text("Elements")')
    elementsTitlebox = async (btn: string) => await this.page.$(`text=${btn}`)
    button = async (button) => await this.page.$(`text="${button}"`)
    elementsTitle = async () => this.page.textContent('div[class="main-header"]')
    eleUserNm = async () => this.page.$("input[name='username']")
    eleLogin = async () => this.page.$("input[value='Login']")
    typeUsername = async () => this.page.$('input[id="userName"]')
    typeEmail = async () => this.page.$('input[id="userEmail"]')
    typeCurrentAddress = async () => this.page.$('textarea[id="currentAddress"]')
    typePermanentAddress = async () => this.page.$('textarea[id="permanentAddress"]')
    buttonClick = async () => this.page.$('button[id="permanentAddress"]')
    test = async () => this.page.textContent('p[id="name"]')
    toggleParent = async () => this.page.$('button[title="Toggle"]')
    test1 = async (c) => this.page.locator(`//*[@id="tree-node"]/ol/li/ol/li[${c}]/span/label/span[3]`)
    toggleTree = async () => this.page.$$('span.rct-title')
    addButton = async () => this.page.$('button[id="addNewRecordButton"]')
    firstNme = async () => this.page.$('#firstName')
    lastName = async () => this.page.$('#lastName')
    email = async () => this.page.$('#userEmail')
    age = async () => this.page.$('#age')
    salary = async () => this.page.$('#salary')
    department = async () => this.page.$('#department')

    //Actions
    public async clickElements() {
        const ele = await this.elements()
        if (ele != null)
            await ele.click()
        else throw new Error("No element found")
    }

    public async verifyElementPageOpened(titleName: string) {
        const ele = await this.elementsTitle()
        console.log("Page title : " + ele.trim())
        if (ele != null)
            expect(ele).toBe(`${titleName}`)
        else throw new Error(titleName + " page not landed!!!")
    }

    public async elementsTabSelection(tab: string) {
        const ele = await this.elementsTitlebox(tab)
        await this.page.waitForSelector(`text=${tab}`)
        if (ele != null)
            await ele.click()
        else throw new Error(tab + " No such tabs are found")
    }

    public async elementsCheckBoxclick(tab: string) {
        const ele = await this.elementsTitlebox(tab)
        await this.page.waitForSelector("text=Text Box")
        if (ele != null)
            await ele.click()
        else throw new Error("No element found")
    }

    public async elementsTextBoxFullName(type: string) {
        const ele = await this.typeUsername()
        if (ele != null)
            await ele.type(type)
        else throw new Error("No element found")
    }

    public async elementsTextBoxEmail(email: string) {
        const ele = await this.typeEmail()
        if (ele != null)
            await ele.type(email)
        else throw new Error("No element found")
    }

    public async elementsTextBoxCurrentAddress(Current_Address: string) {
        const ele = await this.typeCurrentAddress()
        if (ele != null)
            await ele.type(Current_Address)
        else throw new Error("No element found")
    }

    public async elementsTextBoxPermanentAddress(Permanent_Address: string) {
        const ele = await this.typePermanentAddress()
        if (ele != null)
            await ele.fill(Permanent_Address)
        else throw new Error("No element found")
    }

    public async elementButtonClick() {
        const ele = await this.buttonClick()
        if (ele != null)
            await ele.click()
        else throw new Error("No element found")
    }

    public async verifyElementTextBoxOutput(unserName: string) {
        const ele = this.test()
        if (ele != null)
            expect(ele).toContain(unserName)
        else throw new Error("No valid data found in Text Box output!!!")
    }


    ///////// Check Box
    public async openToggle() {
        const ele = await this.toggleParent()
        if (ele != null)
            await ele.click()
        else throw new Error("No element found")
    }

    public async closeToggle() {
        const ele = await this.toggleParent()
        if (ele != null)
            await ele.click()
        else throw new Error("No element found")
    }

    public async varifyToggleIsWorking() {
        let ele = await this.toggleTree()
        if (ele != null) {
            const kewWordList = ['Desktop', 'Downloads', 'Documents']
            console.log('kewWordList.length : ' + kewWordList.length)
            for (let i = 1; i <= kewWordList.length; i++) {
                console.log('Testing for  : ' + kewWordList[i])
                console.log("Count value : " + i)
                let getOne = await this.page.locator(`//*[@id="tree-node"]/ol/li/ol/li[${i}]/span/label/span[3]`).textContent()
                console.log("passed" + getOne)
                expect(kewWordList).toContain(getOne)
            }
        }
        else throw new Error("No element found")
    }

    public async enableParentCheckBox() {
        const ele = await this.page.locator('span.rct-checkbox')
        if (ele != null) {
            // Check the checkbox
            await ele.check()
            // Assert the checked state
            expect(await this.page.isChecked('span.rct-checkbox')).toBeTruthy()
        }
        else throw new Error("No element found")
    }

    public async verifyChildCheckBoxAreEnabled() {
        const ele = await this.buttonClick()
        if (ele != null)
            await ele.click()
        else throw new Error("No element found")
    }

    public async disableParentCheckBox() {
        const ele = await this.page.locator('span.rct-checkbox')
        if (ele != null) {
            // Check the checkbox
            await ele.uncheck()
            // Assert the checked state
            expect(await this.page.isChecked('span.rct-checkbox')).toBeFalsy()
        }
        else throw new Error("No element found")
    }

    public async selectRadioButton(str: string) {
        str = str.toLocaleLowerCase()
        var ele = this.page.locator(`input[id="${str}Radio"]`)
        //var ele = await this.page.$('input[id="yesRadio"]')
        if (ele != null) {
            // Check the checkbox
            await ele.click({ force: true })
        }
        else throw new Error("No element found")
    }

    public async validateRadioButton(str: string) {
        await this.page.waitForTimeout(2000)
        var ele = await this.page.locator('span.text-success').textContent()
        if (ele != null) {
            console.log("validateRadioButton : " + ele)
            expect(ele).toEqual(str)
        }
        else throw new Error("No element found")
    }

    public async verifyRadioButtonIsDisabled(str: string) {
        str = str.toLocaleLowerCase()
        var ele = this.page.locator(`input[id="${str}Radio"]`)
        if (ele != null) {
            expect(await this.page.isDisabled(`input[id="${str}Radio"]`)).toBe(true)
        }
        else throw new Error("No element found")
    }

    public async addNewRecord(f_name: string, Lname: string, email: string, age: string, salary: string, department: string) {
        await this.page.waitForSelector('button[id="addNewRecordButton"]')
        let add = await this.addButton()
        if (add != null)
            await add.click()
        else throw new Error(add + " element not found")

        await this.page.waitForSelector('#firstName')
        let e1 = await this.firstNme()
        if (e1 != null)
            await e1.fill(f_name)
        else throw new Error(f_name + " element not found")

        const e2 = await this.lastName()
        if (e2 != null)
            await e2.fill(Lname)
        else throw new Error(Lname + " element not found")

        const e3 = await this.email()
        if (e3 != null)
            await e3.fill(email)
        else throw new Error(email + " element not found")

        const e4 = await this.age()
        if (e4 != null)
            await e4.fill(age)
        else throw new Error(age + " element not found")

        const e5 = await this.salary()
        if (e5 != null)
            await e5.fill(salary)
        else throw new Error(salary + " element not found")

        const e6 = await this.department()
        if (e6 != null)
            await e6.fill(department)
        else throw new Error(department + " element not found")
    }

    public async clickButtonWithText(btn: string) {
        await this.page.waitForSelector(`text="${btn}"`)
        const ele = await this.button(btn)
        if (ele != null)
            await ele.click()
        else throw new Error("No element found")
    }

    public async verifyaddedRecord(name: string, lastName: string) {
        await this.page.waitForTimeout(2000)
        let ele = await this.page.$$('.rt-tr-group')
        console.log('lenght if tr in table ' + ele)

        for (let tr = 0; tr < ele.length; tr++) {
            let cell = await ele[tr].$$('.rt-td')
            console.log('lenght if td in row ' + cell)
            for (let td = 0; td < cell.length; td++) {
                console.log('Cell Values : ' + this.page.locator(`'//*[@id="app"]/div/div/div[2]/div[2]/div[1]/div[3]/div[1]/div[2]/div[${td}]/div/div[1]'`).allTextContents())
                //await expect(cell[td]).toContainText('Test');
                //console.log('element : ' + element.textContent())
            }
        }
        // await expect(this.page.locator('.rt-td').nth(0)).toContainText('Test');
        // await expect(this.page.locator('.rt-td').nth(1)).toContainText('Test');
    }

    public async verifyChildCheckBoxAreDisabled() {
        const ele = await this.buttonClick()
        if (ele != null)
            await ele.click()
        else throw new Error("No element found")
    }

    public async fileUpload() {
        //Locations ot Path
        const filePath = 'C://Arun//Learnings//Playwright//Playwright-allure-report-Arun//testData//sampleFile.jpeg';
        this.page.once("filechooser", async (file) => {
            await file.setFiles(filePath)
        })
        await this.page.click('input#uploadFile')
        await this.page.waitForSelector('#uploadedFilePath')
        let actualFileUploaded = await this.page.$eval("#uploadedFilePath", (el) => el.textContent);

        console.log('Uploaded File name : ' + actualFileUploaded)
        expect(actualFileUploaded).toContain('sampleFile.jpeg')
    }

    public async fileDownload() {
        const reliablePath = "C://Arun//";
        const [download] = await Promise.all([
            this.page.waitForEvent('download'), // wait for download to start
            this.page.click('#downloadButton')
        ]);
        //wait for download to complete
        const path = download.path()
        console.log('path(): ' + path)
        const filename = download.suggestedFilename()
        console.log('suggestedFilename() : ' + filename)
        expect(filename).toContain('sampleFile')
    }
}